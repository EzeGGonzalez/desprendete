<template>
  <div id="new-product">
    <b-form @submit="onSubmit" v-if="form">
      <b-form-group id="name_group"
                    label="Nombre" label-for="name">
        <b-form-input id="name"
                      type="text" v-model="form.name" required
                      placeholder="Quiero regalar"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="description_group"
                    label="Description" label-for="description">
        <b-form-textarea id="description"
          v-model="form.description"
          placeholder="Descripción (opcional)"
          :rows="2">
        </b-form-textarea>
      </b-form-group>

      <category-list :form="form" />

      <upload-images :form="form" />

      <b-row>
        <b-col md="6">
          <b-form-group id="status_group"
                    label="Estado" label-for="status">
            <b-form-select id="status" v-model="form.status" :options="status" required>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group id="condition_group"
                        label="Condición" label-for="condition">
            <b-form-select id="condition"
                        :options="conditions" required
                        v-model="form.condition"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group id="address_group"
                    label="Cambiar Ubicación" label-for="address">

        <img class="mb-2" :src="imgMap()" alt="">

        <no-ssr>
          <gmap-autocomplete
            id="address"
            class="form-control"
            @place_changed="setPlace">
          </gmap-autocomplete>
        </no-ssr>
      </b-form-group>

      <b-button type="submit" variant="primary">Guardar</b-button>
    </b-form>

    <b-modal ref="savingModal" centered no-close-on-backdrop no-close-on-esc hide-header hide-footer>
      <p class="text-center m-0"><Spinner /></p>
    </b-modal>
  </div>
</template>

<script>
import CategoryList from '~/components/product/new/CategoryList.vue'
import UploadImages from '~/components/product/new/UploadImages.vue'
import Spinner from '~/components/Spinner.vue'
import axios from 'axios'
import _ from 'lodash'

export default {
  middleware: 'auth',

  async asyncData ({ params, app }) {
    return {
      product: await app.$axios.$get(`/api/products/${params.id}`)
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.form = this.product
    })
  },

  data () {
    return {
      place: null,
      mainImage: null,
      pics: {},
      form: {},
      conditions: [
        { text: 'Seleccionar', value: null },
        { text: 'Sano', value: 'good' },
        { text: 'Roto', value: 'broken' }
      ],
      status: [
        { text: 'Seleccionar Estado', value: null },
        { text: 'Malo', value: 1 },
        { text: 'Regular', value: 2 },
        { text: 'Bueno', value: 3 },
        { text: 'Muy Bueno', value: 4 },
        { text: 'Excelente', value: 5 }
      ]
    }
  },

  methods: {
    async onSubmit (evt) {
      evt.preventDefault()

      this.$refs.savingModal.show()

      const formData = {}

      formData.owner = this.$store.state.user._id
      formData.name = this.form.name
      formData.description = this.form.description
      formData.status = this.form.status
      formData.condition = this.form.condition
      formData.category = _.get(this.form, 'category._id')
      formData.subcategory = _.get(this.form, 'subcategory')
      if (this.place && this.place.geometry) {
        formData.address = [ this.place.geometry.location.lng(), this.place.geometry.location.lat() ]
      }

      if (!_.get(this.form.mainImage, 'secure_url') && _.get(this.form.mainImage, 'name')) {
        this.form.mainImage = await this.uploadImage(this.form.mainImage)
      }

      formData.images = []
      for (let img of this.form.images) {
        if (!_.get(img, 'secure_url') && _.get(img, 'name')) {
          formData.images.push(await this.uploadImage(img))
        } else {
          formData.images.push(img)
        }
      }

      await this.$axios.put(`/api/products/${this.product.slug}`, formData)

      this.$refs.savingModal.hide()

      this.$router.replace({ path: `/product/${this.product.slug}` })
      this.$store.commit('ADD_ALERT_SUCCESS', 'El producto fue editado exitosamente.')
    },

    async uploadImage (img) {
      let imgFormData = new FormData()

      imgFormData.append('file', img)
      imgFormData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)

      return _.get(await axios.post(process.env.CLOUDINARY_UPLOAD_URL, imgFormData), 'data')
    },

    setPlace (place) {
      this.place = place
    },

    imgMap () {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${this.product.address[1]},${this.product.address[0]}&markers=color:red|${this.product.address[1]},${this.product.address[0]}&zoom=14&size=450x180&key=${process.env.GMAPS_KEY}`
    }
  },

  components: {
    CategoryList,
    UploadImages,
    Spinner
  }
}
</script>


<style lang="sass" scoped>
@import "~assets/scss/resources.scss"

#new-product
  @extend .container

.image-wrapper
  position: relative
  
  &:before
    display: block
    content: ""
    width: 100%
    padding-top: (9 / 16) * 100%

  > .img
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

</style>

<style lang="sass">
.modal-body
  svg
    width: 100px
    height: 100px
</style>
