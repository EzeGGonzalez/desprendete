<template>
  <b-container id="notifications" v-if="$store.state.notifications.length">
    <b-alert v-for="(n, i) in $store.state.notifications"
      :key="i" variant="success" show>{{n.message}}</b-alert>
  </b-container>
</template>
