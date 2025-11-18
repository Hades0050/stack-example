import { ref, computed, type Ref, type ComputedRef } from 'vue';

const generateVisiblePages = (currentPage: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = [];
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  }
  
  return pages;
};


export const calculatePagination = (
  page: number,
  rowsPerPage: number,
  totalItems: number
) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const paginationStart = (page - 1) * rowsPerPage + 1;
  const paginationEnd = Math.min(page * rowsPerPage, totalItems);
  const visiblePages = generateVisiblePages(page, totalPages);
  
  return {
    totalPages,
    paginationStart,
    paginationEnd,
    visiblePages,
  };
};


export const usePagination = <T>(
  items: Ref<T[]> | ComputedRef<T[]>,
  pageSize: number = 25
) => {
  const currentPage = ref(1);
  const itemsPerPage = ref(pageSize);

  const pagination = computed(() =>
    calculatePagination(currentPage.value, itemsPerPage.value, items.value.length)
  );

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return items.value.slice(start, end);
  });

  const goToPage = (page: number | string): void => {
    if (typeof page === 'string' || page < 1 || page > pagination.value.totalPages) return;
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetPage = (): void => {
    currentPage.value = 1;
  };

  return {
    currentPage,
    itemsPerPage,
    pagination,
    paginatedItems,
    goToPage,
    resetPage,
  };
};
