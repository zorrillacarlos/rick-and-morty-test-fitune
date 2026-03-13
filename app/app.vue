<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";

onMounted(() => {
  useFavoritesStore().load();
});
</script>
