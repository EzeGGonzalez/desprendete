<template lang="pug">
  b-row
    b-col(md='3')
      b-form-group#main_image_group(label='Foto Principal', label-for='main_image')
        b-form-file#main_image(name='mainImage', ref='theMainImage', v-model='form.mainImage')
    b-col(md='3', v-for='(image, i) in form.images', :key='i')
      ImageItem(:i='i', :form='form')
    b-col(md='3')
      b-form-group#add_image_group(label='  ', label-for='add_image')
        b-button(v-on:click='addImage', variant='primary') Agregar foto
</template>

<script>
import ImageItem from '~/components/product/new/ImageItem.vue'

export default {
  props: ['form'],

  methods: {
    addImage () {
      this.form.uImages.push({})
      this.form.images.push('')
    }
  },

  components: {
    ImageItem
  }
}
</script>
