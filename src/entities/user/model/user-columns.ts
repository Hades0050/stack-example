import type { IUser } from '@entities/user/types';
import { formatDate, formatRelativeTime, getActivityClass } from '@shared/lib';
import type { ITableColumn } from '@shared/ui';
import {
  NameCell,
  EmailCell,
  RoleCell,
  StatusCell,
  ActionsCell,
  type IBaseCellProps,
} from '@entities/user/ui/table/cell';

export type ColumnKey = keyof IUser | 'actions';

export interface IUserTableColumn extends ITableColumn<IUser> {
  key: ColumnKey;
  componentProps?: (row: IUser) => IBaseCellProps | Record<string, any>;
  headerComponentProps?: () => Record<string, any>;
}

export const createUserColumns = (): IUserTableColumn[] => {
  return [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      defaultSort: true,
      defaultSortDirection: 'asc',
    },
    {
      key: 'name',
      label: 'Имя',
      sortable: true,
      component: NameCell,
      componentProps: (row: IUser): IBaseCellProps => ({ row }),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      component: EmailCell,
      componentProps: (row: IUser): IBaseCellProps => ({ row }),
    },
    {
      key: 'role',
      label: 'Роль',
      sortable: false,
      component: RoleCell,
      componentProps: (row: IUser): IBaseCellProps => ({ row }),
    },
    {
      key: 'status',
      label: 'Статус',
      sortable: false,
      component: StatusCell,
      componentProps: (row: IUser): IBaseCellProps => ({ row }),
      getCellClass: (user: IUser): string => {
        return user.status === 'active' ? 'status-active' : 'status-inactive';
      },
    },
    {
      key: 'registrationDate',
      label: 'Дата регистрации',
      sortable: true,
      render: (user) => formatDate(user.registrationDate),
    },
    {
      key: 'lastActivity',
      label: 'Последняя активность',
      sortable: false,
      render: (user) => formatRelativeTime(user.lastActivity),
      getCellClass: (user: IUser): string => {
        return getActivityClass(user.lastActivity);
      },
    },
    {
      key: 'actions' as ColumnKey,
      label: 'Действия',
      sortable: false,
      component: ActionsCell,
      componentProps: (row: IUser) => ({ row }),
    },
  ];
};




export const getSortableColumnKey = (key: ColumnKey): keyof IUser | null => {
  if (key === 'actions') return null;
  return key as keyof IUser;
};

