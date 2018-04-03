<template>
  <v-dialog v-model="model" max-width="400px">
    <v-card>
      <v-card-title class="headline">Realtime Patients Monitoring System</v-card-title>
      <v-card-text>
        <div class="subheading">Do you want to remove this device from system ?</div>
        <strong class="body-1 red--text">This action will disconnect from connections, reassign from assigned beds.</strong>
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="$emit('close')">Cancel</v-btn>
        <v-btn color="red darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="deleteDevice">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import device from '@/services/rpms/device'

export default {
  props: [
    'display', 'device'
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
    deleteDevice () {
      this.loading = true
      const self = this
      device.deleteDevice(this.device._id)
        .then(() => {
          this.loading = false
          self.$app.toast('Device removed successfully')
          self.$emit('deviceDeleted')
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
