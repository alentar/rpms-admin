<template>
  <v-menu offset-y fixed :nudge-width="250" :nudge-right="10" :nudge-top="10">
    <v-btn icon large slot="activator">
      <v-avatar size="32px" tile>
        <img src="/static/user.png">
      </v-avatar>
    </v-btn>

    <v-list two-line v-if="user">
      <v-list-tile>
        <v-list-tile-avatar>
          <v-avatar size="48px" tile>
            <img src="/static/user.png">
          </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="title">{{ user.title | capitalizefirstletter }}. {{ user.name | shortname }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ user.role | touppercase }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile
        v-for="item in profileMenu"
        :key="item.text"
        @click="invoke(item.action)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <app-signout-dialog :display="dialog" @close="dialog = false"></app-signout-dialog>
  </v-menu>
</template>

<script>
import SignOutDialog from '../Dialogs/SignOutDialog'

export default {
  components: {
    'app-signout-dialog': SignOutDialog
  },

  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },

  data () {
    return {
      dialog: false,
      profileMenu: [
        { icon: 'person', text: 'My Profile', action: 'profile' },
        { icon: 'exit_to_app', text: 'Sign out', action: 'showSignOut' }
      ]
    }
  },

  methods: {
    showSignOut () {
      this.dialog = true
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
