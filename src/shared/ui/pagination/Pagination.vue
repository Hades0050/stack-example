<template>
  <div :class="style.pagination">
    <div :class="style['pagination-info']">
      Показано {{ paginationStart }} - {{ paginationEnd }} из {{ totalItems }}
    </div>

    <div :class="style['pagination-controls']">
      <button
        @click="handleGoToPage(1)"
        :disabled="currentPage === 1"
        :class="style['btn-page']"
      >
        ⏮️
      </button>
      <button
        @click="handleGoToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        :class="style['btn-page']"
      >
        ◀️
      </button>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="handleGoToPage(page)"
        :class="getPageButtonClass(page)"
      >
        {{ page }}
      </button>

      <button
        @click="handleGoToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="style['btn-page']"
      >
        ▶️
      </button>
      <button
        @click="handleGoToPage(totalPages)"
        :disabled="currentPage === totalPages"
        :class="style['btn-page']"
      >
        ⏭️
      </button>
    </div>

    <div :class="style['page-size-selector']">
      <label>На странице:</label>
      <select v-model="localItemsPerPage" @change="handlePageSizeChange">
        <option
          v-for="option in pageSizeOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, useCssModule } from 'vue';
import type { ISelectOption } from '@shared/ui/select/types';

interface Props {
  currentPage: number;
  totalPages: number;
  paginationStart: number;
  paginationEnd: number;
  totalItems: number;
  itemsPerPage: number;
  visiblePages: (number | string)[];
  pageSizeOptions?: ISelectOption[];
}

interface Emits {
  (e: 'update:itemsPerPage', value: number): void;
  (e: 'goToPage', page: number): void;
}

const {
  currentPage,
  totalPages,
  paginationStart,
  paginationEnd,
  totalItems,
  itemsPerPage,
  visiblePages,
  pageSizeOptions = [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ],
} = defineProps<Props>();

const emit = defineEmits<Emits>();
const style = useCssModule();

const localItemsPerPage = ref(itemsPerPage);

watch(
  () => itemsPerPage,
  (newValue) => {
    localItemsPerPage.value = newValue;
  }
);

const getPageButtonClass = (page: number | string): string | string[] => {
  const classes = [style['btn-page']];
  if (currentPage === page) {
    classes.push(style.active);
  }
  return classes;
};

const handleGoToPage = (page: number | string): void => {
  if (typeof page === 'number') {
    emit('goToPage', page);
  }
};

const handlePageSizeChange = (): void => {
  emit('update:itemsPerPage', localItemsPerPage.value);
};
</script>

<style module src="./pagination.css"></style>
