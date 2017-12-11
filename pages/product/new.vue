<template>
  <div id="new-product">
    <b-form @submit="onSubmit">
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
            <b-form-select id="status"
                          :options="status" required
                          v-model="form.status"
            ></b-form-select>
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
                    label="Ubicación" label-for="address">
        <no-ssr>
          <gmap-autocomplete
            id="address"
            class="form-control"
            @place_changed="setPlace">
          </gmap-autocomplete>
        </no-ssr>
      </b-form-group>

      <b-button type="submit" variant="primary">Crear</b-button>
    </b-form>
  </div>
</template>

<script>
import CategoryList from '~/components/product/new/CategoryList.vue'
import UploadImages from '~/components/product/new/UploadImages.vue'

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
      },
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

      const formData = new FormData()

      formData.append('name', this.form.name)
      formData.append('description', this.form.description)
      formData.append('status', this.form.status)
      formData.append('condition', this.form.condition)
      formData.append('address', [ this.place.geometry.location.lng(), this.place.geometry.location.lat() ])

      formData.append('mainImage', this.form.mainImage)
      this.form.images.forEach((img, i) => formData.append(`images`, img))

      await app.$axios.$post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      this.$router.replace({ path: '/' })
      this.$store.commit('ADD_ALERT_SUCCESS', 'El producto fue creado exitosamente.')
    },
    setPlace (place) {
      this.place = place
    }
  },

  components: {
    CategoryList,
    UploadImages
  }
}
</script>


<style lang="sass" scoped>

#new-product
  @extend .container

</style>
