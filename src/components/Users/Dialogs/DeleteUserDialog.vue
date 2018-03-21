<template>
  <v-dialog v-model="model" max-width="400">
    <v-card>
      <v-card-title class="headline">Realtime Patients Monitoring System</v-card-title>
      <v-card-text>Do you want to delete the user <strong>{{ user.name | shortname }}</strong> ?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="$emit('close')">Cancel</v-btn>
        <v-btn color="red darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="deleteUser">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import rpms from '@/services/rpms'

export default {
  props: [
    'display', 'user'
  ],

  data () {
    return {
      loading: false
    }
  },

  computed: {
    model: {
      get: function () {
        return this.display
      },

      set: function (value) {
        this.$emit('close')
      }
    }
  },

  methods: {
    deleteUser () {
      this.loading = true
      const self = this
      rpms.User.deleteUser(this.user.id)
        .then(() => {
          this.loading = false
          self.$app.toast('User deleted successfully')
          self.$emit('delete', this.user)
          self.$emit('close')
        })
        .catch((err) => {
          this.loading = false
          alert(err.message)
        })
    }
  }
}
</script>
