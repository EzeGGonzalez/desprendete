import Vue from 'vue'

Vue.filter('cloudinaryThumb', (image, w = 150, h = 150) => {
  return image.secure_url.replace(`v${image.version}`, `c_limit,w_${w}`)
})
