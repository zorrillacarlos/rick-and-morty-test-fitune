export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",

  future: {
    compatibilityVersion: 4,
  },

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  tailwindcss: {
    cssPath: "@/assets/css/tailwind.css",
    configPath: "@/tailwind.config.ts",
  },

  typescript: {
    strict: true,
  },

  app: {
    head: {
      script: [
        {
          innerHTML: `if(localStorage.getItem('darkMode')==='true')document.documentElement.classList.add('dark')`,
          tagPosition: 'head',
        },
      ],
    },
  },

  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit", "pinia"],
    },
  },
});
