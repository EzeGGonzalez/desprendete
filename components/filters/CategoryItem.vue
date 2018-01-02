<template lang="pug">
  li
    div.category-wrapper(@click='toggle', :class="{ active: isActive }")
      img(v-if='hasImage', :src='model.image.secure_url')
      span.label {{model.name}}
      span(@click='clean')
        fa-icon(pack='fas', name='times-circle', v-if="isActive")
    
    ul(v-if='isFolder', v-show='open')
      category-item(:model='c', v-for='c in model.subcategories', :key='c._id')
</template>

<script>
import _ from 'lodash'

const isActive = (category, slug) => {
  if (category.slug === slug) {
    return true
  }

  if (category.subcategories) {
    return category.subcategories.find(c => isActive(c, slug))
  }

  return false
}

export default {
  name: 'category-item',

  props: ['model'],

  beforeCreate () {
    this.$options.components.CategoryItem = require('./CategoryItem.vue')
  },

  computed: {
    isFolder () {
      return this.model.subcategories && this.model.subcategories.length
    },

    hasImage () {
      return _.get(this.model, 'image.secure_url')
    },

    isActive () {
      return this.model.slug === this.$route.params.slug
    }
  },

  mounted () {
    if (isActive(this.model, this.$route.params.slug)) {
      this.open = true
    }
  },

  data: function () {
    return {
      open: false
    }
  },

  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      } else {
        let query = {}
        if (this.$route.query.q) {
          query.q = this.$route.query.q
        }

        this.$router.push({ path: `/category/${this.model.slug}`, query })
      }
    },

    clean () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="sass" scoped>
ul
  list-style-type: none
  padding-left: 55px

.category-wrapper
  display: flex
  align-items: center
  cursor: pointer
  position: relative

  span
    padding: 3px 0
    
  svg
    position: absolute
    right: 0
    top: 0
    bottom: 0
    margin: auto

  &.active
    font-weight: 600

    span.label
      border-bottom: 1px solid red

  img
    height: 40px
    width: 40px
    margin-right: 15px
    padding: 8px

  .img-placeholder
    display: inline-block
    height: 40px
    width: 40px
</style>
