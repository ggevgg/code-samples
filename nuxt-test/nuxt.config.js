import {
  BASE_URL,
  LOGIN_URL,
  LOGOUT_URL
} from './assets/consts';

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-auth',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [{
    src: '~/plugins/vee-validate.js',
    mode: 'client'
  }],
  build: {
    transpile: ["vee-validate/dist/rules"],
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  axios: {
    baseURL: BASE_URL
  },
  
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: LOGIN_URL, method: 'post', propertyName: 'token' },
          user: false,
          logout: { url: LOGOUT_URL, method: 'post' }
        },
        // tokenType: false
      }
    }
  },
  css: [
    '~assets/css/main.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

