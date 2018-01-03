<template>
  <b-container id="notifications" v-if="$store.state.notifications.length">
    <b-alert v-for="(n, i) in $store.state.notifications"
      :key="i" :variant="n.type" show
      v-delay="() => { $store.commit('REMOVE_ALERT', n) }"
    >
      {{n.message}}
    </b-alert>
  </b-container>
</template>
