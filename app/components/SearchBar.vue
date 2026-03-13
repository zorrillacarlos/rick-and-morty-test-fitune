<template>
  <div class="relative w-full">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <svg
        class="h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <input
      @input="handleInput($event)"
      :value="modelValue"
      type="search"
      placeholder="Search characters..."
      class="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
    />
  </div>
</template>

<script setup lang="ts">
import { debounce } from "@/utils/debounce";

const DEBOUNCE_DELAY = 400;
const MIN_SEARCH_LENGTH = 4;

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const emitDebounced = debounce((val: string): void => {
  emit("update:modelValue", val);
}, DEBOUNCE_DELAY);

const handleInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  if (val.length === 0 || val.length >= MIN_SEARCH_LENGTH) {
    emitDebounced(val);
  }
};
</script>
