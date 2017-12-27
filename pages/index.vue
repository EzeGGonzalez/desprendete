<template>
  <section id="products">
    <div class="list">
      <no-ssr>
        <div v-masonry transition-duration="0s" item-selector=".item" class="masonry-container">
          <product :product="p" v-for="p in products" :key="p._id"/>
        </div>
      </no-ssr>
    </div>
  </section>
</template>

<script>
  import Product from '~/components/product/Product.vue'
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
      'no-ssr': NoSSR
    }
  }
</script>
