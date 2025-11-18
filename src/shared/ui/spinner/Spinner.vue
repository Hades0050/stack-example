<template>
  <div :class="style['spinner-wrapper']">
    <div :class="style.spinner" />
    <p v-if="text" :class="style['spinner-text']">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import type { ISpinnerProps } from '@shared/ui/spinner/types';

const { text = '' } = defineProps<ISpinnerProps>();

const style = useCssModule();
</script>

<style module src="./spinner.css"></style>