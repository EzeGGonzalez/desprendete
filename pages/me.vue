<template>
  <section id="user-profile">
    <b-form @submit="onSubmit">

      <b-form-group id="name_first_group"
                    label="Nombre" label-for="name_first">
        <b-form-input id="name_first"
                      type="text" v-model="form.name.first" required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="name_last_group"
                    label="Apellido" label-for="name_last">
        <b-form-input id="name_last"
                      type="text" v-model="form.name.last" required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="email_group"
                    label="Email" label-for="email">
        <b-form-input id="email"
                      type="email" v-model="form.email" required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="phone_group"
                    label="Teléfono" label-for="phone">
        <b-form-input id="phone"
                      type="text" v-model="form.phone"
        ></b-form-input>
      </b-form-group>

      <!-- <b-row> -->
        <!-- <b-col md="3"> -->
          <b-form-group id="main_image_group" label="Foto" label-for="photo">
            <b-form-file name="photo" ref="photo" id="photo" v-model="newPhoto"></b-form-file>
          </b-form-group>
        <!-- </b-col> -->
      <!-- </b-row> -->

      <b-button type="submit" variant="primary">Guardar</b-button>
    </b-form>
  </section>
</template>

<script>
function copy (o) {
  var output, v, key

  output = Array.isArray(o) ? [] : {}

  for (key in o) {
    v = o[key]
    output[key] = (typeof v === 'object') ? copy(v) : v
  }
  return output
}

export default {
  middleware: 'auth',

  data () {
    return {
      newPhoto: null
    }
  },

  created () {
    this.form = copy(this.$store.state.user)
  },

  methods: {
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

      let newUser = await this.$axios.$put(`/api/user/${this.$store.state.user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      this.$router.replace({ path: '/' })
      this.$store.commit('SET_USER', newUser)
      this.$store.commit('ADD_ALERT_SUCCESS', 'Datos del perfil modificados exitosamente.')
    }
  }
}
</script>


<style lang="sass" scoped>
@import "~assets/scss/resources.scss"

section
  @extend .container

</style>
