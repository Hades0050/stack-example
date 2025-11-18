import type { IUser, TUserRole, TUserStatus } from '@entities/user/model/types';
import { User } from '@entities/user/model/user';
import type { ISelectOption } from '@shared/ui';

export const handleError = (message: string, error: unknown): void => {
  const errorMessage =
    error instanceof Error ? error.message : 'Неизвестная ошибка';
  alert(`${message}: ${errorMessage}`);
};

export const generateMockUsers = (count: number): IUser[] => {
  const roles: TUserRole[] = ['admin', 'user', 'moderator'];
  const statuses: TUserStatus[] = ['active', 'inactive'];
  const names = [
    'Иван Петров',
    'Мария Сидорова',
    'Алексей Иванов',
    'Елена Кузнецова',
    'Дмитрий Смирнов',
    'Ольга Попова',
    'Сергей Васильев',
    'Анна Соколова',
    'Николай Михайлов',
    'Татьяна Новикова',
  ];

  const users: IUser[] = [];
  for (let i = 1; i <= count; i++) {
    users.push(User.createMock(i, names, roles, statuses));
  }
  return users;
};

export const getRoleOptions = (): ISelectOption[] => {
  const roles: TUserRole[] = ['admin', 'user', 'moderator'];
  return [
    { value: '', label: 'Все роли' },
    ...roles.map((role) => ({ value: role, label: User.getRoleLabel(role) })),
  ];
};

export const getRoleLabel = User.getRoleLabel;

