import Vue from 'vue'
import moment from 'moment'

const CONDITIONS = { 'broken': 'Roto', 'good': 'Sano' }
const STATUS = ['Malo', 'Regular', 'Bueno', 'Muy Bueno', 'Excelente']

Vue.filter('productCondition', (value) => {
  return value && value.length ? CONDITIONS[value] : ''
})

Vue.filter('productStatus', (value) => {
  return value && value > 0 && value <= 5 ? STATUS[value - 1] : ''
})

Vue.filter('humanDate', value => {
  return value ? moment(String(value)).format('DD/MM/YYYY') : '--'
})
