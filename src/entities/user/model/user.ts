import type { IUser, TUserRole, TUserStatus, TUpdateUserDto } from '../types';

export class User {
  name: string;
  email: string;
  role: TUserRole;

  constructor(user?: IUser) {
    this.name = user?.name ?? '';
    this.email = user?.email ?? '';
    this.role = user?.role ?? 'user';
  }

  /**
   * Преобразует в DTO для обновления
   */
  toUpdateDto(): TUpdateUserDto {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }

  /**
   * Создает нового пользователя с дефолтными значениями
   */
  static create(data: {
    id: number;
    name: string;
    email: string;
    role: TUserRole;
  }): IUser {
		const {id,name,email,role}=data
    return {
      id: id,
      name: name,
      email: email,
      role: role,
      status: 'active',
      registrationDate: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      avatar: null,
      loginCount: 0,
      postsCount: 0,
      commentsCount: 0,
    };
  }

  /**
   * Создает mock пользователя для тестирования
   */
  static createMock(
    id: number,
    names: string[],
    roles: TUserRole[],
    statuses: TUserStatus[]
  ): IUser {
    const name = names[Math.floor(Math.random() * names.length)] + ' ' + id;
    const registrationDate = new Date(
      2020,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    );
    const lastActivity = new Date(
      Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    );
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      id,
      name,
      email: `user${id}@example.com`,
      role: randomRole ?? 'user',
      status: randomStatus ?? 'active',
      registrationDate: registrationDate.toISOString(),
      lastActivity: lastActivity.toISOString(),
      avatar: null,
      loginCount: Math.floor(Math.random() * 500),
      postsCount: Math.floor(Math.random() * 100),
      commentsCount: Math.floor(Math.random() * 300),
    };
  }

  /**
   * Переключает статус пользователя
   */
  static toggleStatus(user: IUser): IUser {
    return {
      ...user,
      status: user.status === 'active' ? 'inactive' : 'active',
    };
  }

  /**
   * Обновляет данные пользователя
   */
  static update(user: IUser, data: TUpdateUserDto): IUser {
    return { ...user, ...data };
  }

  /**
   * Получает текстовое представление роли пользователя
   */
  static getRoleLabel(role: TUserRole): string {
    const labels: Record<TUserRole, string> = {
      admin: 'Администратор',
      user: 'Пользователь',
      moderator: 'Модератор',
    };
    return labels[role] || role;
  }
}

