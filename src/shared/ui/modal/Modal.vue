<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="model"
        :class="style['modal-overlay']"
        @click.self="handleOverlayClick"
      >
        <div :class="[style.modal, large && style['modal-large']]">
          <div :class="style['modal-header']">
            <h3>{{ title }}</h3>
            <button
              v-if="closable"
              :class="style['btn-close']"
              @click="handleClose"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
          <div :class="style['modal-body']">
            <slot />
          </div>
          <div v-if="$slots.footer" :class="style['modal-footer']">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import type { IModalProps, IModalEmits } from '@shared/ui/modal/types';

const {
  title = '',
  large = false,
  closable = true,
  closeOnOverlay = true,
} = defineProps<IModalProps>();

const model = defineModel<boolean>({ required: true });
const emit = defineEmits<IModalEmits>();
const style = useCssModule();

const handleClose = (): void => {
  model.value = false;
  emit('close');
};

const handleOverlayClick = (): void => {
  if (closeOnOverlay) {
    handleClose();
  }
};
</script>

<style module src="./modal.css"></style>