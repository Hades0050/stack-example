<template>
  <tr :class="rowClasses">
    <td v-if="selectable">
      <Checkbox v-model="selectedState" />
    </td>
    <td v-for="column in columns" :key="column.key">
      <slot
        :name="`cell-${column.key}`"
        :row="row"
        :column="column"
        :value="getCellValue(column)"
      >
        <component
          v-if="column.component"
          :is="column.component"
          v-bind="{
            row,
            ...(column.componentProps ? column.componentProps(row) : {}),
          }"
        />
        <component
          v-else
          :is="column.render ? 'span' : 'div'"
          :class="getCellClass(column)"
        >
          {{ getCellValue(column) }}
        </component>
      </slot>
    </td>
  </tr>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import type { ITableColumn } from '@shared/ui/table/types';
import { Checkbox } from '@shared/ui';

interface ITableRowProps<T> {
  row: T;
  columns: ITableColumn<T>[];
  selectable?: boolean;
  isSelected?: boolean;
  rowClasses?: Record<string, boolean>;
}

interface ITableRowEmits {
  (e: 'toggle-row'): void;
}

const {
  row,
  columns,
  selectable = false,
  isSelected = false,
  rowClasses = {},
} = defineProps<ITableRowProps<T>>();

const emit = defineEmits<ITableRowEmits>();

const selectedState = computed({
  get: () => isSelected,
  set: () => {
    emit('toggle-row');
  },
});

const getCellValue = (column: ITableColumn<T>): string | number => {
  if (column.render) return column.render(row);
  const value = (row as Record<string, unknown>)[column.key];
  return value != null ? String(value) : '';
};

const getCellClass = (column: ITableColumn<T>): string => {
  return column.getCellClass?.(row) ?? '';
};
</script>

