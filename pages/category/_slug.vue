<template lang="pug">
  section#products
    .list
      no-ssr
        .masonry-container(v-masonry='', transition-duration='0s', item-selector='.item')
          product(:product='p', v-for='p in products', :key='p._id')
</template>

<script>
import Product from '~/components/product/Product.vue'
import NoSSR from 'vue-no-ssr'

const R = require('ramda')

export default {
  async asyncData ({ params, query, app, store }) {
    const category = R.pipe(
      R.pluck('subcategories'),
      R.flatten,
      R.concat(store.state.categories),
      R.find(R.propEq('slug', params.slug))
    )(store.state.categories)

    return {
      category,
      products: await app.$axios.$get(`/api/products`, {
        data: {
          filters: {
            q: query.q,
            categoryId: category._id
          }
        }
      })
    }
  },

  components: {
    Product,
    NoSSR
  }
}
</script>
