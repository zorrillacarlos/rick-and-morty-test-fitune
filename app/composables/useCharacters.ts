import type { CharactersResponse } from "@/types/characters";
import { API_ENDPOINT } from "@/utils/api";

const CHARACTERS_QUERY = `
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        species
        status
        image
        origin {
          name
        }
      }
    }
  }
`;

export const useCharacters = (page: Ref<number>, search: Ref<string>) => {
  const { data, pending, error } = useAsyncData(
    () => `characters-${page.value}-${search.value}`,
    () =>
      $fetch<CharactersResponse>(API_ENDPOINT, {
        method: "POST",
        body: {
          query: CHARACTERS_QUERY,
          variables: {
            page: page.value,
            name: search.value || undefined,
          },
        },
      }),
    {
      watch: [page, search],
      getCachedData: (key) => useNuxtApp().payload.data[key],
    }
  );

  const characters = computed(
    () => data.value?.data?.characters?.results ?? []
  );
  const info = computed(() => data.value?.data?.characters?.info ?? null);

  return { characters, info, pending, error };
};
