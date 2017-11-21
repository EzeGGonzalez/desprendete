<template>
  <section id="product">
    <div class="row">
      <div class="col-md-6">

        <!-- <div class="card"> -->
          <!-- <div class="card-block"> -->
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
              <ol v-if="product.images.length > 1" class="carousel-indicators">
                <li v-for="(img, index) in product.images" :key="img._id" :data-target="`#${img._id}`" :data-slide-to="index" class="active"></li>
              </ol>
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item active" v-for="img in product.images" :key="img._id">
                  <img class="d-block" :src="img.secure_url" :alt="product.name">
                </div>
              </div>
              <a v-if="product.images.length > 1" class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a v-if="product.images.length > 1" class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          <!-- </div> -->
        <!-- </div> -->

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
              <a :href="shareFB()">
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

    methods: {
      shareFB () {
        return `https://www.facebook.com/dialog/share?app_id=1031588773519678&display=popup&href=${process.env.BASE_URL}${this.$route.fullPath}&redirect_uri=${process.env.BASE_URL}${this.$route.fullPath}`
      }
    }
  }
</script>
