export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  server: {
    host: '0.0.0.0', // to expose to local network
  },
  head: {
    title: 'SC2Hub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Browse StarCraft 2 esports content without spoilers. SC2Hub collects videos, articles and events of major StarCraft 2 tournaments and optionally hides player names, matchups and other information that might spoil the tournament winners while you are still watching the group stage. Optimized for both desktop and mobile devices. Integrated with both Twitch and Youtube platforms. Connects TL.net events calendar with the videos of those events. No sign up required.',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato:400,700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:500&display=swap',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['./assets/css/index.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/axios'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: ['~/components', '~/components/admin', '~/components/base'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.NUXT_ENV_BASE_URL,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  /*
   ** PWA configuration
   ** See https://pwa.nuxtjs.org/
   */
  pwa: {
    meta: {
      name: 'SC2Hub',
      description: 'Browse StarCraft 2 esports content without spoilers',
      theme_color: '#4299d7',
      ogHost: 'https://sc2hub.net',
      viewport:
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
    },
    manifest: {
      name: 'SC2Hub',
      short_name: 'SC2Hub',
      description: 'Browse StarCraft 2 esports content without spoilers',
    },
  },
  loading: {
    color: 'var(--color-primary-700)',
    error: 'var(--color-negative-700)',
  },
};
