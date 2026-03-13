<template>
  <span
    :class="badgeClass"
    class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="dotClass" />
    {{ status }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: string;
}>();

const badgeClass = computed(() => {
  switch (props.status.toLowerCase()) {
    case "alive":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "dead":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
});

const dotClass = computed(() => {
  switch (props.status.toLowerCase()) {
    case "alive":
      return "bg-green-500";
    case "dead":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
});
</script>
