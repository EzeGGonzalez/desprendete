<template lang="pug">
  section#products
    .layout
      .filters
        p Categorías
        ul
          CategoryItem(:model="c" v-for="c in $store.state.categories" :key="c._id")

      .list
        no-ssr
          .masonry-container(v-masonry='', transition-duration='0s', item-selector='.item')
            product(:product='p', v-for='p in products', :key='p._id')
</template>

<script>
import Product from '~/components/product/Product.vue'
import CategoryItem from '~/components/filters/CategoryItem.vue'
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
        params: {
          q: query.q,
          category: category._id
        }
      })
    }
  },

  components: {
    Product,
    CategoryItem,
    NoSSR
  }
}
</script>

<style lang="sass" scoped>
.filters
  p
    margin-left: 40px
    text-transform: uppercase
    font-weight: 500
    border-bottom: 1px solid

  ul
    list-style-type: none
</style>
