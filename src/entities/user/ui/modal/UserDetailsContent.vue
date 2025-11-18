<template>
  <div v-if="user" class="user-details">
    <div class="detail-section">
      <img
        :src="user.avatar || getDefaultAvatar(user.name)"
        :alt="user.name"
        class="avatar-large"
      />
      <h2>{{ user.name }}</h2>
      <p class="user-email">{{ user.email }}</p>
    </div>

    <div class="detail-section">
      <h4>Основная информация</h4>
      <div class="detail-row">
        <span class="label">ID:</span>
        <span>{{ user.id }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Роль:</span>
        <span :class="['role-badge', 'role-' + user.role]">
          {{ User.getRoleLabel(user.role) }}
        </span>
      </div>
      <div class="detail-row">
        <span class="label">Статус:</span>
        <span
          :class="[
            'status-badge',
            user.status === 'active' ? 'status-active' : 'status-inactive',
          ]"
        >
          {{ user.status === 'active' ? 'Активен' : 'Неактивен' }}
        </span>
      </div>
      <div class="detail-row">
        <span class="label">Дата регистрации:</span>
        <span>{{ formatDate(user.registrationDate) }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Последняя активность:</span>
        <span>{{ formatRelativeTime(user.lastActivity) }}</span>
      </div>
    </div>

    <div class="detail-section">
      <h4>Статистика</h4>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ user.loginCount || 0 }}</div>
          <div class="stat-label">Входов</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ user.postsCount || 0 }}</div>
          <div class="stat-label">Постов</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ user.commentsCount || 0 }}</div>
          <div class="stat-label">Комментариев</div>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      <Button variant="secondary" @click="handleClose">Закрыть</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, globalModal } from '@shared/ui';
import { formatDate, formatRelativeTime, getDefaultAvatar } from '@shared/lib';
import { User } from '@entities/user/model/user';
import type { IUser } from '@entities/user/types';

interface Props {
  user: IUser | null;
}

defineProps<Props>();

/**
 * Закрывает модальное окно
 */
const handleClose = (): void => {
  globalModal.close(null);
};
</script>

<style scoped>
.user-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-section {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 6px;
}

.detail-section h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
}

.avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 15px;
  display: block;
}

.user-email {
  color: #666;
  text-align: center;
  margin: 5px 0 0 0;
}

.detail-section h2 {
  text-align: center;
  margin: 0 0 5px 0;
  font-size: 22px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .label {
  font-weight: 500;
  color: #666;
}

.role-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.role-admin {
  background: #ffebee;
  color: #c62828;
}

.role-user {
  background: #e3f2fd;
  color: #1565c0;
}

.role-moderator {
  background: #fff3e0;
  color: #e65100;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-inactive {
  background: #ffebee;
  color: #c62828;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stat-card {
  background: white;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
</style>

