<template>
  <v-fade-transition>
    <v-list-tile avatar ripple :class="{'blue lighten-5': unread}" class="list__tile--link">
      <v-list-tile-avatar>
        <v-avatar size="32px">
          <img :src="$app.serviceUri() + notification.thumbnail">
        </v-avatar>
      </v-list-tile-avatar>
      <v-list-tile-content  @click="action()">
        <v-list-tile-title>{{ notification.title }}</v-list-tile-title>
        <v-list-tile-sub-title class="grey--text">{{ notification.content }}</v-list-tile-sub-title>
        <span class="time">{{ timeFromNow }}</span>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn icon ripple  @click="toggleMarkAsRead(!notification.read)">
          <v-icon v-if="unread" color="grey lighten-1">done</v-icon>
          <v-icon v-else color="grey lighten-1">markunread</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-fade-transition>
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

  computed: {
    unread () {
      return !this.notification.read
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
    action () {
      if (this.notification.type === 'device') {
        if (this.notification.action === 'navigate') {
          if (!this.notification.read) this.toggleMarkAsRead(true)
          this.$router.push('/devices')
        }

        this.$emit('close')
      }
    },

    toggleMarkAsRead (read) {
      this.$store.dispatch(
        'user/markNotificationAsRead',
        { _id: this.notification._id, read: read },
        {root: true}
      )
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
