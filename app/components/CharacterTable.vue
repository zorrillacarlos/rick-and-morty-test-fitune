<template>
  <div
    class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
  >
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th
            class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16"
          >
            Avatar
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Species
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            class="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Origin
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16"
          >
            Fav
          </th>
        </tr>
      </thead>
      <tbody
        class="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800"
      >
        <template v-if="characters.length > 0">
          <CharacterRow
            v-for="character in characters"
            :key="character.id"
            :character="character"
          />
        </template>
        <tr v-else>
          <td
            colspan="6"
            class="px-4 py-16 text-center text-gray-500 dark:text-gray-400"
          >
            No characters found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { CharacterData } from "@/types/characters";

defineProps<{
  characters: CharacterData[];
}>();
</script>
