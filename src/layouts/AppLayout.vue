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
        <span class="hidden-sm-and-down">RPMS - Admin</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
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
      <span class="white--text">&copy; 2018 </span>
    </v-footer>
  </div>
</template>

<script>
  import UserMenu from '@/components/Application/Menus/UserMenu'
  import MainMenu from '@/components/Application/Menus/MainMenu'

  export default {
    name: 'AppLayout',
    components: {
      'app-user-menu': UserMenu,
      'app-main-menu': MainMenu
    },

    computed: {
      snackbar: {
        get: function () {
          return this.$store.getters['shared/snackbar']
        },

        set: function (value) {
          this.$store.dispatch('shared/showSnackbar', null, {root: true})
        }
      }
    },

    data () {
      return {
        drawer: true
      }
    }
  }
</script>
