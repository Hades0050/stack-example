<template>
  <div :class="style['input-wrapper']">
    <input
      :id="id"
      :value="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        style.input,
        hasError && style.error,
        disabled && style['input-disabled']
      ]"
      @input="handleInput"
      @blur="handleBlur"
    />
    <span v-if="errorMessage" :class="style['error-text']">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { IInputProps, IInputEmits } from '@shared/ui/input/types';

const {
  type = 'text',
  placeholder = '',
  disabled = false,
  error = '',
  id,
} = defineProps<IInputProps>();

const model = defineModel<string>({ required: true });
const emit = defineEmits<IInputEmits>();
const style = useCssModule();

const hasError = computed(() => Boolean(error));
const errorMessage = computed(() => error || '');

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  model.value = target.value;
};

const handleBlur = (event: FocusEvent): void => {
  emit('blur', event);
};
</script>

<style module src="./input.css"></style>