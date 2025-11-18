import { ref, computed, type Ref } from 'vue';
import type { ITableColumn } from '@shared/ui/table/types';

export interface UseSortOptions<T> {
  data: Ref<T[]>;
  columns?: Ref<ITableColumn<T>[]>;
  initialColumn?: string;
  initialDirection?: 'asc' | 'desc';
}

/**
 * Находит колонку с дефолтной сортировкой
 */
const findDefaultSortColumn = <T>(columns?: ITableColumn<T>[]): { column: string; direction: 'asc' | 'desc' } | null => {
  if (!columns) return null;
  
  const defaultColumn = columns.find(col => col.defaultSort);
  if (!defaultColumn) return null;
  
  return {
    column: defaultColumn.key,
    direction: defaultColumn.defaultSortDirection || 'asc',
  };
};

export const useTableSort = <T extends Record<string, any>>(options: UseSortOptions<T>) => {
  const { data, columns, initialColumn, initialDirection } = options;

  // Определяем начальные значения сортировки
  const defaultSort = columns?.value ? findDefaultSortColumn(columns.value) : null;
  const startColumn = initialColumn || defaultSort?.column || '';
  const startDirection = initialDirection || defaultSort?.direction || 'asc';

  const sortColumn = ref<string>(startColumn);
  const sortDirection = ref<'asc' | 'desc'>(startDirection);


  const sortedData = computed(() => {
    const items = [...data.value];

    if (!sortColumn.value) {
      return items;
    }

    items.sort((a, b) => {
      const column = sortColumn.value;
      let aVal: any = a[column];
      let bVal: any = b[column];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (aVal instanceof Date || bVal instanceof Date || 
          (typeof aVal === 'string' && !isNaN(Date.parse(aVal)))) {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) {
        return sortDirection.value === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortDirection.value === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return items;
  });

 
  const handleSort = (column: string): void => {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.value = column;
      sortDirection.value = 'asc';
    }
  };

  return {
    sortColumn,
    sortDirection,
    sortedData,
    handleSort,
  };
};
