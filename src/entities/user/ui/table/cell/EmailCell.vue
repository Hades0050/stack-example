<template>
  <template v-if="isEditing">
    <Input v-model="editForm.email" type="email" />
  </template>
  <template v-else>{{ row.email }}</template>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { Input } from '@shared/ui';
import { useActions } from '@entities/user/composables';
import type { IBaseCellProps } from '@entities/user/ui/table/cell/types';

const props = defineProps<IBaseCellProps>();
const { row } = toRefs(props);

const { editingId, editForm } = useActions();

const isEditing = computed(() => editingId.value === row.value.id);
</script>

