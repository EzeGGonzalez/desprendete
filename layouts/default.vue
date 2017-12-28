<template lang="pug">
  #layout(:class="{ 'sidebar-opened': $store.state.sidebar.open }")
    Navbar
    MobileNavbar(class='d-block d-md-none')

    notifications

    main(role='main')
      nuxt
</template>

<script>
  import MobileNavbar from '~/components/layout/MobileNavbar.vue'
  import Navbar from '~/components/layout/Navbar.vue'
  import Notifications from '~/components/layout/Notifications.vue'

  export default {
    components: {
      Navbar,
      MobileNavbar,
      Notifications
    }
  }
</script>

<style lang="sass" scoped>
@import "~assets/scss/resources.scss"

#layout
  background-color: #f7f7f7

  &.sidebar-opened
    max-height: 100vh
    overflow: hidden

  main
    @extend .py-5

  #notifications
    @extend .mt-5

</style>
