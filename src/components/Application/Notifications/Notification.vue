<template>
  <v-scale-transition>
    <v-list-tile avatar ripple>
      <v-list-tile-avatar>
        <v-avatar size="32px">
          <img :src="$app.serviceUri() + notification.thumbnail">
        </v-avatar>
      </v-list-tile-avatar>
      <v-list-tile-content  @click="action('top')">
        <v-list-tile-title>{{ notification.title }}</v-list-tile-title>
        <v-list-tile-sub-title class="grey--text">{{ notification.content }}</v-list-tile-sub-title>
        <span class="time">{{ notification.createdAt | timeago }}</span>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn icon ripple v-if="!notification.read" @click="action('done')">
          <v-icon color="grey lighten-1">done</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-scale-transition>
</template>

<script>
export default {
  props: ['notification'],
  methods: {
    action (v) {
      console.log(v)
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
