<template>
  <v-container grid-list-md>
    <!-- <v-flex md12 row >
      <h4 class="title">Edit Profile</h4>
    </v-flex> -->
    <!-- <v-form> -->
        <v-layout row md12 wrap>
          <v-flex md5 column>
            <p class="text">ID</p>
            {{user._id}}
            <!-- <v-text-field type="text"        
                      placeholder="ID"
                      disabled
                      v-model="user._id">
                      
            </v-text-field> -->
          </v-flex>
          <v-flex md6 offset-md1 column>
            <p class="text">User Name</p>
            {{user.name}}
            <!-- <v-text-field type="text"
                      disabled
                      placeholder="Name"
                      v-model="user.name">
            </v-text-field> -->
          </v-flex>
        </v-layout>
        <br>
        <v-layout row md12 wrap>
          <v-flex md5 column>
           <p class="text"> NIC</p>
            {{user.nic}}
            <!-- <v-text-field type="text"                      
                      placeholder="NIC"
                      disabled
                      v-model="user.nic">            
            </v-text-field> -->
          </v-flex>
          <v-flex md6 offset-md1 column>
            <p class="text">Gender</p>
            {{user.gender}}
            <!-- <v-text-field type="text"
                      
                      placeholder="Gender"
                      name="gender"
                      disabled
                      v-model="user.gender">
            </v-text-field> -->
          </v-flex>
        </v-layout>
        <br>
         <v-layout row md12 wrap>
          <v-flex md5 column>
            <p class="text">Register ID</p>
            {{user.registerID}}
            <!-- <v-text-field type="text"
                      disabled
                      placeholder="Register ID"
                      v-model="user.registerID">
                      
            </v-text-field> -->
          </v-flex>
          <v-flex md6 offset-md1 column>
            <p class="text">Role</p>
            {{user.role}}
            <!-- <v-text-field type="text"                  
                      placeholder="Role"
                      disabled
                      v-model="user.role">
                      
            </v-text-field> -->
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
        <!-- <v-layout row md12 align-right>
          <v-flex text-xs-right>
           <v-btn color="success" @click="savechanges()">
               <v-icon>save</v-icon>
               Save Changes
           </v-btn>
          </v-flex>
        </v-layout> -->
    <!-- </v-form> -->
  </v-container>
</template>
<script>
import UserService from '@/services/rpms/user'
export default {
  data () {
    return {
      user: ''
    }
  },
  mounted () {
    this.user = this.$store.state.user.user
  },
  methods: {
    async savechanges () {
      const newUser = {
        name: this.user.name,
        registerID: this.user.registerID,
        gender: this.user.gender
      }
      console.log(newUser)
      const save = await UserService.updateUser(this.$store.state.user.user._id, newUser)
      console.log(save)
      this.user = save
    }
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
</style>
