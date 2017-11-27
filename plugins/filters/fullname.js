import Vue from 'vue'

Vue.filter('fullname', (value) => {
  return `${value.name.first} ${value.name.last}`
})
