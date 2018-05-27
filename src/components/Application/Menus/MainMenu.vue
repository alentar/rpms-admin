<template>
  <v-list dense>
    <template v-for="item in items">
      <template v-if="show(item.acl)">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
          <v-flex xs6>
            <v-subheader v-if="item.heading && show(item.acl)">
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
          <v-list-tile slot="activator" v-if="show(item.acl)">
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
            <template v-if="show(child.acl)">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </template>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :to="item.link" :key="item.text">
          <template  v-if="show(item.acl)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-list-tile>
      </template>
    </template>
  </v-list>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { icon: 'dashboard', text: 'Dashboard', link: '/', acl: 1000 },
        { icon: 'people', text: 'Users', link: '/users', acl: 0 },
        { icon: 'settings_input_component', text: 'Devices', link: '/devices', acl: 0 },
        { icon: 'domain', text: 'Wards', link: '/wards', acl: 1000 },
        { icon: 'person', text: 'Patients', link: '/patients', acl: 1000 },
        { icon: 'settings', text: 'Settings', link: '/settings', acl: 1000 },
        { icon: 'chat_bubble', text: 'Send feedback', link: '/feedback', acl: 1000 },
        { icon: 'help', text: 'Help', link: '/help', acl: 1000 }
      ]
    }
  },

  computed: {
    acl () {
      return this.$store.getters['user/acl']
    }
  },

  methods: {
    show (level) {
      if (level === undefined || level === null) return true
      return this.acl <= level
    }
  }
}
</script>
