<template>
  <v-dialog v-model="display" persistent max-width="700px">
    <v-card>
      <v-card-title>
        <span class="headline">Add User</span>
      </v-card-title>
      <v-form ref="form">
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 v-if="error">
                <v-alert dismissible type="error" v-model="error">{{ error.message | capitalizefirstletter }}</v-alert>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="nic"
                  label="NIC"
                  persistent-hint
                  required
                  type="text"
                  :rules="[rules.required, rules.nic]"
                  hint="NIC of the user (both new and old are supported)">
                </v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Full Name"
                  persistent-hint
                  :counter="150"
                  required
                  :rules="[rules.required, rules.name]"
                  type="text"
                  hint="Ex: 'S.M. Nalin Kumara', enter 'Samarasinghe Mudiyanselage Nalin Kumara'">
                </v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="password"
                  persistent-hint
                  :counter="50"
                  :rules="[rules.password]"
                  hint="Password for new user"
                  placeholder="Keep this blank to use NIC as default password"
                  label="Password"
                  :append-icon="password_hidden ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (password_hidden = !password_hidden)"
                  :type="password_hidden ? 'password' : 'text'">
                </v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="registerID"
                  persistent-hint
                  hint="Register ID of the user if presents"
                  label="Register ID"
                  type="text">
                 </v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-select
                  label="Role"
                  persistent-hint
                  required
                  hint="Select role of the user"
                  :items="roles"
                  v-model="role">
                </v-select>
              </v-flex>

              <v-flex xs12 sm6>
                <v-select
                  label="Gender"
                  persistent-hint
                  required
                  hint="Gender of user"
                  :items="genders"
                  v-model="gender">
                </v-select>
              </v-flex>

              <v-flex xs12 sm6>
                <v-select
                  label="Title"
                  required
                  hint="Title of user"
                  persistent-hint
                  :items="titles"
                  v-model="title">
                </v-select>
              </v-flex>

              <v-flex xs12>
                <v-select
                  label="Contacts"
                  chips
                  tags
                  prepend-icon="contacts"
                  clearable
                  v-model="contacts"
                  hint="Enter contacts for user, press enter when one inserted"
                  persistent-hint
                  mask="phone"
                  append-icon=""
                  :rules="[rules.contacts]"
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      close
                      @input="remove(data.item)"
                      :selected="data.selected"
                    >
                      <v-icon>phone</v-icon>
                      <strong>{{ data.item }}</strong>
                    </v-chip>
                  </template>
                </v-select>
              </v-flex>
              <small>Items with * are required</small>
            </v-layout>
          </v-container>
        </v-card-text>
       <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click.native="close">Close</v-btn>
          <v-btn color="green darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="saveUser">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import rpms from '@/services/rpms'

export default {
  props: [ 'display' ],

  data () {
    return {
      name: '',
      nic: '',
      registerID: '',
      gender: 'male',
      title: 'mr',
      role: 'admin',
      password: '',
      contacts: [],
      genders: [
        {text: 'Male', value: 'male'},
        {text: 'Female', value: 'female'}
      ],
      roles: [
        {text: 'Admin', value: 'admin'},
        {text: 'Doctor', value: 'doctor'},
        {text: 'Nurse', value: 'nurse'}
      ],
      titles: [
        {text: 'Mr', value: 'mr', disabled: false},
        {text: 'Miss', value: 'miss', disabled: true},
        {text: 'Mrs', value: 'mrs', disabled: true},
        {text: 'Ms', value: 'ms', disabled: true}
      ],
      rules: {
        required: (val) => !!val || 'Field is required',
        nic: (val) => (val.length === 10 || val.length === 12) || 'Invalid NIC value',
        contacts: () => this.contacts.length <= 5 || 'Max allowed 5 contacts',
        password: (val) => (!val || (val && val.length > 0 && val.length >= 6 && val.length <= 50)) || 'Minimum is 6 and Maximum is 50 characters',
        name: (val) => (val.length < 150) || 'Maximum is 150 characters'
      },
      password_hidden: true,
      error: null,
      loading: false
    }
  },

  watch: {
    gender (value) {
      var self = this
      if (value === 'male') {
        this.titles.forEach((item) => {
          self.title = 'mr'
          item.disabled = !(item.value === 'mr')
        })
      } else if (value === 'female') {
        this.titles.forEach((item) => {
          self.title = 'miss'
          item.disabled = (item.value === 'mr')
        })
      }
    },

    name (value) {
      this.name = value.split(' ').map((word) => { return word[0].toUpperCase() + word.substr(1) }).join(' ')
    }
  },

  mounted () {
    this.clear()
  },

  methods: {
    // saves a user to database
    saveUser () {
      if (!this.$refs.form.validate()) return

      this.loading = true

      const user = {
        name: this.name,
        nic: this.nic.toLowerCase(),
        gender: this.gender,
        title: this.title,
        role: this.role
      }

      if (this.password.length > 0) user.password = this.password
      if (this.registerID.length > 0) user.registerID = this.registerID
      if (this.contacts.length > 0) user.contacts = this.contacts

      let self = this
      rpms.User.createUser(user)
        .then((user) => {
          this.loading = false
          this.$emit('userCreated', user)
          this.$app.toast('User created', 3000)
          this.clear()
          this.close()
        })
        .catch(err => {
          this.loading = false
          self.error = err
        })
    },

    // remove contact from contacts
    remove (item) {
      this.contacts.splice(this.contacts.indexOf(item), 1)
      this.contacts = [...this.contacts]
    },

    // closes the dialog
    close () {
      this.clear()
      this.$emit('close')
    },

    // clear form
    clear () {
      this.$refs.form.reset()
      this.name = ''
      this.nic = ''
      this.registerID = ''
      this.gender = 'male'
      this.title = 'mr'
      this.role = 'admin'
      this.password = ''
      this.contacts = []
      this.password_hidden = true
      this.error = null
      this.loading = false
    }
  }
}
</script>
