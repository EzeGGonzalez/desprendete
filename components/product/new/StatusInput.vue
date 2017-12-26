<template lang="pug">
  b-form-group#status_group(label='Estado', label-for='status')
    b-form-select#status(:options='status', required, v-model='form.status')
</template>

<script>
export default {
  props: ['form'],

  data () {
    return {
      status: [
        { text: 'Seleccionar Estado', value: null },
        { text: 'Malo', value: 1 },
        { text: 'Regular', value: 2 },
        { text: 'Bueno', value: 3 },
        { text: 'Muy Bueno', value: 4 },
        { text: 'Excelente', value: 5 }
      ]
    }
  }
}
</script>
