import type { CharacterDetailResponse } from "@/types/character-detail";
import { API_ENDPOINT } from "@/utils/api";

const CHARACTER_QUERY = `
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin { name }
      location { name }
      episode { id }
    }
  }
`;

export const useCharacter = (id: string) => {
  const { data, pending, error } = useAsyncData<CharacterDetailResponse>(
    `character-${id}`,
    () =>
      $fetch(API_ENDPOINT, {
        method: "POST",
        body: { query: CHARACTER_QUERY, variables: { id } },
      }),
    { getCachedData: (key) => useNuxtApp().payload.data[key] }
  );

  const character = computed(() => data.value?.data?.character ?? null);

  return { character, pending, error };
};
