# Rick & Morty Character Directory — Contexto del Proyecto

## Identidad

Prueba técnica para Fitune. Directorio de personajes de Rick & Morty con búsqueda, paginación y favoritos persistidos.

## Stack

- Nuxt 4 (`compatibilityVersion: 4`)
- TypeScript strict
- Pinia (Composition style) — favoritos con persistencia manual en `localStorage`
- TailwindCSS (dark mode via `dark:` classes)
- GraphQL consumido via `$fetch` POST (sin cliente GraphQL)
- API: Rick and Morty GraphQL API

## Convenciones locales

- Queries GraphQL como constantes string al tope del archivo composable (`CHARACTERS_QUERY`, `CHARACTER_QUERY`)
- Paginación y búsqueda sincronizadas con URL query params (`?page=1&search=rick`) — nunca estado local aislado
- `getCachedData` en `useAsyncData` para aprovechar payload de Nuxt
- Dark mode toggle gestionado por `DarkModeToggle.vue` — usa `useColorMode` de `@nuxtjs/color-mode`

## Estructura

```
app/
  components/     ← UI pura (CharacterTable, Pagination, StatusBadge, etc.)
  composables/    ← useCharacters, useCharacter
  pages/          ← index, favorites, character/[id]
  stores/         ← favorites.ts (Pinia)
  types/          ← characters.ts, character-detail.ts
  utils/          ← api.ts (API_ENDPOINT)
```

Las reglas de código globales de Carlos aplican — ver `~/.claude/CLAUDE.md`.
