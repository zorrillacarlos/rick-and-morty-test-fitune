<template>
  <button
    @click.stop="handleToggle"
    :aria-label="isFav ? 'Remove from favorites' : 'Add to favorites'"
    :title="isFav ? 'Remove from favorites' : 'Add to favorites'"
    class="p-1.5 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 dark:focus:ring-offset-gray-900"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="w-5 h-5 transition-colors"
      :class="
        isFav
          ? 'fill-yellow-400 text-yellow-400'
          : 'fill-none text-gray-400 hover:text-yellow-400'
      "
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";
import type { CharacterData } from "@/types/characters";

const props = defineProps<{
  character: CharacterData;
}>();

const store = useFavoritesStore();
const isFav = computed(() => store.isFavorite(props.character.id));

const handleToggle = () => {
  store.toggle(props.character);
};
</script>
