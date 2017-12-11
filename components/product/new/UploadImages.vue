<template>
  <b-row>
    <b-col md="3">
      <b-form-group id="main_image_group" label="Foto Principal" label-for="main_image">
        <b-form-file name="mainImage" ref="theMainImage" id="main_image" v-model="form.mainImage"></b-form-file>
      </b-form-group>
    </b-col>

    <b-col md="3" v-for="(image, i) in form.images" :key="i">
      <b-form-group :id="`image_${i}_group`"
          :label="i === 0 ? 'Fotos' : '&nbsp;&nbsp;'"
          :label-for="`image_${i}`">
        <b-form-file name="images[]" :id="`image_${i}`" v-model="form.images[i]"></b-form-file>
      </b-form-group>
    </b-col>
    
    <b-col md="3">
      <b-form-group id="add_image_group" label="&nbsp;&nbsp;" label-for="add_image">
        <b-button v-on:click="addImage" variant="primary">Agregar foto</b-button>
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ['form'],

  methods: {
    addImage () {
      this.form.images.push({})
    }
  }
}
</script>
