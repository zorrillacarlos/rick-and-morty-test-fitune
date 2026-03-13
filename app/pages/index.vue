<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Rick & Morty
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">
            Character Directory
          </p>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink
            v-if="favoritesCount > 0"
            to="/favorites"
            class="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-yellow-300 dark:border-yellow-500/40 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-500/20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 fill-yellow-400"
              viewBox="0 0 24 24"
            >
              <path
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            Favorites
            <ClientOnly>
              <span
                class="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-yellow-400 text-white dark:bg-yellow-500"
                >{{ favoritesCount }}</span
              >
            </ClientOnly>
          </NuxtLink>
          <DarkModeToggle />
        </div>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <SearchBar v-model="search" />
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex items-center justify-center py-24">
        <div
          class="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"
        />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-24">
        <p class="text-red-500 dark:text-red-400 text-lg">
          Failed to load characters. Please try again.
        </p>
      </div>

      <!-- Content -->
      <template v-else>
        <CharacterTable :characters="characters" />
        <div class="mt-6">
          <Pagination
            :page="page"
            :total-pages="info?.pages ?? 1"
            @prev="setPage(page - 1)"
            @next="setPage(page + 1)"
            @goto="setPage"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const page = computed({
  get: () => Number(route.query.page) || 1,
  set: (val: number) => {
    router.replace({ query: { ...route.query, page: String(val) } });
  },
});

const search = computed({
  get: () => String(route.query.search ?? ""),
  set: (val: string) => {
    router.replace({ query: { page: "1", search: val || undefined } });
  },
});

const { characters, info, pending, error } = useCharacters(page, search);

const { favorites } = storeToRefs(useFavoritesStore());
const favoritesCount = computed(() => favorites.value.length);

const setPage = (n: number) => {
  page.value = Math.max(1, Math.min(n, info.value?.pages ?? 1));
};

// SEO
useSeoMeta({
  title: "Rick & Morty — Character Directory",
  description:
    "Browse all Rick and Morty characters. Search by name, filter by status, and save your favorites.",
  ogTitle: "Rick & Morty Character Directory",
  ogDescription:
    "Browse all Rick and Morty characters. Search by name, filter by status, and save your favorites.",
});
</script>
