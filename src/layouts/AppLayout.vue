<template>
  <div>
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :to="item.link" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
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
    <template>
      <v-dialog v-model="signOutDialog" max-width="300">
        <v-card>
          <v-card-title class="headline">Realtime Patients Monitoring System</v-card-title>
          <v-card-text>Do you want to sign out ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="signOutDialog = false">Cancel</v-btn>
            <v-btn color="red darken-1" flat="flat" @click.native="signOut">Signout</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer color="blue darken-3" app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </div>
</template>

<script>
  import UserMenu from '@/components/Application/UserMenu'

  export default {
    name: 'AppLayout',
    components: {
      'app-user-menu': UserMenu
    },
    data () {
      return {
        drawer: true,
        signOutDialog: false,
        items: [
          { icon: 'dashboard', text: 'Dashboard', link: '/' },
          { icon: 'people', text: 'Users', link: '/users' },
          { icon: 'settings_input_component', text: 'Devices', link: '/devices' },
          { icon: 'domain', text: 'Wards', link: '/wards' },
          { icon: 'person', text: 'Patients', link: '/patients' },
          { icon: 'settings', text: 'Settings', link: '/settings' },
          { icon: 'chat_bubble', text: 'Send feedback', link: '/feedback' },
          { icon: 'help', text: 'Help', link: '/help' }
        ]
      }
    },
    methods: {
      showSignOut () {
        this.signOutDialog = true
      },
      signOut () {
        this.signOutDialog = false
        this.$store.dispatch('user/signOut')
        this.$router.push('/signin')
      },
      profile () {
        this.$router.push('/profile')
      },
      invoke (name) {
        this[name]()
      }
    }
  }
</script>
