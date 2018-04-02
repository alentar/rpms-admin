<template>
  <v-menu offset-y fixed :nudge-width="350">
    <v-btn icon slot="activator">
      <v-badge right overlap color="grey">
        <span slot="badge">6</span>
        <v-icon>notifications</v-icon>
      </v-badge>
    </v-btn>

    <v-list three-line>
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

  computed: {
    notifications () {
      return this.$store.getters['shared/notifications']
    }
  }
}
</script>

<style>

</style>
