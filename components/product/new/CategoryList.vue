<template>
  <b-form-group id="category_group" label="Categoría" label-for="category">
    <div class="category-list">
      <div @click="setCategory(c)" v-for="(c, i) in categories"
        :key="i" class="category-wrap" :class="{ active: c._id === category }">

        <div class="category">
          <img :src="c.image.secure_url" :alt="c.name">
          <small>{{c.name}}</small>
        </div>
      </div>
    </div>

    <b-form-select id="category"
      text-field="name" value-field="_id"
      v-if="subcategories.length > 0"
      :options="subcategories"
      required
      v-model="subcategory"
      @input="setSubcategory"
    >
      <template slot="first">
        <option :value="null" disabled>-- Seleccione una sub-categoría --</option>
      </template>
    </b-form-select>
  </b-form-group>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

const R = require('ramda')

const getSubcategories = (c, categories) => {
  return R.pipe(
    R.filter(R.propEq('_id', c)),
    R.head,
    R.defaultTo({ subcategories: [] }),
    R.prop('subcategories')
  )(categories)
}

export default {
  props: ['form'],

  computed: {
    ...mapState(['categories']),

    subcategories () {
      return getSubcategories(this.category || '', this.categories)
    }
  },

  data () {
    return {
      category: null,
      subcategory: null
    }
  },

  watch: {
    form (newVal, oldVal) {
      this.$nextTick(() => {
        this.category = _.get(newVal, 'category._id', _.get(newVal, 'category', null))
        this.subcategory = _.get(newVal, 'subcategory._id', _.get(newVal, 'subcategory', null))
      })
    }
  },

  mounted () {
    this.category = _.get(this, 'form.category._id', _.get(this, 'form.category', null))
    this.subcategory = _.get(this, 'form.subcategory._id', _.get(this, 'form.subcategory', null))
  },

  methods: {
    setCategory (c) {
      this.category = c._id
      this.subcategory = null
      this.form.subcategory = null
      this.form.category = c._id
    },

    setSubcategory (sc) {
      this.form.subcategory = _.get(sc, '_id', sc)
    }
  }
}
</script>


<style lang="sass" scoped>
  .category-list 
    display: flex
    padding: 0
    margin-left: -15px
    margin-right: -15px

    #category-select
      visibility: hidden

    .category-wrap
      display: block
      padding: 0 15px
      cursor: pointer

      .category
        height: 100px
        width: 100px

        display: flex
        flex-direction: column
        align-items: center
        justify-content: flex-start

        img
          height: 50px
          filter: grayscale(100%)            

        small
          text-align: center

      &.active
        img
          filter: none

        small
          font-weight: 800
</style>
