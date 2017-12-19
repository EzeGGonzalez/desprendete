<template lang="pug">
section#user-profile.container
  .card.mb-3
    .card-body
      UserPic(:user='user')

      h3.name.mt-2 {{user | fullname}}
      
      ul
        li.p-2.active
          .value {{products.length}}
          .label Publicados
        li.p-2.separator  
        li.p-2
          .value {{user.transactions.length}}
          .label Me Interesa
  
  section#products
    .list
      no-ssr
        .masonry-container(v-masonry='', transition-duration='0s', item-selector='.item')
          product(:product='p', v-for='p in products', :key='p._id')
</template>

<script>
import UserPic from '~/components/UserPic.vue'
import Product from '~/components/product/Product.vue'
import NoSSR from 'vue-no-ssr'

export default {
  async asyncData ({ params, app }) {
    return {
      products: await app.$axios.$get(`/api/users/${params.id}/products`),
      user: await app.$axios.$get(`/api/users/${params.id}`)
    }
  },

  data () {
    return {
      newPhoto: null
    }
  },

  components: {
    UserPic,
    Product,
    NoSSR
  }
}
</script>


<style lang="sass" scoped>
@import "~assets/scss/color"

section#user-profile
  & > .card
    margin-left: 15px
    margin-right: 15px
    background: url(/background_profile.png)

  .name
    text-align: center

  ul
    list-style: none
    text-align: center
    margin: 0
    padding: 0
    display: flex
    justify-content: center

    li
      &.active
        border-bottom: 1px solid $brand-secondary

      &.separator
        padding: 0!important
      
      display: inline-block

      .label
        font-weight: 500
        text-transform: uppercase
</style>

<style lang="sass">
@import "~assets/scss/color"

section#user-profile
  .pic-wrapper
    height: 150px
    width: 150px
    margin-left: auto
    margin-right: auto
    border-radius: 50%
    border: 1px dashed $brand-secondary
    padding: 0.25rem

    .pic
      height: 100%
      width: 100%
      border-radius: 50%
      background-size: cover
      background-position: center
      background-repeat: no-repeat
</style>

