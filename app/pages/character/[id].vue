<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back link -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:underline font-medium mb-8"
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

      <!-- Loading -->
      <div v-if="pending" class="flex items-center justify-center py-24">
        <div
          class="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"
        />
      </div>

      <!-- Error / not found -->
      <div v-else-if="error || !character" class="text-center py-24">
        <p class="text-red-500 dark:text-red-400 text-lg">
          Character not found.
        </p>
        <NuxtLink
          to="/"
          class="mt-4 inline-block text-green-600 dark:text-green-400 hover:underline"
        >
          Return home
        </NuxtLink>
      </div>

      <!-- Profile card -->
      <div
        v-else
        class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div class="flex flex-col sm:flex-row">
          <!-- Avatar -->
          <div class="sm:w-64 flex-shrink-0">
            <img
              :src="character.image"
              :alt="character.name"
              class="w-full aspect-square sm:aspect-auto sm:h-full object-cover"
              loading="lazy"
              width="256"
              height="256"
            />
          </div>

          <!-- Details -->
          <div class="flex-1 p-6 sm:p-8">
            <div class="flex items-start justify-between gap-4 mb-6">
              <h1
                class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
              >
                {{ character.name }}
              </h1>
              <ClientOnly>
                <FavoriteButton
                  v-if="characterAsData"
                  :character="characterAsData"
                />
              </ClientOnly>
            </div>

            <dl class="grid grid-cols-2 gap-3 sm:gap-5">
              <div>
                <dt
                  class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1"
                >
                  Status
                </dt>
                <dd><StatusBadge :status="character.status" /></dd>
              </div>
              <div v-for="field in characterFields" :key="field.label">
                <dt
                  class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1"
                >
                  {{ field.label }}
                </dt>
                <dd class="text-gray-900 dark:text-white font-medium">
                  {{ field.value }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const { character, pending, error } = useCharacter(id);

const characterAsData = computed(() =>
  character.value
    ? {
        id: character.value.id,
        name: character.value.name,
        species: character.value.species,
        status: character.value.status,
        image: character.value.image,
        origin: character.value.origin,
      }
    : null
);

const characterFields = computed(() => {
  if (!character.value) return [];
  const characterData = character.value;
  return [
    { label: "Species", value: characterData.species },
    { label: "Gender", value: characterData.gender },
    { label: "Origin", value: characterData.origin.name },
    { label: "Last Location", value: characterData.location.name },
    { label: "Episodes", value: characterData.episode.length },
  ];
});

useSeoMeta({
  title: computed(() =>
    character.value
      ? `${character.value.name} — Rick & Morty`
      : "Character — Rick & Morty"
  ),
  description: computed(() =>
    character.value
      ? `${character.value.name} is a ${character.value.species} from ${character.value.origin.name}. Status: ${character.value.status}.`
      : ""
  ),
});
</script>
