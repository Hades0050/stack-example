<template>
  <div class="action-buttons">
    <button
      v-for="action in visibleActions"
      :key="action.id"
      :class="['btn-icon', action.variant && `btn-${action.variant}`]"
      :title="action.title"
      @click="action.onClick"
    >
      {{ action.icon }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useActions } from '@entities/user/composables';
import type { IBaseCellProps } from '@entities/user/ui/table/cell/types';

const props = defineProps<IBaseCellProps>();
const { row } = toRefs(props);

const {
  editingId,
  handleStartEdit,
  handleSaveEdit,
  handleCancelEdit,
  handleOpenDetails,
  handleDelete,
} = useActions();

// Вычисляем локально, редактируется ли эта строка
const isEditing = computed(() => editingId.value === row.value.id);

interface Action {
  id: string;
  icon: string;
  title: string;
  onClick: () => void;
  variant?: 'success' | 'cancel' | 'danger';
}

// Действия для режима просмотра
const viewActions = computed<Action[]>(() => [
  {
    id: 'edit',
    icon: '✏️',
    title: 'Редактировать',
    onClick: () => handleStartEdit(row.value),
  },
  {
    id: 'details',
    icon: '👁️',
    title: 'Подробнее',
    onClick: () => handleOpenDetails(row.value),
  },
  {
    id: 'delete',
    icon: '🗑️',
    title: 'Удалить',
    onClick: () => handleDelete(row.value.id),
    variant: 'danger',
  },
]);

// Действия для режима редактирования
const editActions = computed<Action[]>(() => [
  {
    id: 'save',
    icon: '✓',
    title: 'Сохранить',
    onClick: () => handleSaveEdit(row.value.id),
    variant: 'success',
  },
  {
    id: 'cancel',
    icon: '✗',
    title: 'Отмена',
    onClick: () => handleCancelEdit(),
    variant: 'cancel',
  },
]);

// Получаем видимые действия в зависимости от режима
const visibleActions = computed(() => 
  isEditing.value ? editActions.value : viewActions.value
);
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 5px;
}

.btn-icon {
  padding: 6px 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.btn-icon:hover {
  background: #f0f0f0;
  transform: scale(1.1);
}

.btn-icon.btn-success {
  background: #4caf50;
  color: white;
  border-color: #4caf50;
}

.btn-icon.btn-cancel {
  background: #ff9800;
  color: white;
  border-color: #ff9800;
}

.btn-icon.btn-danger {
  border-color: #f44336;
}

.btn-icon.btn-danger:hover {
  background: #f44336;
  color: white;
}
</style>
