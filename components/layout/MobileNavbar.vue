<template lang="pug">
  div#sidebar-wrapper(:class='{ active: $store.state.sidebar.open }')
    .overlay(@click='toggleSidebar')
    
    nav#sidebar
      .sidebar-header.d-flex.align-items-center.mb-3
        UserPic.mr-3
        p(v-if='$store.state.user') {{$store.state.user | fullname}}
        p(v-if='!$store.state.user') Ingresá o creá tu cuenta

      ul
        li
          nuxt-link(to='/') Inicio
        li
          nuxt-link(to='/product/new') Regalar
        li(v-if='$store.state.user')
          nuxt-link(to='/me') Mi perfil
        li(v-if='$store.state.user')
          a(href='/logout') Cerrar sesión

      p.text-uppercase.font-weight-bold Categorías

      ul
        CategoryItem(:model="c", v-for="c in $store.state.categories", :key="c._id")
</template>

<script>
import { mapMutations } from 'vuex'
import UserPic from '~/components/UserPic.vue'
import CategoryItem from '~/components/filters/CategoryItem.vue'

export default {
  methods: {
    ...mapMutations({
      toggleSidebar: 'TOGGLE_SIDEBAR'
    })
  },

  components: {
    CategoryItem,
    UserPic
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/scss/color"

#sidebar-wrapper
  position: absolute
  top: 0
  bottom: 0
  right: 100%
  left: 0
  z-index: 1
  overflow: scroll
  transition: all 0.3s

  .overlay
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    background-color: rgba(55,71,79,.7)
    z-index: 1
    display: none
  
  &.active
    right: 0
    .overlay
      display: block

    #sidebar
      margin-left: 0px

  #sidebar
    position: absolute
    top: 0
    min-width: 250px
    max-width: 250px
    min-height: 100vh
    z-index: 2
    background: white
    margin-left: -250px
    padding-left: 20px

    & /deep/ .category-wrapper
      padding-right: 20px

      span svg
        right: 10px

    .sidebar-header
      margin-left: -20px
      padding: 20px
      background: $brand-primary

      p
        font-size: 1.1rem
        color: white
        margin: 0

      & /deep/ .pic-wrapper
        .pic
          width: 60px
          height: 60px
          border-radius: 50%

    ul
      padding-left: 0px
      list-style-type: none

      li
        a
          color: #212529

  
</style>


<style>
#sidebar {
    /* color: #fff; */
    transition: all 0.3s;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    padding-left: 0;
    display: block;
}
#sidebar ul li a:hover {
    color: #7386D5;
}
</style>

