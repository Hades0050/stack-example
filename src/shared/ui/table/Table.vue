<template>
  <div>
    <div :class="style['table-wrapper']">
      <table :class="style.table">
        <TableHeader
          :columns="columns"
          :sort-column="sortColumn"
          :sort-direction="sortDirection"
          :selectable="selectable"
          :is-all-selected="isAllSelected"
          :css-module="style"
          @sort="handleSort"
          @toggle-select-all="handleToggleSelectAll"
        >
          <template
            v-for="column in columns"
            :key="column.key"
            #[`header-${column.key}`]="headerSlotProps"
          >
            <slot
              :name="`header-${column.key}`"
              v-bind="headerSlotProps"
            />
          </template>
        </TableHeader>

        <tbody>
          <TableRow
            v-for="(row, index) in displayData"
            :key="getRowKey(row, index)"
            :row="row"
            :columns="columns"
            :selectable="selectable"
            :is-selected="isRowSelected(row)"
            :row-classes="getRowClass(row)"
            @toggle-row="() => handleToggleRow(row)"
          >
            <template
              v-for="column in columns"
              :key="column.key"
              #[`cell-${column.key}`]="cellSlotProps"
            >
              <slot
                :name="`cell-${column.key}`"
                v-bind="cellSlotProps"
              />
            </template>
          </TableRow>
        </tbody>
      </table>

      <div v-if="displayData.length === 0" :class="style['no-data']">
        <slot name="empty">
          <p>😔 Нет данных для отображения</p>
        </slot>
      </div>
    </div>

  
  </div>
  <Pagination
      v-if="pagination"
      :current-page="pagination.page"
      :total-pages="totalPages"
      :pagination-start="paginationStart"
      :pagination-end="paginationEnd"
      :total-items="pagination.totalItems"
      :items-per-page="pagination.rowsPerPage"
      :visible-pages="visiblePages"
      :page-size-options="pagination.rowsPerPageOptions"
      @update:items-per-page="handlePageSizeChange"
      @go-to-page="handleGoToPage"
    />
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { useCssModule, toRef, computed } from 'vue';
import TableHeader from '@shared/ui/table/TableHeader.vue'
import TableRow from '@shared/ui/table/TableRow.vue'
import Pagination from '@shared/ui/pagination/Pagination.vue'
import { calculatePagination } from '@shared/ui/pagination/use-pagination'
import { useTableSelection, useTableSort } from '@shared/ui/table/composables';
import type { ITableProps, ITableEmits } from '@shared/ui/table/types';

const {
  columns,
  data,
  rowKey = 'id',
  rowClass = '',
  selectedRows = [],
  selectable = false,
  pagination,
  sortColumn: initialSortColumn,
  sortDirection: initialSortDirection,
} = defineProps<ITableProps<T>>();

const emit = defineEmits<ITableEmits<T>>();
const style = useCssModule();


const {
  sortColumn,
  sortDirection,
  sortedData,
  handleSort: handleSortInternal,
} = useTableSort({
  data: toRef(() => data),
  columns: toRef(() => columns),
  initialColumn: initialSortColumn,
  initialDirection: initialSortDirection,
});


const displayData = computed(() => {
  if (!pagination) {
    return sortedData.value;
  }
  const start = (pagination.page - 1) * pagination.rowsPerPage;
  const end = start + pagination.rowsPerPage;
  return sortedData.value.slice(start, end);
});


const paginationData = computed(() => {
  if (!pagination) {
    return {
      totalPages: 0,
      paginationStart: 0,
      paginationEnd: 0,
      visiblePages: [],
    };
  }
  return calculatePagination(pagination.page, pagination.rowsPerPage, pagination.totalItems);
});

const totalPages = computed(() => paginationData.value.totalPages);
const paginationStart = computed(() => paginationData.value.paginationStart);
const paginationEnd = computed(() => paginationData.value.paginationEnd);
const visiblePages = computed(() => paginationData.value.visiblePages);


const getRowKey = (row: T, index: number): string | number => {
  if (typeof rowKey === 'function') return rowKey(row);
  return (row as Record<string, unknown>)[rowKey as string] as string | number ?? index;
};


const getRowClass = (row: T): Record<string, boolean> => {
  const classes: Record<string, boolean> = {};
  
  if (isRowSelected(row) && style.selected) {
    classes[style.selected] = true;
  }
  
  if (typeof rowClass === 'function') {
    const dynamicClass = rowClass(row);
    if (dynamicClass) {
   
      if (style[dynamicClass]) {
        classes[style[dynamicClass]] = true;
      } else {
        classes[dynamicClass] = true;
      }
    }
  } else if (rowClass) {
    classes[rowClass] = true;
  }
  
  return classes;
};


const handleSort = (columnKey: string): void => {
  handleSortInternal(columnKey);
  emit('sort', columnKey);
};

const handlePageSizeChange = (value: number): void => {
  emit('update:itemsPerPage', value);
};

const handleGoToPage = (page: number): void => {
  emit('goToPage', page);
};

const {
  isAllSelected,
  isRowSelected,
  handleToggleRow,
  handleToggleSelectAll,
} = useTableSelection(
  toRef(() => displayData.value),
  toRef(() => selectedRows),
  {
    getRowKey,
    onToggleRow: (rows) => emit('update:selectedRows', rows),
    onToggleSelectAll: (rows) => emit('update:selectedRows', rows),
  }
);
</script>

<style module src="./table.css"></style>