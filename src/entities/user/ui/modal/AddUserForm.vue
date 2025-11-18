<template>
  <div class="add-user-form">
    <div class="form-fields">
      <div class="form-group">
        <label>Имя*</label>
        <Input
          v-model="formData.name"
          :error="errors.name"
          @blur="() => validateField('name')"
        />
      </div>

      <div class="form-group">
        <label>Email*</label>
        <Input
          v-model="formData.email"
          type="email"
          :error="errors.email"
          @blur="() => validateField('email')"
        />
      </div>

      <div class="form-group">
        <label>Роль*</label>
        <Select v-model="formData.role" :options="ROLE_OPTIONS" />
      </div>

      <div class="form-group">
        <Checkbox
          :model-value="formData.sendWelcomeEmail ?? true"
          @update:model-value="(val: boolean) => (formData.sendWelcomeEmail = val)"
        >
          Отправить приветственное письмо
        </Checkbox>
      </div>
    </div>

    <div class="form-footer">
      <Button variant="secondary" @click="handleCancel">Отмена</Button>
      <Button variant="primary" :disabled="!isFormValid" @click="handleConfirm">
        Добавить
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Input, Select, Checkbox, Button, globalModal } from '@shared/ui';
import { validateEmail as validateEmailUtil } from '@shared/lib';
import type { TCreateUserDto } from '@entities/user/model/types';
import { getRoleOptions, User, userManager } from '@entities/user/model';

type TFieldName = keyof Pick<TCreateUserDto, 'name' | 'email'>;
type TValidationRule = (value: string) => string;

const ROLE_OPTIONS = getRoleOptions().filter((opt) => opt.value !== '');

const VALIDATION_RULES: Record<TFieldName, TValidationRule[]> = {
  name: [
    (value: string) => (!value.trim() ? 'Имя обязательно для заполнения' : ''),
    (value: string) => (value.trim().length < 3 ? 'Имя должно содержать минимум 3 символа' : ''),
  ],
  email: [
    (value: string) => (!value.trim() ? 'Email обязателен для заполнения' : ''),
    (value: string) => (!validateEmailUtil(value) ? 'Некорректный формат email' : ''),
    (value: string) => {
      const existingUser = userManager.getUserByEmail(value.trim());
      return existingUser ? 'Пользователь с таким email уже существует' : '';
    },
  ],
};

const formData = ref<TCreateUserDto>({
  name: '',
  email: '',
  role: 'user',
  sendWelcomeEmail: true,
});

const errors = ref<Record<TFieldName, string>>({
  name: '',
  email: '',
});

/**
 * Валидирует поле формы по правилам
 */
const validateField = (fieldName: TFieldName): void => {
  const rules = VALIDATION_RULES[fieldName];
  if (!rules) return;

  const value = formData.value[fieldName] as string;
  const error = rules.map((rule) => rule(value)).find((err) => err) || '';
  errors.value[fieldName] = error;
};

/**
 * Валидирует всю форму
 */
const validate = (): boolean => {
  Object.keys(VALIDATION_RULES).forEach((field) => validateField(field as TFieldName));
  return Object.values(errors.value).every((error) => !error);
};

/**
 * Проверяет валидность формы
 */
const isFormValid = computed((): boolean => {
  return (
    formData.value.name.trim().length > 0 &&
    formData.value.email.trim().length > 0 &&
    Object.values(errors.value).every((error) => !error)
  );
});

/**
 * Обработчик отмены
 */
const handleCancel = (): void => {
  globalModal.close();
};

/**
 * Обработчик подтверждения - создает и добавляет пользователя
 */
const handleConfirm = (): void => {
  if (!validate()) return;
  const createdUser = User.create({
    id: userManager.generateId(),
    ...formData.value,
  });
  userManager.addUser(createdUser);
  globalModal.close();
};

defineExpose({
  validate,
  errors,
  formData,
});
</script>

<style scoped>
.add-user-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: #555;
  font-size: 14px;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
</style>

