import { ref, computed, type Ref } from 'vue';
import type { IUser, TUserRole, TUserStatus } from './types';

/**
 * Композабл для фильтрации данных
 */
export const useFiltering = (users: Ref<IUser[]>) => {
  const searchQuery = ref('');
  const filterRole = ref<TUserRole | ''>('');
  const filterStatus = ref<TUserStatus | ''>('');
  const dateFrom = ref('');
  const dateTo = ref('');

  const filteredUsers = computed(() => {
    let filtered = users.value;

    // Фильтр по роли
    if (filterRole.value) {
      filtered = filtered.filter((user: IUser) => user.role === filterRole.value);
    }

    // Фильтр по статусу
    if (filterStatus.value) {
      filtered = filtered.filter(
        (user: IUser) => user.status === filterStatus.value
      );
    }

    if (dateFrom.value) {
      const fromDate = new Date(dateFrom.value);
      filtered = filtered.filter((user: IUser) => {
        const userDate = new Date(user.registrationDate);
        return userDate >= fromDate;
      });
    }

    if (dateTo.value) {
      const toDate = new Date(dateTo.value);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((user: IUser) => {
        const userDate = new Date(user.registrationDate);
        return userDate <= toDate;
      });
    }

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim();
      filtered = filtered.filter(
        (user: IUser) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.id.toString().includes(query)
      );
    }

    return filtered;
  });

  const clearAllFilters = (): void => {
    searchQuery.value = '';
    filterRole.value = '';
    filterStatus.value = '';
    dateFrom.value = '';
    dateTo.value = '';
  };

  const clearDateFilter = (): void => {
    dateFrom.value = '';
    dateTo.value = '';
  };

  return {
    searchQuery,
    filterRole,
    filterStatus,
    dateFrom,
    dateTo,
    filteredUsers,
    clearAllFilters,
    clearDateFilter,
  };
};

