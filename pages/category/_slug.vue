<template lang="pug">
  ProductList(:products='products')
</template>

<script>
import ProductList from '~/components/product/List.vue'

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
        params: {
          q: query.q,
          category: category._id,
          geolat: store.state.geo.lat,
          geolng: store.state.geo.lng,
          geodist: store.state.geo.distance
        }
      })
    }
  },

  components: {
    ProductList
  }
}
</script>