<template lang="pug">
  ProductList(:products='products')
</template>

<script>
  import ProductList from '~/components/product/List.vue'

  export default {
    async asyncData ({ params, query, app, store }) {
      return {
        products: await app.$axios.$get(`/api/products`, {
          params: {
            q: query.q,
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
