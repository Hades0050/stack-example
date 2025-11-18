<template>
  <template v-if="isEditing">
    <Input v-model="editForm.name" />
  </template>
  <template v-else>
    <div class="user-name-cell">
      <img
        :src="row.avatar || getDefaultAvatar(row.name)"
        :alt="row.name"
        class="avatar"
      />
      <span>{{ row.name }}</span>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { Input } from '@shared/ui';
import { getDefaultAvatar } from '@shared/lib';
import { useActions } from '@entities/user/composables';
import type { IBaseCellProps } from '@entities/user/ui/table/cell/types';

const props = defineProps<IBaseCellProps>();
const { row } = toRefs(props);

const { editingId, editForm } = useActions();

const isEditing = computed(() => editingId.value === row.value.id);
</script>

<style scoped>
.user-name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
</style>

