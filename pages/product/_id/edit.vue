<template lang="pug">

#new-product
  b-form(@submit='onSubmit')
    ProductForm(:form='form')
    b-button(type='submit', variant='primary') Guardar
  
  b-modal(ref='savingModal', centered, no-close-on-backdrop, no-close-on-esc, hide-header, hide-footer)
    p.text-center.m-0
      Spinner
  
</template>

<script>
import ProductForm from '~/components/product/Form.vue'
import Spinner from '~/components/Spinner.vue'
import axios from 'axios'
import _ from 'lodash'

export default {
  middleware: 'auth',

  async asyncData ({ params, app, redirect, store, isClient, error }) {
    const product = await app.$axios.$get(`/api/products/${params.id}`)

    if (_.get(product, 'owner._id') !== _.get(store.state, 'user._id')) {
      if (isClient) {
        store.commit('ADD_ALERT_ERROR', 'No estás autorizado para acceder a esta página.')
        return redirect('/')
      } else {
        return error({ statusCode: 403, message: 'No estás autorizado para acceder a esta página.' })
      }
    }

    return {
      product
    }
  },

  data () {
    return {
      place: null,
      mainImage: null,
      pics: {},
      form: {}
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.form = this.product
    })
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
      // If category is an object, get the _if. If not, send var value or null if not present
      formData.category = _.get(this.form, 'category._id', _.get(this.form, 'category', null))
      // Same as category
      formData.subcategory = _.get(this.form, 'subcategory._id', _.get(this.form, 'subcategory', null))

      this.place = this.form.place

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
    }
  },

  components: {
    ProductForm,
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
