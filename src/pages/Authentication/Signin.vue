<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-card-title primary-title class="primary">
              <v-flex row class="text-xs-center white--text">
                <h2 class="title">Realtime Patients Monitoring System</h2>
                <h3>Sign in</h3>
              </v-flex>
            </v-card-title>
            <v-alert
              v-if="error"
              v-model="error"
              type="error"
              dismissible
              transition="fade-transition"
            >
              {{ error.message }}
            </v-alert>
            <v-form v-model="valid" ref="form" @submit.prevent>
              <v-card-text>
                <v-text-field
                  v-model="nic"
                  required
                  :rules="[(v) => !!v || 'NIC is required']"
                  label="NIC"
                  type="text">
                </v-text-field>
                <v-text-field
                  v-model="password"
                  required
                  :rules="[(v) => !!v || 'Password is required']"
                  label="Password"
                  type="password">
                </v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-flex xs12 class="text-xs-center">
                  <v-btn @click="signIn" color="primary" :disabled="loading" :loading="loading">
                    Sign in
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
                </v-flex>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: 'signin',
    data () {
      return {
        nic: '',
        password: '',
        error: null,
        valid: false
      }
    },
    computed: {
      loading () {
        return this.$store.getters['shared/loading']
      }
    },
    created () {
      this.$store.dispatch('shared/changeAppLayout', 'simple-layout')
    },
    methods: {
      signIn () {
        this.$refs.form.validate()
        this.error = null
        const vm = this
        this.$store.dispatch('user/signIn', {
          nic: this.nic,
          password: this.password
        })
        .then(() => {
          this.$store.dispatch('shared/changeAppLayout', 'app-layout')
          this.$router.push('/')
          this.$socket.open()
        })
        .catch(error => { vm.error = error })
      }
    }
  }
</script>

<style scoped>
 .title {
   text-transform: uppercase;
 }
</style>
