<template lang="pug">

#new-product
  b-form(@submit='onSubmit')
    ProductForm(:form='form')
    b-button(type='submit', variant='primary') Crear
  
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

  data () {
    return {
      place: null,
      mainImage: null,
      images: [],
      form: {
        name: '',
        description: '',
        status: null,
        condition: null,
        address: '',
        mainImage: null,
        images: [],
        category: null,
        subcategory: null
      }
    }
  },

  methods: {
    async onSubmit (evt) {
      evt.preventDefault()

      this.$refs.savingModal.show()

      const formData = {}

      this.place = this.form.place

      formData.owner = this.$store.state.user._id
      formData.name = this.form.name
      formData.description = this.form.description
      formData.status = this.form.status
      formData.condition = this.form.condition
      // If category is an object, get the _if. If not, send var value or null if not present
      formData.category = _.get(this.form, 'category._id', _.get(this.form, 'category', null))
      // Same as category
      formData.subcategory = _.get(this.form, 'subcategory._id', _.get(this.form, 'subcategory', null))

      formData.address = [ this.place.geometry.location.lng(), this.place.geometry.location.lat() ]

      formData.mainImage = await this.uploadImage(this.form.mainImage)

      formData.images = []
      for (let img of this.form.images) {
        formData.images.push(await this.uploadImage(img))
      }

      await this.$axios.post('/api/products', formData)

      this.$refs.savingModal.hide()

      this.$router.replace({ path: '/' })
      this.$store.commit('ADD_ALERT_SUCCESS', 'El producto fue creado exitosamente.')
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

</style>

<style lang="sass">
.modal-body
  svg
    width: 100px
    height: 100px
</style>
