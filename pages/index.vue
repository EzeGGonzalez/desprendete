<template>
  <section id="products">
    <div class="layout">
      <div class="filters">
        <p>Categorías</p>

        <ul>
          <CategoryItem :model="c" v-for="c in $store.state.categories" :key="c._id" />
        </ul>
      </div>
      <div class="list">
        <no-ssr>
          <div v-masonry transition-duration="0s" item-selector=".item" class="masonry-container">
            <product :product="p" v-for="p in products" :key="p._id"/>
          </div>
        </no-ssr>
      </div>
    </div>
  </section>
</template>

<script>
  import Product from '~/components/product/Product.vue'
  import CategoryItem from '~/components/filters/CategoryItem.vue'
  import NoSSR from 'vue-no-ssr'

  export default {
    async asyncData ({ params, query, app }) {
      return {
        products: await app.$axios.$get(`/api/products`, {
          params: {
            q: query.q
          }
        })
      }
    },
    components: {
      Product,
      CategoryItem,
      'no-ssr': NoSSR
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
