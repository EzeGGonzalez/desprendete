<template>
  <b-container id="notifications" v-if="$store.state.notifications.length">
    <b-alert v-for="(n, i) in $store.state.notifications"
      :key="i" variant="success" show
      v-delay="() => { $store.commit('REMOVE_ALERT_SUCCESS', n) }"
    >
      {{n.message}}
    </b-alert>
  </b-container>
</template>
