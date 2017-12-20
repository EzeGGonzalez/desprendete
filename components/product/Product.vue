<template>
  <div class="item col-md-3 col-sm-4 col-6">
    <nuxt-link :to="`/product/${product.slug}`">      
      <b-card :title="product.name"
        :img-src="product.mainImage | cloudinaryThumb"
        :img-alt="product.name"
        img-top
        title-tag="h6" tag="article" :id="`product-${product._id}`">

        <span v-if="showInterested()" class="oi oi-star interested m-2 p-2" title="icon name" aria-hidden="true"></span>
        
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
@import "~assets/scss/color"

.item
  margin-bottom: 30px

  @media screen and (max-width: 540px)
    margin-bottom: 20px
    padding-right: 10px
    padding-left: 10px

  a
    color: inherit

    &:hover
      text-decoration: none

  .card
    .card-title
      margin-bottom: 0
      font-weight: 400

    .interested
      position: absolute
      top: 0
      right: 0
      background-color: $brand-secondary
      border-radius: 50%
      color: white
</style>
