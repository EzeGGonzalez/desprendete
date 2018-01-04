<template>
  <section id="product">
    <div class="row">
      <div class="col-md-7">
        <b-carousel id="product-images" controls indicators class="mb-2">
          <b-carousel-slide
            :key="product.mainImage._id"
            :img-src="product.mainImage.secure_url"
            :class="product.mainImage.width > product.mainImage.height ? 'wider' : 'higher'"
          ></b-carousel-slide>

          <b-carousel-slide v-for="img in product.images"
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
              <user-pic :user="product.owner"/>
              
              <div class="media-body">
                <h5 class="my-0">{{product.owner | fullname}}</h5>
                <nuxt-link :to="`/users/${product.owner.slug}`">Ver perfil</nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-2">
          <div class="card-body">
            <h3 class="name mb-4 p-0">{{product.name}}</h3>

            <b-row v-show="mine()">
              <b-col md="12">
                <nuxt-link :to="`/product/${product.slug}/edit`" class="btn btn-block btn-primary">
                  Editar
                </nuxt-link>
              </b-col>
            </b-row>

            <b-row v-show="!mine()">
              <b-col xs="6" v-show="!hasTransaction()">
                <b-button block variant="primary" @click="want(product)">
                  Me interesa
                </b-button>
              </b-col>

              <b-col xs="6">
                <b-button block variant="outline-primary">
                  Enviar Mensaje
                </b-button>
              </b-col>
            </b-row>
          </div>
        </div>

        <div class="card mb-2">
          <div class="card-body">
            <p>{{product.description}}</p>

            <b-row class="mb-2">
              <b-col xs="6" class="text-left">{{product.condition | productCondition}}</b-col>
              <b-col xs="6" class="text-right">{{product.status | productStatus}}</b-col>
            </b-row>

            <small>Publicado: {{product.createdAt | humanDate}}</small>
          </div>
        </div>

        <div class="card mb-2" v-if="hasTransaction()">
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
              <Share type="facebook" />
              <Share type="twitter" :text="`${product.name} en desuso se regala en desprendete.com:`" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  import UserPic from '~/components/UserPic.vue'
  import Share from '~/components/Share.vue'
  import _ from 'lodash'

  export default {
    async asyncData ({ params, app }) {
      return { product: await app.$axios.$get(`/api/products/${params.id}`) }
    },

    head () {
      let meta = [
        { property: 'og:title', content: this.product.name },
        { property: 'og:description', content: _.isEmpty(this.product.description) ? this.product.name : this.product.description },
        { property: 'og:type', content: 'product' },
        { property: 'og:url', content: `${process.env.BASE_URL}${this.$route.fullPath}` }
      ]

      if (this.product.mainImage) {
        let mainImage = this.product.mainImage
        mainImage = mainImage.secure_url.replace(`v${mainImage.version}`, 'w_200,h_200,c_mfit')
        meta.push({ property: 'og:image', content: mainImage })
      }

      this.product.images.forEach(i => {
        let image = i.secure_url.replace(`v${i.version}`, 'w_200,h_200,c_mfit')
        meta.push({ property: 'og:image', content: image })
      })

      return {
        title: this.product.name,
        meta
      }
    },

    mounted () {
      let carouselWidth = document.querySelector('#product-images').offsetWidth
      document
        .querySelectorAll('#product-images .carousel-item')
        .forEach(ci => (ci.style.height = `${carouselWidth}px`))
    },

    methods: {
      ...mapActions(['wantIt']),

      want () {
        if (this.$store.state.user) {
          this.wantIt()
        } else {
          this.$router.push({ path: '/login' })
        }
      },

      mine () {
        return _.get(this.product, 'owner._id') === _.get(this.$store, 'state.user._id')
      },

      hasTransaction () {
        return this.$store.state.transactions.find(t => t.product === this.product._id)
      },

      imgMap () {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${this.product.address[1]},${this.product.address[0]}&zoom=14&size=450x180&key=${process.env.GMAPS_KEY}`
      }
    },

    components: {
      UserPic,
      Share
    }
  }
</script>
