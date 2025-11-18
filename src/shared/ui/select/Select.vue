<template>
  <div :class="style['select-wrapper']">
    <select
      :id="id"
      :value="model"
      :disabled="disabled"
      :class="selectClasses"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span v-if="errorMessage" :class="style['error-text']">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { ISelectProps, ISelectOption } from '@shared/ui/select/types';

export type { ISelectOption };

const {
  options,
  placeholder = '',
  disabled = false,
  error = '',
  id,
} = defineProps<ISelectProps>();

const model = defineModel<string | number>({ required: true });
const style = useCssModule();

const hasError = computed(() => Boolean(error));
const errorMessage = computed(() => error || '');

const selectClasses = computed(() => {
  const classes = [style.select];
  if (hasError.value && style.error) {
    classes.push(style.error);
  }
  if (disabled && style['select-disabled']) {
    classes.push(style['select-disabled']);
  }
  return classes;
});

const handleChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement;
  model.value = target.value;
};
</script>

<style module src="./select.css"></style>