<template>
  <div class="item">
    <nuxt-link :to="`/product/${product.slug}`">      
      <b-card :title="product.name"
        :img-src="product.mainImage | cloudinaryThumb"
        :img-alt="product.name"
        img-top
        tag="article" :id="`product-${product._id}`">

        <span v-if="showInterested()" class="oi oi-star interested" title="icon name" aria-hidden="true"></span>
        
      </b-card>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['product'],

  mounted () {
    let cardWidth = document.querySelector('.card-img-top').offsetWidth
    let incFactor = cardWidth / this.product.mainImage.width
    document.querySelector(`#product-${this.product._id} img`).style.height = `${this.product.mainImage.height * incFactor}px`
  },

  methods: {
    showInterested () {
      return this.$store.state.transactions.find(t => t.product === this.product._id)
    }
  }
}
</script>

