const path = require('path')
require('dotenv').config()

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'desprendete',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'desprendete' },
      { hid: 'fb:app_id', property: 'fb:app_id', content: process.env.FACEBOOK_APP_ID }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  css: [
    { src: '~assets//open-iconic/font/css/open-iconic.css' },
    { src: '~assets//open-iconic/font/css/open-iconic-bootstrap.css' },
    { src: '~assets/scss/main.scss', lang: 'scss' }
  ],

  modules: [
    ['bootstrap-vue/nuxt', { css: false }],
    '@nuxtjs/dotenv',
    '@nuxtjs/axios'
  ],
  
  axios: {
    credentials: false
  },

  plugins: [
    { src: '~plugins/vue-masonry.js', ssr: false },
    { src: '~plugins/maps.js', ssr: false },
    '~plugins/filters/fullname.js',
    '~plugins/filters/cloudinary-thumb.js',
    '~plugins/directives.js',
  ],

  env: {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    API_URL_BROWSER: process.env.API_URL_BROWSER,
    GMAPS_KEY: process.env.GMAPS_KEY
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules.splice(0, 0, {
        test: /\.js$/,
        include: [path.resolve(__dirname, './node_modules/vue2-google-maps')],
        loader: 'babel-loader',
      })
    }
  }
}
