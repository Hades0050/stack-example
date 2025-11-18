<template>
  <label>
    <input
      :id="id"
      type="checkbox"
      :checked="model"
      :disabled="disabled"
      @change="handleChange"
    />
    <span v-if="$slots.default">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import type { ICheckboxProps } from '@shared/ui/checkbox/types';

const {
  disabled = false,
  id,
} = defineProps<ICheckboxProps>();

const model = defineModel<boolean>({ required: true });

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  model.value = target.checked;
};
</script>
