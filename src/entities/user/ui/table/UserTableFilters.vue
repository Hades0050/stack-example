<template>
  <div class="filters-section">
    <div class="filter-group">
      <label>Статус:</label>
      <button
        :class="['filter-btn', { active: filters.filterStatus === '' }]"
        @click="filters.filterStatus = ''"
      >
        Все
      </button>
      <button
        :class="['filter-btn', { active: filters.filterStatus === 'active' }]"
        @click="filters.filterStatus = 'active'"
      >
        Активные
      </button>
      <button
        :class="['filter-btn', { active: filters.filterStatus === 'inactive' }]"
        @click="filters.filterStatus = 'inactive'"
      >
        Неактивные
      </button>
    </div>

    <div class="filter-group">
      <label>Дата регистрации:</label>
      <Input
        v-model="filters.dateFrom"
        type="date"
        class="date-input"
      />
      <span>-</span>
      <Input
        v-model="filters.dateTo"
        type="date"
        class="date-input"
      />
      <button @click="clearDateFilter()" class="btn-clear">
        Очистить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@shared/ui';
import { filters, clearDateFilter } from '@entities/user/composables/use-table';
</script>

<style scoped>
.filters-section {
  background: white;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-group label {
  font-weight: 500;
  color: #555;
  min-width: 150px;
}

.filter-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  background: #f0f0f0;
}

.filter-btn.active {
  background: #4caf50;
  color: white;
  border-color: #4caf50;
}

.date-input :deep(input) {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.btn-clear {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.btn-clear:hover {
  background: #f0f0f0;
}
</style>

