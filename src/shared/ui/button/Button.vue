<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { IButtonProps, IButtonEmits } from '@shared/ui/button/types';

const {
  variant,
  disabled = false,
  type = 'button',
} = defineProps<IButtonProps>();

const emit = defineEmits<IButtonEmits>();
const style = useCssModule();

const buttonClasses = computed(() => {
  const variantClassMap: Record<string, string | undefined> = {
    primary: style['btn-primary'],
    secondary: style['btn-secondary'],
    danger: style['btn-danger'],
    success: style['btn-success'],
    cancel: style['btn-cancel'],
  };
  
  const classes: (string | undefined)[] = [style.btn];
  if (variant && variantClassMap[variant]) {
    classes.push(variantClassMap[variant]);
  }
  if (disabled && style['btn-disabled']) {
    classes.push(style['btn-disabled']);
  }
  return classes.filter((cls): cls is string => Boolean(cls));
});

const handleClick = (event: MouseEvent): void => {
  if (!disabled) {
    emit('click', event);
  }
};
</script>

<style module src="./button.css"></style>