<template>
  <section id="product">
    <div class="row">
      <div class="col-md-6">

        <b-carousel id="product-images" controls indicators>
          <b-carousel-slide v-for="(img, index) in product.images"
            :key="img._id"
            :img-src="img.secure_url"
            :class="img.width > img.height ? 'wider' : 'higher'"
          ></b-carousel-slide>
        </b-carousel>

      </div>

      <div class="col-md-6">
        <div class="card mb-2">
          <div class="card-body">
            <h3 class="name">{{product.name}}</h3>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <p>Compartí con tus amigos</p>

            <div class="share-icons">
              <a :href="shareFB()">
                <img src="/fb.png" alt="share on facebook">
              </a>
              <a :href="shareTW()">
                <img src="/tw.jpg" alt="share on twitter">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    async asyncData ({ params }) {
      let { data: product } = await axios.get(`/api/products/${params.id}`)
      return { product }
    },
    head () {
      return {
        title: this.product.name,
        meta: this.product.images.map(i => ({ hid: 'og-image', property: 'og-image', content: i.secure_url }))
      }
    },

    mounted () {
      let carouselWidth = document.querySelector('#product-images').offsetWidth
      document
        .querySelectorAll('#product-images .carousel-item')
        .forEach(ci => (ci.style.height = `${carouselWidth}px`))
    },

    data () {
      return {
        fullUrl: `${process.env.baseUrl}${this.$route.fullPath}`
      }
    },

    methods: {
      shareFB () {
        return `https://www.facebook.com/dialog/share?app_id=1031588773519678&display=popup&href=${this.fullUrl}&redirect_uri=${this.fullUrl}`
      },

      shareTW () {
        return `http://twitter.com/share?text=text goes here&url=${this.fullUrl}`
      }
    }
  }
</script>
