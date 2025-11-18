import type { IUser, TCreateUserDto, TUpdateUserDto } from '@entities/user/model/types';

/**
 * API для работы с пользователями
 */
class UserApi {
  /**
   * Загружает список пользователей
   */
  async loadUsers(): Promise<IUser[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [];
  }

  /**
   * Создает нового пользователя
   */
  async createUser(_dto: TCreateUserDto): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
  }

  /**
   * Обновляет пользователя
   */
  async updateUser(_id: number, _dto: TUpdateUserDto): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
  
  }

  /**
   * Удаляет пользователя
   */
  async deleteUser(_id: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  /**
   * Удаляет несколько пользователей
   */
  async deleteUsers(_ids: number[]): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

export const userApi = new UserApi();

