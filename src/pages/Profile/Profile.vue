<template>
 
    <v-flex class="white elevation-2 fluid">
        <v-toolbar flat dense class="blue darken-3" dark>
        <v-toolbar-title>User Profile</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-3 pb-2">
          <v-container grid >
            <v-layout row wrap>
            <v-flex md3 xs12 sm6>
              <v-layout wrap>
                <div>
                <v-avatar
                :tile="false"
                :size="150"
                class="grey lighten-4"
                align-center
                >
                <img src="/static/user.png" alt="avatar">    
                </v-avatar>   
                <h4 class="title">{{user.name}}
                <br>
                </h4>
                </div>
              </v-layout>
            </v-flex>
            <v-flex md8 xs11  offset-md1>
              <v-container grid-list-md>
                <v-layout row md12 wrap>
                  <v-flex md5 column>
                    <p class="text">User ID</p>
                    {{user._id}}
                  </v-flex>
                  <v-flex md6 offset-md1 column>
                    <p class="text">User Name</p>
                    {{user.name}}
                  </v-flex>
                </v-layout>
                <br>
                <v-layout row md12 wrap>
                  <v-flex md5 xs12 column>
                  <p class="text"> NIC</p>
                    {{user.nic}}
                  </v-flex>
                  <v-flex md6 offset-md1 column>
                    <p class="text">Gender</p>
                    {{user.gender}}
                  </v-flex>
                </v-layout>
                <br>
                <v-layout row md12 wrap>
                  <v-flex md5 xs12 column>
                    <p class="text">Register ID</p>
                    {{user.registerID}}
                  </v-flex>
                  <v-flex md6 offset-md1 column>
                    <p class="text">Role</p>
                    {{user.role}}
                  </v-flex>
                </v-layout>
                <br>
                <v-layout row wrap>
                  <v-flex>
                    <p class="text">Contacts</p>
                    <v-list-tile v-for="contact in user.contacts" :key="contact">
                          <v-list-tile-action>
                            <v-icon color="indigo">phone</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ contact }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            </v-layout>
        </v-container>
        </div>
    </v-flex>    
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      user: null
    }
  },
  mounted () {
    this.user = this.$store.getters['user/user']
  },
  components: {
  }
}
</script>

<style>
.text {
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: unset;
  font-size: 15px;
  font-weight: bold;
}
.title {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding-top: 5px;
}
</style>
