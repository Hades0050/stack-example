<template>
  <template v-if="isEditing">
    <Select v-model="editForm.role" :options="roleOptions" />
  </template>
  <template v-else>
    <span :class="['role-badge', 'role-' + row.role]">
      {{ User.getRoleLabel(row.role) }}
    </span>
  </template>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { Select } from '@shared/ui';
import { User } from '@entities/user/model/user';
import { getRoleOptions } from '@entities/user/model/user-helpers';
import { useActions } from '@entities/user/composables';
import type { IBaseCellProps } from '@entities/user/ui/table/cell/types';

const props = defineProps<IBaseCellProps>();
const { row } = toRefs(props);

const { editingId, editForm } = useActions();

const isEditing = computed(() => editingId.value === row.value.id);
const roleOptions = getRoleOptions().filter((opt) => opt.value !== '');
</script>

<style scoped>
.role-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.role-admin {
  background: #ffebee;
  color: #c62828;
}

.role-user {
  background: #e3f2fd;
  color: #1565c0;
}

.role-moderator {
  background: #fff3e0;
  color: #e65100;
}
</style>

