import Vue from 'vue'
import _ from 'lodash'

Vue.filter('cloudinaryThumb', (image, w = 150, h = 150) => {
  return _.get(image, 'secure_url') ? image.secure_url.replace(`v${image.version}`, `c_limit,w_${w}`) : '/isotipo_grey.jpg'
})
