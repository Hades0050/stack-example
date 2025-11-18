<template>
  <label :class="checkboxWrapperClasses">
    <input
      :id="id"
      type="checkbox"
      :checked="model"
      :disabled="disabled"
      :class="style['checkbox-input']"
      @change="handleChange"
    />
    <span :class="style['checkbox-label']">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { ICheckboxProps } from '@shared/ui/checkbox/types';

const {
  disabled = false,
  id,
} = defineProps<ICheckboxProps>();

const model = defineModel<boolean>({ required: true });
const style = useCssModule();

const checkboxWrapperClasses = computed(() => {
  const classes = [style['checkbox-wrapper']];
  if (disabled) {
    classes.push(style['checkbox-disabled']);
  }
  return classes;
});

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  model.value = target.checked;
};
</script>

<style module src="./checkbox.css"></style>