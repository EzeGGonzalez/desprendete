<template>
  <div class="pic-wrapper">
    <div class="pic" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['user', 'pic'],

  computed: {
    image () {
      return _.get(this.user || this.$store.state.user, 'photo.secure_url', this.pic || '/user.svg')
    }
  }
}
</script>

<style lang="sass" scoped>
.pic-wrapper
  .pic
    background-size: cover
    background-repeat: no-repeat
</style>
