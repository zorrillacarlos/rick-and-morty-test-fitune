<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:underline font-medium mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Back to directory
          </NuxtLink>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Favorites
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">
            {{ favoritesLabel }}
          </p>
        </div>
        <DarkModeToggle />
      </div>

      <!-- Empty state -->
      <div
        v-if="favorites.length === 0"
        class="flex flex-col items-center justify-center py-24 gap-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-gray-300 dark:text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
        <p class="text-gray-500 dark:text-gray-400 text-lg">No favorites yet</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-colors"
        >
          Browse characters
        </NuxtLink>
      </div>

      <!-- Favorites table -->
      <CharacterTable v-else :characters="favorites" />
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useFavoritesStore();
const { favorites } = storeToRefs(store);

const favoritesLabel = computed(() => {
  const count = favorites.value.length;
  if (count === 0) return "You have no favorites yet";
  if (count === 1) return "1 favorite character";
  return `${count} favorite characters`;
});

useSeoMeta({
  title: "Favorites — Rick & Morty",
  description: "Your favorite Rick and Morty characters.",
});
</script>
