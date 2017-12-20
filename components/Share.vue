<template lang="pug">
  a(:href='shareUrl')
    img(:src='icon', :alt='`Compartir en ${type}`')
</template>

<script>
export default {
  props: ['type', 'text', 'url'],

  data () {
    let fullUrl = this.url ? this.url : `${process.env.BASE_URL}${this.$route.fullPath}`
    let shareUrl = ''
    let icon = ''

    if (this.type === 'facebook') {
      shareUrl = `https://www.facebook.com/dialog/share?app_id=1031588773519678&display=popup&href=${fullUrl}&redirect_uri=${fullUrl}`
      icon = '/fb.png'
    } else if (this.type === 'twitter') {
      shareUrl = `http://twitter.com/share?text=${this.text || ''}&url=${fullUrl}`
      icon = '/tw.jpg'
    }

    return {
      shareUrl,
      icon
    }
  }
}
</script>
