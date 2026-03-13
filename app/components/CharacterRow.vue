<template>
  <tr
    @click="navigate"
    class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
  >
    <td class="px-4 py-3">
      <img
        :src="character.image"
        :alt="character.name"
        loading="lazy"
        width="40"
        height="40"
        class="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
      />
    </td>
    <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">
      {{ character.name }}
    </td>
    <td class="hidden sm:table-cell px-4 py-3 text-gray-600 dark:text-gray-300">
      {{ character.species }}
    </td>
    <td class="px-4 py-3">
      <StatusBadge :status="character.status" />
    </td>
    <td
      class="hidden sm:table-cell px-4 py-3 text-gray-600 dark:text-gray-300 max-w-[200px] truncate"
    >
      {{ character.origin.name }}
    </td>
    <td class="px-4 py-3">
      <ClientOnly>
        <FavoriteButton :character="character" />
      </ClientOnly>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { CharacterData } from "@/types/characters";

const props = defineProps<{
  character: CharacterData;
}>();

const router = useRouter();

const navigate = () => {
  router.push(`/character/${props.character.id}`);
};
</script>
