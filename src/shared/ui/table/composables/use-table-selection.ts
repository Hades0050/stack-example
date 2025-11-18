import { computed, type Ref } from 'vue';

export interface TableSelectionOptions<T> {
  getRowKey: (row: T, index: number) => string | number;
  onToggleRow: (rows: T[]) => void;
  onToggleSelectAll: (rows: T[]) => void;
}

export const useTableSelection = <T>(
  data: Ref<T[]>,
  selectedRows: Ref<T[]>,
  options: TableSelectionOptions<T>
) => {
  const getKey = (row: T) => options.getRowKey(row, 0);
  
  const isSameRow = (row1: T, row2: T) => getKey(row1) === getKey(row2);

  const isAllSelected = computed(() => {
    if (data.value.length === 0 || !selectedRows.value) return false;
    return data.value.every((row) =>
      selectedRows.value.some((selected) => isSameRow(row, selected))
    );
  });

  const isRowSelected = (row: T): boolean => {
    if (!selectedRows.value) return false;
    return selectedRows.value.some((selected) => isSameRow(row, selected));
  };

  const handleToggleRow = (row: T): void => {
    const currentSelected = selectedRows.value ?? [];
    const newSelectedRows = isRowSelected(row)
      ? currentSelected.filter((selected) => !isSameRow(row, selected))
      : [...currentSelected, row];
    
    options.onToggleRow(newSelectedRows);
  };

  const handleToggleSelectAll = (checked: boolean): void => {
    const newSelectedRows = checked ? [...data.value] : [];
    options.onToggleSelectAll(newSelectedRows);
  };

  return {
    isAllSelected,
    isRowSelected,
    handleToggleRow,
    handleToggleSelectAll,
  };
};

