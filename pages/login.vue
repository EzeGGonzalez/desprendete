<template>
  <b-container id="login">
    <b-row>
      <b-col md="4" offset-md="4">
        <div class="card">
          <div class="card-body">
            <img src="/logotipo_desprendete_color_positivo.png" alt="Desprendete">

            <a href="/auth/facebook" class="btn btn-primary">Ingresar con Facebook</a>

            <div>
              <small>Si continúas, estás aceptando los <nuxt-link to="/terms">Términos y las condiciones</nuxt-link> y la <nuxt-link to="/privacy">Política de privacidad</nuxt-link> de Desprendete</small>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="sass" scoped>
@import "~assets/scss/resources.scss"

.card
  text-align: center

  img
    width: 100%
    @extend .mb-5

  a
    @extend .mb-4
</style>
