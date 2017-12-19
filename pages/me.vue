<template <template lang="pug">
  section#user-profile.container
    b-form(@submit='onSubmit')
      b-form-group#name_first_group(label='Nombre', label-for='name_first')
        b-form-input#name_first(type='text', v-model='form.name.first', required='')

      b-form-group#name_last_group(label='Apellido', label-for='name_last')
        b-form-input#name_last(type='text', v-model='form.name.last', required='')

      b-form-group#email_group(label='Email', label-for='email')
        b-form-input#email(type='email', v-model='form.email', required='')

      b-form-group#phone_group(label='Teléfono', label-for='phone')
        b-form-input#phone(type='text', v-model='form.phone')

      b-form-group#main_image_group(label='Foto', label-for='photo')
        b-form-file#photo(name='photo', ref='photo', v-model='newPhoto', @change="showPreview")
      
      b-form-group(v-if="photoPreview")
        img.preview(:src="photoPreview")
        
      b-button(type='submit', variant='primary') Guardar
</template>

<script>
import _ from 'lodash'

export default {
  middleware: 'auth',

  data () {
    return {
      newPhoto: null,
      photoPreview: null
    }
  },

  created () {
    this.form = _.cloneDeep(this.$store.state.user)
  },

  methods: {
    showPreview (e) {
      const input = e.target

      if (input.files && input.files[0]) {
        var reader = new FileReader()

        reader.onload = (ev) => {
          this.photoPreview = ev.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    },

    async onSubmit (evt) {
      evt.preventDefault()

      const formData = new FormData()

      formData.append('name.first', this.form.name.first)
      formData.append('name.last', this.form.name.last)
      formData.append('email', this.form.email)
      formData.append('phone', this.form.phone)

      if (this.newPhoto) {
        formData.append('photo', this.newPhoto)
      }

      let newUser = await this.$axios.$put(
        `/api/user/${this.$store.state.user._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      this.$store.commit('SET_USER', newUser)
      this.$store.commit('ADD_ALERT_SUCCESS', 'Datos del perfil modificados exitosamente.')
      this.$router.replace({ path: '/' })
    }
  }
}
</script>

<style lang="sass" scoped>
img.preview
  max-height: 150px
</style>
