const webpack = require('webpack')

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
    ['bootstrap-vue/nuxt', { css: false }]    
  ],
  
  plugins: [
    '~plugins/axios.js',
    { src: '~plugins/vue-masonry.js', ssr: false },
    new webpack.ProvidePlugin({
      Popper: ['popper.js', 'default']
    })
  ],

  env: {
    'API_URL': 'https://apitest.desprendete.com'
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
