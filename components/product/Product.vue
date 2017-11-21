<template>
  <div class="item">
    <nuxt-link :to="`/product/${product._id}`">
      <b-card :title="product.name"
        :img-src="product.images[0].secure_url"
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
    let incFactor = cardWidth / this.product.images[0].width
    document.querySelector(`#product-${this.product._id} img`).style.height = `${this.product.images[0].height * incFactor}px`
  }
}
</script>

