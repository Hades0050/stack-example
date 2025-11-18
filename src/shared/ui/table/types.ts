import type { Component } from 'vue';
import type { ISelectOption } from '@shared/ui/select/types';


export interface ITableColumn<T = any> {
  key: string;
  label?: string;
  sortable?: boolean;
  defaultSort?: boolean;
  defaultSortDirection?: 'asc' | 'desc';
  render?: (row: T) => string | number;
  width?: string;
  component?: Component;
  headerComponent?: Component;
  componentProps?: (row: T) => Record<string, any>;
  headerComponentProps?: () => Record<string, any>;
  getCellClass?: (row: T) => string;
  onSort?: () => void;
}


export interface ITablePagination {
  page: number;
  rowsPerPage: number;
  totalItems: number;
  rowsPerPageOptions?: ISelectOption[];
}

export interface ITableProps<T> {
  columns: ITableColumn<T>[];
  data: T[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  rowKey?: string | ((row: T) => string | number);
  rowClass?: string | ((row: T) => string);
  selectedRows?: T[];
  selectable?: boolean;
  pagination?: ITablePagination;
}

export interface ITableEmits<T = any> {
  sort: [column: string];
  'update:selectedRows': [rows: T[]];
  'update:itemsPerPage': [value: number];
  goToPage: [page: number];
}
