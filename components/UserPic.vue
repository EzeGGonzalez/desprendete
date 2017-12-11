<template>
  <div class="pic-wrapper">
    <div class="pic" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
  </div>
</template>

<script>
export default {
  props: ['user'],

  data () {
    return {
      image: (this.user.photo && this.user.photo.secure_url) || ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .pic-wrapper {
    .pic {
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
</style>
