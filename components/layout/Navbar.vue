<template lang="pug">
b-navbar#main-nav(toggleable='md', type='dark', variant='primary')
  .open-sidebar.mr-3.d-block.d-md-none(@click='toggleSidebar')
    fa-icon(pack='fas', name='bars')
  
  b-navbar-brand(href='/', :class="{ 'd-none': openSearch }")
    img(src='/logotipo_desprendete_color_negativo_azul.svg', alt='Desprendete', height='30')

  b-nav-form.search.ml-2.d-none.d-sm-none.d-md-flex(@submit='onSubmit', :class="{ 'd-flex d-sm-flex mr-2': openSearch }")
    b-input-group
      b-input-group-addon
        fa-icon(pack='fas', name='search')
      b-form-input(v-model='search', type='text', placeholder='¿Qué estás buscando?')
      b-input-group-addon.reset-search(v-if='search.length > 0')
        span(@click='cleanForm')
          fa-icon(pack='fas', name='times-circle')

  .open-search.d-block.d-md-none.ml-2(@click='toggleSearch')
    fa-icon(pack='fas', :name="openSearch ? 'times-circle' : 'search'")
  
  b-collapse#nav_collapse(is-nav='')
    b-navbar-nav.ml-auto
      b-nav-item-dropdown.profile-menu(v-if='$store.state.user', right='')
        template(slot='button-content')
          UserPic
        b-dropdown-item(:to='`/product/new`') Regalar
        b-dropdown-item(to='/me') Mi perfil
        b-dropdown-item(href='/logout') Cerrar sesión
      b-nav-item(v-if='!$store.state.user', to='/login') Ingresar
      b-nav-form
        nuxt-link(to='/product/new')
          b-button.my-2.my-sm-0(size='sm', variant='outline-white', type='button')
            fa-icon(pack='fas', name='camera', class='.mr-1')
            |  Regalar
</template>

<script>
import { mapMutations } from 'vuex'
import UserPic from '~/components/UserPic.vue'

export default {
  data () {
    return {
      search: '',
      openSearch: false
    }
  },

  mounted () {
    if (this.search !== this.$route.query.q) {
      this.search = (this.$route.query.q || '')
    }
  },

  methods: {
    async onSubmit (evt) {
      evt && evt.preventDefault()

      let query = { q: this.search }
      let path = (this.$route.name === 'index' || this.$route.name === 'category-slug') ? this.$route.fullPath : '/'

      this.$router.push({ path, query })
    },

    cleanForm (evt) {
      this.search = ''
      this.onSubmit(evt)
    },

    ...mapMutations({
      toggleSidebar: 'TOGGLE_SIDEBAR'
    }),

    toggleSearch (evt) {
      if (this.openSearch && this.search.length) {
        this.cleanForm()
      }
      this.openSearch = !this.openSearch
    }
  },

  components: {
    UserPic
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/scss/mixins"

#main-nav
  /deep/ .pic-wrapper
    .pic
      width: 40px
      height: 40px
      border-radius: 50%

  /deep/ .dropdown-toggle
    display: flex
    align-items: center
  
  .open-search
    color: white
  
  .open-sidebar
    color: white

  form.search
    flex: 1

    @media (max-width: 768px)
      padding-top: .3125rem
    
    .input-group
      width: 100%

      .reset-search
        cursor: pointer
        color: white

      input, .input-group-addon
        border: none
        border-bottom: 1px solid white
        border-radius: 0px
        background: transparent
        color: white
        @include placeholder-color(#fafafa)

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

