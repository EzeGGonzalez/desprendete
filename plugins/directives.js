import Vue from 'vue'

Vue.directive('delay', {
  isFn: true,
  bind: function (el, binding) {
    setTimeout(binding.value, 5000)
  }
})
