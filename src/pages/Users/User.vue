<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <div @click="$router.push('/users')" class="back">
          <v-icon>navigate_before</v-icon>
          Users
        </div>
      </v-flex>
    </v-layout>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="primary"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row justify-center v-if="user && !loading">
      <v-flex xs6 class="text-xs-center">
        <v-card>
          <v-card-text>
            <v-avatar
              :size="180"
              class="grey lighten-4"
            >
              <img src="/static/user.png" alt="avatar">
            </v-avatar>

            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content >
                  <v-list-tile-title>Name</v-list-tile-title>
                  <v-list-tile-sub-title>{{ user.name }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>NIC</v-list-tile-title>
                  <v-list-tile-sub-title>{{ user.nic }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Role</v-list-tile-title>
                  <v-list-tile-sub-title>{{ user.role | capitalizefirstletter }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="user.registerID">
                <v-list-tile-content>
                  <v-list-tile-title>Register ID</v-list-tile-title>
                  <v-list-tile-sub-title>{{ user.registerID }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Gender</v-list-tile-title>
                  <v-list-tile-sub-title>{{ user.gender | capitalizefirstletter }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Title</v-list-tile-title>
                  <v-list-tile-sub-title>{{ user.title | capitalizefirstletter }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Created At</v-list-tile-title>
                  <v-list-tile-sub-title>{{ user.createdAt | prettydate }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <template v-if="user.contacts && user.contacts.length > 0">
                <v-divider></v-divider>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Contacts</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="contact in user.contacts" :key="contact">
                  <v-list-tile-action>
                    <v-icon color="indigo">phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ contact }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center v-if="notfound && !user && !loading">
      <v-flex xs12 class="text-xs-center">
        <h1>User not found</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import user from '@/services/rpms/user'

export default {
  props: ['id'],
  data () {
    return {
      user: null,
      loading: true,
      notfound: false
    }
  },
  mounted () {
    const self = this
    user.getUser(this.id)
      .then((user) => {
        self.user = user
        self.loading = false
      })
      .catch(() => {
        self.notfound = true
        self.loading = false
      })
  }
}
</script>

<style>
  .back {
    cursor: pointer;
  }
</style>
