<template>
  <span
    :class="[
      'status-badge',
      row.status === 'active' ? 'status-active' : 'status-inactive',
    ]"
    @click="handleToggle"
    :style="{ cursor: 'pointer' }"
  >
    {{ row.status === 'active' ? '✓ Активен' : '✗ Неактивен' }}
  </span>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useActions } from '@entities/user/composables';
import type { IBaseCellProps } from '@entities/user/ui/table/cell/types';

const props = defineProps<IBaseCellProps>();
const { row } = toRefs(props);

const { handleToggleStatus } = useActions();

const handleToggle = (): void => {
  handleToggleStatus(row.value.id);
};
</script>

<style scoped>
.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-inactive {
  background: #ffebee;
  color: #c62828;
}
</style>

