<template lang="pug">
  b-form-group(:id='`image_${i}_group`', :label="i === 0 ? 'Fotos' : '  '", :label-for='`image_${i}`')
    b-form-file(:id='`image_${i}`', v-model='form.uImages[i]', :name='name()')
    input(type='hidden', v-model='form.images[i]', name='images')
</template>

<script>
export default {
  props: ['i', 'form'],

  methods: {
    name () {
      return `CloudinaryImages-images-${1001 + parseInt(this.i)}`
    }
  },

  mounted () {
    this.form.images[this.i] = `upload:${this.name()}`
  }
}
</script>
