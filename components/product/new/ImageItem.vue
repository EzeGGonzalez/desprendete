<template lang="pug">
  b-form-group(:id='`image_${i}_group`', :label="i === 0 ? 'Fotos' : '  '", :label-for='`image_${i}`')
    div.img-responsive-16by9.mb-2(v-if='form.images[i] && form.images[i].secure_url')
      b-img(:src='form.images[i].secure_url', fluid='', :alt="name()")
    b-form-file(:id='`image_${i}`', v-model='form.images[i]', :name='name()')
</template>

<script>
export default {
  props: ['i', 'form'],

  methods: {
    name () {
      return `CloudinaryImages-images-${1001 + parseInt(this.i)}`
    }
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
