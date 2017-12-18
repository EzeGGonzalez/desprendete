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

<style lang="sass" scoped>
@import "~assets/scss/resources.scss"

.item
  @include make-col-ready()
  @include make-col(3)

  @extend .mb-4

  a
    color: inherit

    &:hover
      text-decoration: none

  .card
    .card-title
      @extend .h6
      margin-bottom: 0
      font-weight: 400

    .interested
      position: absolute
      top: 0
      right: 0
      @extend .m-2

      background-color: $brand-secondary
      border-radius: 50%
      @extend .p-2

      color: white
</style>
