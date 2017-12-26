<template lang="pug">
  b-form-group#condition_group(label='Condición', label-for='condition')
    b-form-select#condition(:options='conditions', required='', v-model='form.condition')
</template>

<script>
export default {
  props: ['form'],

  data () {
    return {
      conditions: [
        { text: 'Seleccionar', value: null },
        { text: 'Sano', value: 'good' },
        { text: 'Roto', value: 'broken' }
      ]
    }
  }
}
</script>

