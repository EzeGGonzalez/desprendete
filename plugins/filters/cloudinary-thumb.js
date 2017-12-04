import Vue from 'vue'

Vue.filter('cloudinaryThumb', (image) => {
  return image.secure_url.replace(`v${image.version}`, 'c_limit,w_150')
})
