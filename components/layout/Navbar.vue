<template>
  <b-navbar id="main-nav" toggleable="md" type="dark" variant="primary">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="/">
      <img src="/logotipo_desprendete_color_negativo_azul.svg" alt="Desprendete" height="30">
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown v-if="$store.state.user" class="profile-menu" right>
          <template slot="button-content">
            <UserPic />
          </template>

          <b-dropdown-item :to="`/product/new`">Regalar</b-dropdown-item>
          <b-dropdown-item to="/me">Mi perfil</b-dropdown-item>
          <b-dropdown-item href="/logout">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item v-if="!$store.state.user" to="/login">Ingresar</b-nav-item>

        <b-nav-form>
          <nuxt-link to="/product/new">
            <b-button size="sm" class="my-2 my-sm-0" variant="outline-white" type="button">
              <span class="oi oi-camera-slr mr-1"></span> Regalar
            </b-button>
          </nuxt-link>
        </b-nav-form>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import UserPic from '~/components/UserPic.vue'

export default {
  components: {
    UserPic
  }
}
</script>

<style lang="sass">
.pic-wrapper
  .pic
    width: 40px
    height: 40px
    border-radius: 50%

.dropdown-toggle
  display: flex
  align-items: center
</style>

<style lang="sass" scoped>
#main-nav
  li.nav-item
    a.nav-link
      color: white

  .dropdown-menu
    padding: 0
    overflow: hidden
    
    .dropdown-item:focus, .dropdown-item:hover
      outline: 0

  .profile-menu
    margin-right: 1rem
</style>

