import { ref } from 'vue';
import type { IUser } from '@entities/user/types';
import { exportToCSV, formatDate } from '@shared/lib';
import { handleError } from '@entities/user/model/user-helpers';
import { userManager } from '@entities/user/model/user-manager';
import { User } from '@entities/user/model/user';
import { globalModal } from '@shared/ui';
import { selectedUsers } from '@entities/user/composables/use-table';
import AddUserForm from '@entities/user/ui/modal/AddUserForm.vue';
import UserDetailsContent from '@entities/user/ui/modal/UserDetailsContent.vue';

const confirmAction = (message: string): boolean => confirm(message);

const withErrorHandling = async (action: () => Promise<void>, errorMessage: string): Promise<void> => {
  try {
    await action();
  } catch (err) {
    handleError(errorMessage, err);
  }
};

const editingId = ref<number | null>(null);
const editForm = ref<User>(new User());

export const useActions = () => {
  const resetEditForm = (): void => {
    editingId.value = null;
    editForm.value = new User();
  };

  const handleStartEdit = (user: IUser): void => {
    editingId.value = user.id;
    editForm.value = new User(user);
  };

  const handleSaveEdit = async (userId: number): Promise<void> => {
    await withErrorHandling(async () => {
      await userManager.updateUser(userId, editForm.value.toUpdateDto());
      resetEditForm();
    }, 'Ошибка сохранения');
  };

  const handleEditFieldChange = (field: 'name' | 'email' | 'role', value: any): void => {
    (editForm.value as any)[field] = value;
  };

  const handleAdd = async (): Promise<void> => {
    await withErrorHandling(async () => {
      await globalModal.open({
        title: 'Добавить нового пользователя',
        component: AddUserForm,
        large: false,
        closable: true,
        closeOnOverlay: true,
      });
    }, 'Ошибка при добавлении пользователя');
  };

  const handleDelete = async (userId: number): Promise<void> => {
    if (!confirmAction('Вы уверены, что хотите удалить пользователя?')) return;
    await withErrorHandling(
      async () => await userManager.delete(userId),
      'Ошибка удаления'
    );
  };

  const handleDeleteSelected = async (): Promise<void> => {
    if (selectedUsers.value.length === 0) return;
    if (!confirmAction(`Вы уверены, что хотите удалить ${selectedUsers.value.length} пользователей?`)) return;
    await withErrorHandling(async () => {
      await userManager.delete(selectedUsers.value);
      selectedUsers.value = [];
    }, 'Ошибка удаления');
  };

  const handleToggleStatus = (userId: number): void => {
    try {
      userManager.toggleStatus(userId);
    } catch (err) {
      handleError('Ошибка изменения статуса', err);
    }
  };

  const handleOpenDetails = async (user: IUser): Promise<void> => {
    await withErrorHandling(async () => {
      await globalModal.open({
        title: 'Информация о пользователе',
        component: UserDetailsContent,
        props: { user },
        large: true,
      });
    }, 'Ошибка при открытии деталей');
  };

  const handleExport = (filteredUsers: IUser[]): void => {
    const usersToExport =
      selectedUsers.value.length > 0
        ? userManager.users.filter((u: IUser) => selectedUsers.value.includes(u.id))
        : filteredUsers;
    const headers = [
      'ID',
      'Имя',
      'Email',
      'Роль',
      'Статус',
      'Дата регистрации',
    ];
    const rows = usersToExport.map((user: IUser) => [
      user.id,
      user.name,
      user.email,
      User.getRoleLabel(user.role),
      user.status === 'active' ? 'Активен' : 'Неактивен',
      formatDate(user.registrationDate),
    ]);
    exportToCSV(rows, headers, 'users_export');
  };

  return {
    handleAdd,
    handleOpenDetails,
    editingId,
    editForm,
    handleStartEdit,
    handleCancelEdit: resetEditForm,
    handleSaveEdit,
    handleEditFieldChange,
    handleDelete,
    handleDeleteSelected,
    handleToggleStatus,
    handleExport,
  };
};

