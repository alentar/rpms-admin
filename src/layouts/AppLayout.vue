<template>
  <div>
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <app-main-menu></app-main-menu>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">RPMS</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <app-notification-menu></app-notification-menu>
      <app-user-menu></app-user-menu>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-snackbar
      v-if="snackbar"
      :timeout="snackbar.timeout"
      :bottom="true"
      :left="true"
      v-model="snackbar"
    >
      {{ snackbar.text }}
      <v-btn flat color="pink" @click.native="snackbar = null">Close</v-btn>
    </v-snackbar>

    <v-footer color="blue darken-3" app>
      <v-spacer></v-spacer>
      <div class="white--text">
        <v-chip label small color="pink" text-color="white">
          <v-icon left>supervisor_account</v-icon> {{ userCount || 'No one yet' }}
        </v-chip>
        <v-chip label small :color="connected === true ? 'green' : 'red'" text-color="white">
          {{ connected === true ? 'Online' : 'Offline' }}
        </v-chip>
        &copy; 2018
      </div>
    </v-footer>
  </div>
</template>

<script>
import UserMenu from '@/components/Application/Menus/UserMenu'
import MainMenu from '@/components/Application/Menus/MainMenu'
import NotificationMenu from '@/components/Application/Menus/Notifications/NotificationMenu'

export default {
  name: 'AppLayout',

  sockets: {
    notification (notification) {
      this.$app.notification(notification)
      this.play(this.audios.newDeviceConnected)
    },

    userCount (count) {
      this.userCount = count
    }
  },

  components: {
    'app-user-menu': UserMenu,
    'app-main-menu': MainMenu,
    'app-notification-menu': NotificationMenu
  },

  computed: {
    snackbar: {
      get: function () {
        return this.$store.getters['shared/snackbar']
      },

      set: function (value) {
        this.$store.dispatch('shared/showSnackbar', null, {root: true})
      }
    },

    connected () {
      return this.$store.getters['shared/connected'] === true
    }
  },

  data () {
    return {
      drawer: true,
      userCount: 0,
      audios: {
        'newDeviceConnected': new Audio('/static/device-wants-to-connect.mp3')
      }
    }
  },

  methods: {
    play (audio) {
      audio.play()
    }
  }
}
</script>
