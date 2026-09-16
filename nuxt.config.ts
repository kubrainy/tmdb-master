import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiKey: process.env.TMDB_API_KEY,
      accessToken: process.env.ACCESS_TOKEN,
    },
  },

})
