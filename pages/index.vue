<template>
  <section id="products">
    <div class="list">
      <no-ssr>
        <div v-masonry transition-duration="0.5s" item-selector=".item" class="masonry-container">
          <product :product="p" v-for="p in products" :key="p._id"/>
        </div>
      </no-ssr>
    </div>
  </section>
</template>

<script>
  import Product from '~/components/product/Product.vue'
  import NoSSR from 'vue-no-ssr'
  import axios from '~/plugins/axios'

  export default {
    async asyncData ({ params }) {
      let { data: products } = await axios.get(`/api/products`)
      return { products }
    },
    mounted () {
      if (typeof this.$redrawVueMasonry === 'function') {
        // this.$nextTick(() => this.$redrawVueMasonry())
      }
    },
    components: {
      Product,
      'no-ssr': NoSSR
    }
  }
</script>
