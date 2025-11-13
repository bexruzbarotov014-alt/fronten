// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],
 
  i18n: {
    locales: [
     { code: 'uz', name: 'O‘zbek', file: 'uz.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'uz',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
  
  }},
  css: ['~/assets/css/main.css'],
  
  runtimeConfig: {
    public: {
      // @ts-expect-error `process` is available at build time in Nuxt config
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5001/api'
    }
  },
  
  app: {
    head: {
      title: 'Alkogol Do\'koni',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Alkogol mahsulotlari online do\'koni' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  
  compatibilityDate: '2024-11-09'
})