<template>
  <b-navbar id="main-nav" toggleable="md" type="dark" variant="primary">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="/">
      <img src="/logotipo_desprendete_color_negativo_azul.svg" alt="Desprendete" height="30">
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <!-- <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav> -->

      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown v-if="$store.state.user" class="profile-menu" right>
          <template slot="button-content">
            <user-pic/>
          </template>

          <b-dropdown-item :to="`/product/new`">Regalar</b-dropdown-item>
          <b-dropdown-item :to="`/user/${$store.state.user._id}`">Mi perfil</b-dropdown-item>
          <b-dropdown-item href="/logout">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-form>
          <nuxt-link to="/product/new">
          
          <b-button size="sm" class="my-2 my-sm-0 btn-outline-white" type="button">
            <span class="oi oi-camera-slr mr-1"></span> Regalar
          </b-button>
          </nuxt-link>
        </b-nav-form>

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->
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

<style lang="scss">
  #main-nav {
    .dropdown-menu {
      padding: 0;
      overflow: hidden;
      
      .dropdown-item:focus, .dropdown-item:hover {
        outline: 0;
      }
    }

    .profile-menu {
      margin-right: 1rem;

      .dropdown-toggle {
        display: flex;
        align-items: center;
      }

      .pic-wrapper {
        .pic {
          width: 40px;
          height: 40px;

          border-radius: 50%;
        }
      }
    }
  }
</style>
