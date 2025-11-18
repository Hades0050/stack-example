import { reactive } from 'vue';
import type { IUser, TUpdateUserDto } from '@entities/user/types';
import { userApi } from '@entities/user/api/user-api';
import { User } from '@entities/user/model/user';

/**
 * Класс для управления коллекцией пользователей
 */
class UserManager {
  // Реактивный массив пользователей
  public users = reactive<IUser[]>([]);

  private get _users(): IUser[] {
    return this.users;
  }

  private set _users(value: IUser[]) {
    this.users.splice(0, this.users.length, ...value);
  }


  /**
   * Загружает список пользователей (создает новый массив)
   */
  loadUsers(users: IUser[]): void {
    this._users = [...users];
  }

  /**
   * Находит пользователя по ID
   */
  findById(userId: number): IUser | undefined {
    return this._users.find((u) => u.id === userId);
  }

  /**
   * Находит пользователя по email
   */
  getUserByEmail(email: string): IUser | undefined {
    return this._users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  /**
   * Обновление пользователя по ID с помощью функции-трансформера
   * @private
   */
  private updateUserById(userId: number, transform: (user: IUser) => IUser): void {
    const index = this._users.findIndex((u) => u.id === userId);
    if (index !== -1 && this._users[index]) {
      this._users = this._users.map((user) =>
        user.id === userId ? transform(user) : user
      );
    }
  }

  /**
   * Обновление пользователя
   */
  async updateUser(userId: number, data: TUpdateUserDto): Promise<void> {
    await userApi.updateUser(userId, data);
    this.updateUserById(userId, (user) => User.update(user, data));
  }

  /**
   * Удаление пользователя или пользователей 
   */
  async delete(userIds: number | number[]): Promise<void> {
    if (Array.isArray(userIds)) {
      await userApi.deleteUsers(userIds);
    } else {
      await userApi.deleteUser(userIds);
    }
    const idsArray = Array.isArray(userIds) ? userIds : [userIds];
    this._users = this._users.filter((user) => !idsArray.includes(user.id));
  }

  /**
   * Переключает статус пользователя
   */
  toggleStatus(userId: number): void {
    this.updateUserById(userId, (user) => User.toggleStatus(user));
  }

  /**
   * Добавляет нового пользователя в начало списка
   */
  addUser(user: IUser): void {
    this._users = [user, ...this._users];
  }

  /**
   * Генерирует новый ID для нового пользователя
   */
  generateId(): number {
    const maxId = this._users.length > 0 ? Math.max(...this._users.map((u) => u.id)) : 0;
    return maxId + 1;
  }

}

/**
 * Глобальный экземпляр UserManager
 * Реактивность обеспечивается через reactive() внутри класса
 */
export const userManager = new UserManager();

