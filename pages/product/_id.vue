<template>
  <section id="product">
    <div class="row">
      <div class="col-md-7">
        <b-carousel id="product-images" controls indicators>
          <b-carousel-slide
            :key="product.mainImage._id"
            :img-src="product.mainImage.secure_url"
            :class="product.mainImage.width > product.mainImage.height ? 'wider' : 'higher'"
          ></b-carousel-slide>

          <b-carousel-slide v-for="(img, index) in product.images"
            :key="img._id"
            :img-src="img.secure_url"
            :class="img.width > img.height ? 'wider' : 'higher'"
          ></b-carousel-slide>
        </b-carousel>
      </div>

      <div class="col-md-5">
        <div class="card mb-2">
          <div class="card-body">
            <div class="media">
              <div class="pic-wrapper">
                <div class="pic" :style="{ backgroundImage: 'url(' + product.owner.photo.secure_url + ')' }"></div>
              </div>
              <div class="media-body">
                <h5 class="my-0">{{product.owner | fullname}}</h5>
                <nuxt-link :to="`/users/${product.owner._id}`">Ver perfil</nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-2">
          <div class="card-body">
            <h3 class="name mb-4 p-0">{{product.name}}</h3>

            <b-row class="mb-3">
              <b-col md="6">
                <b-button block variant="primary">
                  Me interesa
                </b-button>
              </b-col>

              <b-col md="6">
                <b-button block variant="outline-primary">
                  Enviar Mensaje
                </b-button>
              </b-col>
            </b-row>
          </div>
        </div>

        <div class="card mb-2" v-if="hasTransaction">
          <div class="card-body">
            <h4>Datos de contacto</h4>
            Nombre: {{product.owner | fullname}} <br>
            Email: {{product.owner.email}}
          </div>
        </div>

        <div class="card mb-2">
          <div class="card-body p-0 map">
            <img :src="imgMap()" alt="">
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
      return { product, transaction }
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
        fullUrl: `${process.env.baseUrl}${this.$route.fullPath}`,
        hasTransaction: false
      }
    },

    methods: {
      imgMap () {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${this.product.address[1]},${this.product.address[0]}&zoom=14&size=450x180&key=${process.env.GMAPS_KEY}`
      },

      shareFB () {
        return `https://www.facebook.com/dialog/share?app_id=1031588773519678&display=popup&href=${this.fullUrl}&redirect_uri=${this.fullUrl}`
      },

      shareTW () {
        return `http://twitter.com/share?text=text goes here&url=${this.fullUrl}`
      }
    }
  }
</script>
