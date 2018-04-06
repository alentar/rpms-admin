<template>
  <v-menu v-model="value" offset-y :position-y="50" :position-x="100" fixed bottom right :nudge-width="350" :max-height="400">
    <v-btn icon slot="activator">
      <v-badge right overlap color="grey">
        <span slot="badge">{{ unread }}</span>
        <v-icon>notifications</v-icon>
      </v-badge>
    </v-btn>

    <v-list three-line>
      <v-list-tile v-if="notifications.length === 0">
        Nothing to show
      </v-list-tile>
      <app-notification v-for="notification in notifications" :key="notification._id" :notification="notification">
      </app-notification>
    </v-list>
  </v-menu>

</template>

<script>
import Notification from '../Notifications/Notification'

export default {
  components: {
    'app-notification': Notification
  },

  data () {
    return {
      value: false
    }
  },

  computed: {
    notifications () {
      return this.$store.getters['user/notifications']
    },

    unread () {
      return this.$store.getters['user/unread']
    }
  }
}
</script>

<style>

</style>
