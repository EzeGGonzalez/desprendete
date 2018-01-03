<template lang="pug">
  section#products
    .layout
      .filters
        p Categorías
        ul
          CategoryItem(:model='c', v-for='c in $store.state.categories', :key='c._id')
      .list
        .location.mb-3(v-if='$store.state.geo.name')
          b-button(@click='editSearchLocation')
            fa-icon(pack='fas', name='map-pin')
            span.mx-3 A {{distance}} km de {{$store.state.geo.name}}
            fa-icon(pack='fas', name='pencil-alt')
        
        no-ssr
          .masonry-container(v-masonry='', transition-duration='0s', item-selector='.item')
            product(:product='p', v-for='p in products', :key='p._id')

    b-modal(ref='savingModal', centered, title='Ubicación')
      div
        b-form-group#address_group(label='Ubicación', label-for='address')
          no-ssr
            gmap-autocomplete#address.form-control(@place_changed='setPlace')
        b-form-group#distance_group(label='Distancia (en Km)', label-for='distance')
          input#distance.form-control(type='number', v-model='distance')
      
      .w-100(slot='modal-footer')
        div(v-if='!loadingCurrentLocation') 
          p.m-0.float-left 
          div.float-right
            b-btn.mr-2(variant='primary', @click='useCurrentLocation')
              | Usar mi ubicación actual
            b-btn(variant='primary', @click='useCustomLocation')
              | Usar esta ubicación
        div.float-right(v-if='loadingCurrentLocation') Obteniendo ubicación actual...
</template>

<script>
  import Product from '~/components/product/Product.vue'
  import CategoryItem from '~/components/filters/CategoryItem.vue'
  import NoSSR from 'vue-no-ssr'

  export default {
    props: ['products'],

    data () {
      return {
        place: null,
        distance: this.$store.state.geo.distance || 5,
        currentLocation: null,
        loadingCurrentLocation: false
      }
    },

    mounted () {
      let geo = this.$store.state.geo
      if (!geo.lat || !geo.lng || !geo.name || !geo.distance) {
        this.geolocation()
      }
    },

    methods: {
      geolocation (cb) {
        navigator.geolocation.getCurrentPosition(async position => {
          let response = await this.$axios.$get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.GMAPS_KEY}`)

          this.currentLocation = {
            geolat: position.coords.latitude,
            geolng: position.coords.longitude,
            geoname: response.results[0].address_components[2].long_name,
            geodist: this.distance || 5
          }

          await this.$store.dispatch('setGeo', this.currentLocation)
          this.$store.commit('SHOW_LOCATION_ALERT')

          if (cb) {
            cb(this.currentLocation)
          }
        })
      },

      async useCustomLocation () {
        let geo = {
          geolat: this.$store.state.geo.lat,
          geolng: this.$store.state.geo.lng,
          geoname: this.$store.state.geo.name,
          geodist: this.distance
        }

        if (this.place) {
          geo = {
            geolat: this.place.geometry.location.lat(),
            geolng: this.place.geometry.location.lng(),
            geoname: this.place.formatted_address,
            geodist: this.distance
          }
        }

        await this.$store.dispatch('setGeo', geo)
        this.$router.go({ path: this.$route.fullPath, force: true })
      },

      async useCurrentLocation () {
        this.loadingCurrentLocation = true
        this.geolocation(() => {
          this.$store.commit('SET_GEO', this.currentLocation)
          this.$router.go({ path: this.$route.fullPath, force: true })
        })
      },

      editSearchLocation () {
        this.$refs.savingModal.show()
      },

      setPlace (place) {
        this.place = place
      }
    },

    components: {
      Product,
      CategoryItem,
      'no-ssr': NoSSR
    }
  }
</script>

<style lang="sass" scoped>
.list
  .location
    text-align: center

    button
      border-radius: 100px
      svg
        max-height: 16px

      span
        white-space: pre-wrap

.filters
  p
    margin-left: 40px
    text-transform: uppercase
    font-weight: 500
    border-bottom: 1px solid

  ul
    list-style-type: none
</style>
