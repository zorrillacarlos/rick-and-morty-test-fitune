import { ref } from "vue";
import { defineStore } from "pinia";
import type { CharacterData } from "@/types/characters";

const STORAGE_KEY = "rm-favorites";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<CharacterData[]>([]);

  const load = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    const parsed = JSON.parse(stored);
    const isValid = Array.isArray(parsed) && parsed.every((f) => typeof f === "object" && f !== null && "id" in f);
    if (isValid) {
      favorites.value = parsed;
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value));
  };

  const toggle = (character: CharacterData) => {
    favorites.value = isFavorite(character.id)
      ? favorites.value.filter((f) => f.id !== character.id)
      : [...favorites.value, character];
    save();
  };

  const isFavorite = (id: string) => favorites.value.some((f) => f.id === id);

  return { favorites, toggle, isFavorite, load };
});
