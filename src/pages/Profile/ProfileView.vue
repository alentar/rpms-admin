<template>
  <v-container grid-list-md>
    <!-- <v-flex md12 row >
      <h4 class="title">Edit Profile</h4>
    </v-flex> -->
    <v-form>
        <v-layout row md12>
          <v-flex md5 column>
            <v-text-field type="text"
                      label="ID"
                      placeholder="ID"
                      disabled
                      v-model="user._id">
                      
            </v-text-field>
          </v-flex>
          <v-flex md6 offset-md1 column>
            <v-text-field type="text"
                      label="Username"
                      placeholder="Name"
                      v-model="user.name">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row md12>
          <v-flex md5 >
            <v-text-field type="text"
                      label="NIC"
                      placeholder="NIC"
                      disabled
                      v-model="user.nic">            
            </v-text-field>
          </v-flex>
          <v-flex md6 offset-md1>
            <v-text-field type="text"
                      label="Gender"
                      placeholder="Gender"
                      name="gender"
                      disabled
                      v-model="user.gender">
            </v-text-field>
          </v-flex>
        </v-layout>
         <v-layout row md12>
          <v-flex md5 >
            <v-text-field type="text"
                      label="Register ID"
                      placeholder="Register ID"
                      v-model="user.registerID">
                      
            </v-text-field>
          </v-flex>
          <v-flex md6 offset-md1>
            <v-text-field type="text"
                      label="Role"
                      placeholder="Role"
                      disabled
                      v-model="user.role">
                      
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row md12 align-right>
          <v-flex text-xs-right>
           <v-btn color="success" @click="savechanges()">
               <v-icon>save</v-icon>
               Save Changes
           </v-btn>
          </v-flex>
        </v-layout>
    </v-form>
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

</style>
