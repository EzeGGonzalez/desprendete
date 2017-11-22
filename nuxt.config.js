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
      { hid: 'description', name: 'description', content: 'desprendete' }
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
    '@nuxtjs/dotenv'
  ],
  
  plugins: [
    '~plugins/axios.js',
    { src: '~plugins/vue-masonry.js', ssr: false }
  ],

  env: {
    baseUrl: process.env.BASE_URL,
    apiUrl: process.env.API_URL
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
    }
  }
}
