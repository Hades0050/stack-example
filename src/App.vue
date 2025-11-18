<script setup lang="ts">
import { ref } from 'vue';
import { UserTable } from '@entities/user';
import UserTableOld from '@/components/UserTableOld.vue';
import { Button } from '@shared/ui';

const isNewVersion = ref<boolean>(false);

const handleShowOld = (): void => {
  isNewVersion.value = false;
};

const handleShowNew = (): void => {
  isNewVersion.value = true;
};
</script>

<template>
  <div class="app-container">
    <div class="app-content">
      <div class="version-switcher">
        <Button 
          :variant="!isNewVersion ? 'primary' : 'secondary'"
          @click="handleShowOld"
        >
          Старая версия
        </Button>
        
        <Button 
          :variant="isNewVersion ? 'primary' : 'secondary'"
          @click="handleShowNew"
        >
          Новая версия
        </Button>
      </div>

      <keep-alive>
        <component :is="isNewVersion ? UserTable : UserTableOld" :key="isNewVersion ? 'new' : 'old'" />
      </keep-alive>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1rem;
}

.app-content {
  max-width: 90rem;
  margin: 0 auto;
}

.version-switcher {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}
</style>
