# Rick & Morty Character Directory

Technical test for a Frontend Engineer position at **Fitune**. A web application built with Nuxt 4 that displays characters from the [Rick and Morty API](https://rickandmortyapi.com/graphql).

**Live demo:** https://rick-and-morty-test-fitune.vercel.app

---

## Features

- **Character directory** — paginated table with avatar, name, species, status and origin
- **Search** — debounced input (400 ms), triggers from the 4th character onwards
- **Character profile** — full detail page with all character attributes and episode count
- **Favorites** — mark/unmark characters from the table or the profile page; persisted in `localStorage`
- **Favorites view** — dedicated page showing only your saved characters
- **Dark / light mode** — toggle with `localStorage` persistence; inline script prevents flash of wrong theme (FOWT)
- **State preservation** — page number and search query are synced to URL query params, so navigating back restores the exact position

---

## Tech stack

| Tool | Version | Purpose |
|---|---|---|
| [Nuxt 4](https://nuxt.com) | ^4.1.3 | Framework (SSR / SPA hybrid) |
| [Vue 3](https://vuejs.org) | ^3.5.13 | UI layer (Composition API) |
| [Pinia](https://pinia.vuejs.org) | ^3.0.4 | Favorites state management |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Utility-first styling |
| [Vitest](https://vitest.dev) | ^3.0.5 | Unit testing |
| [TypeScript](https://www.typescriptlang.org) | — | Type safety |

Data is fetched via **GraphQL** from the public Rick and Morty API (`https://rickandmortyapi.com/graphql`).

---

## Getting started

### Prerequisites

- **Node.js** `>=22` (use `nvm` — the `.nvmrc` file is included)

```bash
nvm use
```

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Run tests

```bash
npm test
```

### Build for production

```bash
npm run build
npm run preview
```

---

## Project structure

```
app/
├── assets/css/         # Tailwind entry point
├── components/         # Reusable UI components
│   ├── CharacterRow.vue
│   ├── CharacterTable.vue
│   ├── DarkModeToggle.vue
│   ├── FavoriteButton.vue
│   ├── Pagination.vue
│   ├── SearchBar.vue
│   └── StatusBadge.vue
├── composables/        # Data-fetching composables
│   ├── useCharacter.ts  # Single character detail
│   └── useCharacters.ts # Paginated character list
├── pages/
│   ├── index.vue            # Home — character directory
│   ├── favorites.vue        # Favorites view
│   └── character/[id].vue   # Character profile
├── stores/
│   └── favorites.ts    # Pinia store (localStorage persistence)
├── types/              # Shared TypeScript interfaces
│   ├── characters.ts
│   └── character-detail.ts
└── utils/
    ├── api.ts           # GraphQL endpoint constant
    └── debounce.ts      # Generic debounce utility

tests/
├── favorites.test.ts   # Pinia store unit tests
└── debounce.test.ts    # Debounce utility unit tests
```

---

## Approach and decisions

### Data fetching
`useAsyncData` wraps every GraphQL call so Nuxt can handle SSR hydration and deduplication automatically. `getCachedData` reuses the server payload on the client, avoiding duplicate requests on navigation.

### Favorites store
Favorites are stored as full `CharacterData` objects (not just IDs) so the Favorites view can render the table directly from the store without an extra network request. The store reads/writes `localStorage` on `load` / `save`, and validates the persisted format to handle schema migrations gracefully.

### Dark mode
An inline `<script>` injected in `<head>` reads `localStorage` before the first paint, adding the `dark` class to `<html>` immediately. This eliminates the flash of wrong theme that a plugin or `onMounted` handler would cause.

### Search debounce
The `debounce` utility is generic and framework-agnostic. The `SearchBar` component uses `:value` + `@input` (uncontrolled pattern) instead of `v-model` + watchers, keeping the reactive surface minimal. The search fires only when the input is empty (clear) or has at least 4 characters, reducing unnecessary API calls.

### URL state sync
The current page and search query are reflected in URL params (`?page=2&search=rick`). This means the browser back button and sharing a link both restore the exact table state.

### Component design
All components are typed with `defineProps<>()` generics. No `any` types outside of the `debounce` generic constraint (required for TypeScript to infer `Parameters<T>`).

---

## Trade-offs

| Decision | Why | Alternative considered |
|---|---|---|
| GraphQL over REST | Single request with exactly the fields needed | REST endpoints exist but return more data than necessary |
| Full object in favorites store | Enables offline-style rendering of the favorites page | Storing only IDs would require re-fetching on the favorites page |
| Inline dark-mode script | Zero FOWT | `dark-mode.client.ts` plugin (fires after hydration, causes flash) |
| `@import` instead of `@tailwind` directives | Eliminates IDE linter warnings without modifying editor settings | Silencing `unknownAtRules` in `.vscode/settings.json` |
| No extra routing abstraction | Nuxt file-based routing covers all needs | `vue-router` manual config would add complexity for no gain |

---

## Tests

Two categories are covered:

- **Pinia store** (`tests/favorites.test.ts`) — toggle logic, deduplication, localStorage persistence, and invalid data handling
- **Utility function** (`tests/debounce.test.ts`) — timing, argument forwarding, and multiple rapid calls

```bash
npm test
```

---

## AI assistance

This project was developed with the help of [Cursor](https://cursor.sh) (AI-powered IDE).

AI was used for:
- Iterative code review and refactoring suggestions (component simplification, composable structure)
- Debugging TypeScript errors and Nuxt/Pinia compatibility issues
- Responsive design adjustments and Tailwind class recommendations
- Unit test structure and edge case identification

All code was reviewed, understood, and intentionally accepted or modified before being committed. Architecture decisions, tradeoffs, and feature implementation were driven by my own judgment.
