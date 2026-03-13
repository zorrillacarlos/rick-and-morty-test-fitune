<template>
  <div class="flex items-center justify-center gap-1 flex-wrap">
    <button
      @click="emit('prev')"
      :disabled="page <= 1"
      class="px-3 py-2 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      ← Previous
    </button>

    <template v-for="item in displayedPages" :key="item">
      <span
        v-if="item === '...'"
        class="px-2 py-2 text-gray-400 dark:text-gray-500 text-sm select-none"
      >
        ...
      </span>
      <button
        v-else
        @click="emit('goto', item as number)"
        :class="[
          'px-3 py-2 rounded-md text-sm font-medium border transition-colors',
          item === page
            ? 'bg-green-600 text-white border-green-600'
            : 'border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
        ]"
      >
        {{ item }}
      </button>
    </template>

    <button
      @click="emit('next')"
      :disabled="page >= totalPages"
      class="px-3 py-2 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      Next →
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ page: number; totalPages: number }>();

const emit = defineEmits<{
  prev: [];
  next: [];
  goto: [page: number];
}>();

const displayedPages = computed((): (number | string)[] => {
  const { totalPages: total, page: current } = props;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
});
</script>
