// https://nuxt.com/docs/getting-started/configuration
// @ts-check
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],
 
  i18n: {
    locales: [
      { code: 'uz', iso: 'uz', name: 'O\'zbek' },
      { code: 'ru', iso: 'ru', name: 'Русский' },
      { code: 'en', iso: 'en', name: 'English' }
    ],
    defaultLocale: 'uz',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
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
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'Alkogol mahsulotlari online do\'koni' },
        { name: 'theme-color', content: '#dc2626' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'AlcoShop' },
        { name: 'application-name', content: 'AlcoShop' },
        { name: 'msapplication-TileColor', content: '#dc2626' },
        { name: 'msapplication-config', content: '/browserconfig.xml' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  
  compatibilityDate: '2024-11-09'
})