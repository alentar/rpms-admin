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
        <span class="time">{{ timeFromNow }}</span>
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
import moment from 'moment'

export default {
  props: ['notification'],
  data () {
    return {
      timeFromNow: null
    }
  },
  created () {
    this.getTimeFromNow()
    setInterval(this.getTimeFromNow, 1000)
  },
  destroyed () {
    clearInterval(this.getTimeFromNow)
  },
  methods: {
    action (v) {
      console.log(v)
    },

    getTimeFromNow () {
      this.timeFromNow = moment(this.notification.createdAt).fromNow()
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
