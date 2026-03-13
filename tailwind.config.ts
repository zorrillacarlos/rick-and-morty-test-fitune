import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
