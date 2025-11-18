import { ref, onMounted, computed, watch, reactive } from 'vue';
import { formatDate, formatRelativeTime } from '@shared/lib';
import { userApi } from '@entities/user/api/user-api';
import { generateMockUsers } from '@entities/user/model/user-helpers';
import { userManager } from '@entities/user/model/user-manager';
import type { IUser, TUserRole, TUserStatus } from '@entities/user/types';

/**
 * Параметры фильтрации пользователей
 */
export interface IUserFilters {

  searchQuery: string;
  filterRole: TUserRole | '';
  filterStatus: TUserStatus | '';
  dateFrom: string;
  dateTo: string;
}

/**
 * Глобальное состояние выбранных пользователей
 */
export const selectedUsers = ref<number[]>([]);

/**
 * Пагинация
 */
export const currentPage = ref(1);
export const rowsPerPage = ref(25);


export const filters = reactive<IUserFilters>({
  searchQuery: '',
  filterRole: '',
  filterStatus: '',
  dateFrom: '',
  dateTo: '',
});


const filterUsers = (users: IUser[], filters: IUserFilters): IUser[] => {
  return users.filter((user: IUser) => {
    // Фильтр по роли
    if (filters.filterRole && user.role !== filters.filterRole) {
      return false;
    }

    if (filters.filterStatus && user.status !== filters.filterStatus) {
      return false;
    }

    if (filters.dateFrom || filters.dateTo) {
      const userDate = new Date(user.registrationDate);
      
      if (filters.dateFrom && userDate < new Date(filters.dateFrom)) {
        return false;
      }
      
      if (filters.dateTo) {
        const endDate = new Date(filters.dateTo);
        endDate.setHours(23, 59, 59, 999);
        if (userDate > endDate) {
          return false;
        }
      }
    }

    const trimmedQuery = filters.searchQuery?.trim();
    if (trimmedQuery) {
      const lowerQuery = trimmedQuery.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.id.toString().includes(lowerQuery);
      
      if (!matchesSearch) {
        return false;
      }
    }

    return true;
  });
};

export const clearFilters = (): void => {
  filters.searchQuery = '';
  filters.filterRole = '';
  filters.filterStatus = '';
  filters.dateFrom = '';
  filters.dateTo = '';
};

export const clearDateFilter = (): void => {
  filters.dateFrom = '';
  filters.dateTo = '';
};

export const useTable = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);


  const filteredUsers = computed(() => filterUsers(userManager.users, filters));

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return filteredUsers.value.slice(start, end);
  });

  
  watch(filters, () => {
    currentPage.value = 1;
  }, { deep: true });

  const loadUsers = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    try {
      await userApi.loadUsers();
      userManager.loadUsers(generateMockUsers(100));
    } catch (err) {
      error.value =
        'Ошибка загрузки данных: ' +
        (err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      isLoading.value = false;
    }
  };

  const handleRetry = async (): Promise<void> => {
    await loadUsers();
  };

  const handleGoToPage = (page: number): void => {
    currentPage.value = page;
  };

  const handleUpdateItemsPerPage = (items: number): void => {
    rowsPerPage.value = items;
    currentPage.value = 1;
  };


  const handleUpdateSelectedRows = (rows: IUser[]): void => {
    selectedUsers.value = rows.map((u: IUser) => u.id);
  };

  const getRowClass = (user: IUser): string => {
    return user.status === 'inactive' ? 'inactive' : '';
  };

  onMounted(() => {
    loadUsers();
  });

  return {
    users: userManager.users,
    filters,
    filteredUsers,
    paginatedUsers,
    currentPage,
    rowsPerPage,
    isLoading,
    error,
    selectedUsers,
    loadUsers,
    handleRetry,
    handleGoToPage,
    handleUpdateItemsPerPage,
    handleUpdateSelectedRows,
    getRowClass,
    clearFilters,
    clearDateFilter,
    formatDate,
    formatRelativeTime,
  };
};
