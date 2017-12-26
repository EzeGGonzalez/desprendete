<template lang="pug">
  span
    b-form-group#name_group(label='Nombre', label-for='name')
      b-form-input#name(type='text', v-model='form.name', required='', placeholder='Quiero regalar')

    b-form-group#description_group(label='Description', label-for='description')
      b-form-textarea#description(v-model='form.description', placeholder='Descripción (opcional)', :rows='2')

    CategoryList(:form='form')
    UploadImages(:form='form')

    b-row
      b-col(md='6')
        StatusInput(:form='form')
      b-col(md='6')
        ConditionsInput(:form='form')

    b-form-group#address_group(label='Ubicación', label-for='address')
      no-ssr
        gmap-autocomplete#address.form-control(required='', @place_changed='setPlace')
</template>

<script>
import CategoryList from '~/components/product/new/CategoryList.vue'
import UploadImages from '~/components/product/new/UploadImages.vue'
import StatusInput from '~/components/product/new/StatusInput.vue'
import ConditionsInput from '~/components/product/new/ConditionsInput.vue'

export default {
  props: ['form'],

  methods: {
    setPlace (place) {
      this.place = place
    }
  },

  components: {
    CategoryList,
    UploadImages,
    StatusInput,
    ConditionsInput
  }
}
</script>
