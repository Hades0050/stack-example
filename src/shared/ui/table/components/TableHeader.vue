<template>
  <thead>
    <tr>
      <th
        v-if="selectable"
        :class="style['checkbox-column']"
        style="width: 50px"
      >
        <Checkbox v-model="selectAllState" />
      </th>
      <th
        v-for="column in columns"
        :key="column.key"
        :class="[
          column.sortable && style.sortable,
          sortColumn === column.key && style.active,
        ]"
        :style="{ width: column.width }"
        @click="column.sortable && handleSort(column.key)"
      >
        <slot :name="`header-${column.key}`" :column="column">
          <component
            v-if="column.headerComponent"
            :is="column.headerComponent"
            v-bind="column.headerComponentProps ? column.headerComponentProps() : {}"
          />
          <template v-else>{{ column.label }}</template>
        </slot>
        <span v-if="sortColumn === column.key && column.sortable">
          {{ sortDirection === 'asc' ? '↑' : '↓' }}
        </span>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import type { ITableColumn } from '@shared/ui/table/types';
import { Checkbox } from '@shared/ui';

interface ITableHeaderProps<T> {
  columns: ITableColumn<T>[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  selectable?: boolean;
  isAllSelected?: boolean;
  cssModule?: Record<string, string>;
}

interface ITableHeaderEmits {
  (e: 'sort', columnKey: string): void;
  (e: 'toggle-select-all', checked: boolean): void;
}

const {
  columns,
  sortColumn,
  sortDirection = 'asc',
  selectable = false,
  isAllSelected = false,
  cssModule: style = {},
} = defineProps<ITableHeaderProps<T>>();

const emit = defineEmits<ITableHeaderEmits>();

const selectAllState = computed({
  get: () => isAllSelected,
  set: (value: boolean) => {
    emit('toggle-select-all', value);
  },
});

const handleSort = (columnKey: string): void => {
  emit('sort', columnKey);
};
</script>

