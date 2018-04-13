<template>
 
    <v-flex class="white elevation-2 fluid">
        <v-toolbar flat dense class="blue darken-3" dark>
        <v-toolbar-title>User Profile</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-3 pb-2">
           <v-container grid >
      <v-layout row wrap>
      <v-flex md3 xs12 sm6>
      <UserCard/>
      </v-flex>
      <v-flex md8 xs11  offset-md1>
        <ProfileView/>
      </v-flex>
      </v-layout>
        </v-container>
        </div>
    </v-flex>

    
</template>

<script>
import UserCard from './UserCard.vue'
import ProfileView from './ProfileView.vue'
export default {
  name: 'Profile',
  data () {
    return {
      User: null
    }
  },
  mounted () {
    this.User = this.$store.state.user.user
  },
  components: {
    UserCard,
    ProfileView
  }
}
</script>

<style>

</style>
