<template>
  <div>
    <navbar/>

    <main role="main">
      <nuxt/>
    </main>
    
  </div>
</template>

<script>
  import Navbar from '~/components/layout/Navbar.vue'

  export default {
    components: {
      Navbar
    }
  }
</script>
