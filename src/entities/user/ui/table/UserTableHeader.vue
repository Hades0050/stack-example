<template>
  <div class="table-header">
    <div class="header-left">
      <h2>Управление пользователями</h2>
      <span class="total-count">{{ filteredUsers.length }} записей</span>
    </div>

    <div class="header-right">
      <Input
        v-model="filters.searchQuery"
        placeholder="Поиск по имени, email..."
        class="search-input"
      />

      <Select
        v-model="filters.filterRole"
        :options="roleOptions"  
      />

      <slot name="actions">
        <Button variant="primary" @click="handleAdd" :disabled="isLoading">
          + Добавить пользователя
        </Button>

        <Button
          variant="secondary"
          @click="handleExport"
          :disabled="isLoading || (selectedCount === 0 && !showAllUsers)"
        >
          📥 Экспорт
        </Button>

        <Button
          v-if="selectedCount > 0"
          variant="danger"
          @click="handleDeleteSelected"
        >
          🗑️ Удалить выбранные ({{ selectedCount }})
        </Button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Input, Select, Button } from '@shared/ui';
import { useActions, useTable } from '@entities/user/composables';
import { getRoleOptions } from '@entities/user/model/user-helpers';

interface Props {
  isLoading?: boolean;
  showAllUsers?: boolean;
}

const {
  isLoading = false,
  showAllUsers = false,
} = defineProps<Props>();

const { selectedUsers, filters, filteredUsers } = useTable();
const { handleAdd, handleExport: handleExportCrud, handleDeleteSelected } = useActions();

const roleOptions = computed(() => getRoleOptions());

const selectedCount = computed(() => selectedUsers.value.length);

const handleExport = (): void => {
  handleExportCrud(filteredUsers.value);
};
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-left h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.total-count {
  color: #666;
  font-size: 14px;
}

.header-right {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-input {
  width: 276px;
}
</style>

