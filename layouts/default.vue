<template lang="pug">
  #layout(:class="{ 'sidebar-opened': $store.state.sidebar.open }")
    Navbar
    MobileNavbar(class='d-block d-md-none')

    notifications

    main(role='main')
      nuxt
    
    .alert.alert-geo(v-if='$store.state.showLocationAlert')
      span.mr-3 Actualiza la página para ver anuncios cerca tuyo
      b-button.my-2.my-sm-0(size='sm', variant='outline-white', type='button', class='px-3', @click='refreshPage')
        fa-icon(pack='fas', name='sync-alt', class='.mr-1')
        | Actualizar
    
    Futer
</template>

<script>
  import MobileNavbar from '~/components/layout/MobileNavbar.vue'
  import Navbar from '~/components/layout/Navbar.vue'
  import Futer from '~/components/layout/Futer.vue'
  import Notifications from '~/components/layout/Notifications.vue'

  export default {
    methods: {
      refreshPage () {
        window.location.reload(true)
      }
    },

    components: {
      Navbar,
      Futer,
      MobileNavbar,
      Notifications
    }
  }
</script>

<style lang="sass" scoped>
@import "~assets/scss/resources.scss"

#layout
  position: relative
  background-color: #f7f7f7
  min-height: 100vh

  .alert.alert-geo
    border-color: #37474f
    background-color: #37474f
    color: white
    position: fixed
    bottom: 0
    right: 0
    left: 0
    margin: 0
    border-radius: 0

  &.sidebar-opened
    max-height: 100vh
    overflow: hidden

  main
    @extend .py-5

  #notifications
    @extend .mt-5

</style>
