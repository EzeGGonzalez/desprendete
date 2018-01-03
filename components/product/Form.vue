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

    b-form-group#address_group(:label='`${hasAddr() ? "Cambiar " : ""}Ubicación`', label-for='address')
      img.mb-2(:src="imgMap", alt="Ubicación del producto", v-if="hasAddr()")
      no-ssr
        gmap-autocomplete#address.form-control(:required='!hasAddr()', @place_changed='setPlace')
</template>

<script>
import _ from 'lodash'
import CategoryList from '~/components/product/new/CategoryList.vue'
import UploadImages from '~/components/product/new/UploadImages.vue'
import StatusInput from '~/components/product/new/StatusInput.vue'
import ConditionsInput from '~/components/product/new/ConditionsInput.vue'

export default {
  props: ['form'],

  data () {
    return {
      place: null
    }
  },

  computed: {
    imgMap () {
      let url = ''

      if (_.get(this, 'form.address[0]') && _.get(this, 'form.address[1]')) {
        url = `https://maps.googleapis.com/maps/api/staticmap?center=${this.form.address[1]},${this.form.address[0]}&markers=color:red|${this.form.address[1]},${this.form.address[0]}&zoom=14&size=450x180&key=${process.env.GMAPS_KEY}`
      }

      if (this.place) {
        let lng = this.place.geometry.location.lng()
        let lat = this.place.geometry.location.lat()

        url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&markers=color:red|${lat},${lng}&zoom=14&size=450x180&key=${process.env.GMAPS_KEY}`
      }

      return url
    }
  },

  methods: {
    setPlace (place) {
      this.form.place = place
      this.place = place
    },

    hasAddr () {
      return _.get(this, 'form.address[0]') && _.get(this, 'form.address[1]')
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
