<template>
  <div class="item">
    <nuxt-link :to="`/product/${product._id}`">
      <b-card :title="product.name"
        :img-src="product.mainImage | cloudinaryThumb"
        :img-alt="product.name"
        img-top
        tag="article" :id="`product-${product._id}`">
        <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
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
  }
}
</script>

