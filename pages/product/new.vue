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
        <gmap-autocomplete
          id="address"
          class="form-control"
          @place_changed="setPlace">
        </gmap-autocomplete>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="secondary">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
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
        images: []
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
      formData.append('mainImage', this.form.mainImage)
      this.form.images.forEach((img, i) => formData.append(`images`, img))

      await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log('fin')
    },
    addImage () {
      this.form.images.push({})
    },
    setPlace (place) {
      this.place = place
    }
  }
}
</script>
