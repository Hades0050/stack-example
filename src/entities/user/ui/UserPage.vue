<template>
  <div :class="style['user-table-container']">
      <UserTableHeader
      :is-loading="isLoading"
      :show-all-users="showAllUsers"
    >
      <template #actions>
        <slot name="header-actions" />
      </template>
    </UserTableHeader>

    <UserTableFilters />

    <div v-if="isLoading" :class="style['loading-overlay']">
      <Spinner text="Загрузка данных..." />
    </div>

    <div v-if="error" :class="style['error-message']">
      <span>❌ {{ error }}</span>
      <Button variant="danger" @click="handleRetry">Повторить</Button>
    </div>

    <Table
      v-if="!isLoading && !error"
      :columns="columns"
      :data="filteredUsers"
      :row-class="getRowClassWithEditing"
      :selected-rows="selectedUsers.map((id: number) => users.find((u: IUser) => u.id === id)).filter((u): u is IUser => u !== undefined)"
      :pagination="{
        page: currentPage,
        rowsPerPage: rowsPerPage,
        totalItems: filteredUsers.length,
      }"
      row-key="id"
      selectable
      @update:selected-rows="handleUpdateSelectedRows"
      @go-to-page="handleGoToPage"
      @update:items-per-page="handleUpdateItemsPerPage"
    >
      <template #empty>
        <p>😔 Нет данных для отображения</p>
        <Button variant="primary" @click="clearFilters()">
          Сбросить фильтры
        </Button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, useCssModule, computed } from 'vue';
import { Button, Spinner, Table } from '@shared/ui';
import UserTableHeader from '@entities/user/ui/table/UserTableHeader.vue';
import UserTableFilters from '@entities/user/ui/table/UserTableFilters.vue';
import { useTable } from '@entities/user/composables/use-table';
import { useActions } from '@entities/user/composables/use-actions';
import type { IUser } from '@entities/user/types';
import { createUserColumns } from '@entities/user/model/user-columns';

const style = useCssModule();

interface Props {
  initialPageSize?: number;
}

const {
  initialPageSize = 25,
} = defineProps<Props>();

defineSlots<{
  'header-actions'?: () => any;
}>();

const { 
  users, 
  filteredUsers, 
  currentPage, 
  rowsPerPage,
  isLoading, 
  error, 
  selectedUsers, 
  handleRetry, 
  handleGoToPage, 
  handleUpdateItemsPerPage,
  handleUpdateSelectedRows,
  getRowClass,
  clearFilters 
} = useTable();

const { editingId } = useActions();

const showAllUsers = ref(false);

rowsPerPage.value = initialPageSize;

const getRowClassWithEditing = (user: IUser): string => {
  const classes: string[] = [];
  
  if (editingId.value === user.id) {
    classes.push('editing');
  }
  
  const baseClass = getRowClass(user);
  if (baseClass) {
    classes.push(baseClass);
  }
  
  return classes.join(' ');
};

const columns = computed(() => createUserColumns());

</script>

<style module src="./UserTable.module.css"></style>

