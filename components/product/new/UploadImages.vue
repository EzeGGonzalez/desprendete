<template lang="pug">
  b-row
    b-col(md='3')
      b-form-group#main_image_group(label='Foto Principal', label-for='main_image')
        div.img-responsive-16by9.mb-2(v-if='form.mainImage && form.mainImage.secure_url')
          b-img(class='mb-2', :src='form.mainImage.secure_url', fluid='', alt="Main Image")
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
      this.form.images.push({})
    }
  },

  components: {
    ImageItem
  }
}
</script>

<style lang="sass" scoped>
.img-responsive-16by9
  display: block
  height: 0
  padding-bottom: 56.25%
  overflow: hidden
  position: relative
  
  img
    position: absolute
    max-height: 100%
    top: 0
    bottom: 0
    right: 0
    left: 0
    margin: auto
</style>
