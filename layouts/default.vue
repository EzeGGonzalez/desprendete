<template>
  <div id="layout">
    <navbar/>

    <notifications/>

    <main role="main">
      <nuxt/>
    </main>
    
  </div>
</template>

<script>
  import Navbar from '~/components/layout/Navbar.vue'
  import Notifications from '~/components/layout/Notifications.vue'

  export default {
    components: {
      Navbar,
      Notifications
    }
  }
</script>

<style lang="sass" scoped>
@import "~assets/scss/resources.scss"

#layout
  background-color: #f7f7f7

  main
    @extend .py-5

  #notifications
    @extend .mt-5

</style>
