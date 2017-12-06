<template>
  <div>
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
