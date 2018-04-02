<template>
  <v-list-tile avatar ripple @click="action()">
    <v-list-tile-avatar>
      <v-avatar size="32px">
        <img :src="notification.thumbnail">
      </v-avatar>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ notification.title }}</v-list-tile-title>
      <v-list-tile-sub-title class="grey--text">{{ notification.content }}</v-list-tile-sub-title>
      <span v-if="notification.time" class="time">{{ notification.time | prettydate }}</span>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon ripple v-if="!notification.read">
        <v-icon color="grey lighten-1">done</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  props: ['notification'],
  methods: {
    action () {
      console.log(this.notification)
    }
  }
}
</script>

<style>
  .time {
    font-weight: 200;
    font-size: smaller;
  }
</style>
