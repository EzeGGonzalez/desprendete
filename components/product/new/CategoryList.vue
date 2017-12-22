<template>
  <b-form-group id="category_group" label="Categoría" label-for="category">
    <div class="category-list">
      <div @click="setCategory(c)" v-for="(c, i) in categories"
        :key="i" class="category-wrap" :class="{ active: categoryActive(c) }">

        <div class="category">
          <img :src="c.image.secure_url" :alt="c.name">
          <small>{{c.name}}</small>
        </div>
      </div>
    </div>

    <b-form-select id="category"
      text-field="name" value-field="_id"
      v-if="subcategories(form.category).length"
      :options="subcategories(form.category)" required
      v-model="form.subcategory"
    >
      <template slot="first">
        <option :value="null" disabled>-- Seleccione una sub-categoría --</option>
      </template>
    </b-form-select>
  </b-form-group>
</template>

<script>
export default {
  props: ['form'],

  async created () {
    this.categories = await this.$axios.$get(`/api/categories`)
  },

  data () {
    return {
      categories: []
    }
  },

  methods: {
    categoryActive (category) {
      return this.form.category && this.form.category._id === category._id
    },

    setCategory (c) {
      this.form.subcategory = null
      this.form.category = c
    },

    subcategories (category) {
      let c = this.categories.find(c => c._id === category._id)
      return (c && c.subcategories) || []
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
