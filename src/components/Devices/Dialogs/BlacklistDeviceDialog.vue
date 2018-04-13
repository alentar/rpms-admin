<template>
  <v-dialog v-model="model" max-width="400px">
    <v-card>
      <v-card-title class="headline">Realtime Patients Monitoring System</v-card-title>
      <v-card-text>
        <div class="subheading">Do you want to {{ action }} this device ?</div>
        <strong class="body-1 red--text">
          <div v-if="action === 'blacklist'">
            This action will blacklist device and remove all the connections.
            Perform with caution. Device cannot communicate with system unless you whitelist it.
          </div>
          <div v-else>
            This action will whitelist this device, so it can communicate with system
          </div>
        </strong>
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click.stop="$emit('close')">Cancel</v-btn>
        <v-btn color="red darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="takeAction">{{ action }}</v-btn>
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
    },

    action () {
      return this.device.blacklisted === true ? 'whitelist' : 'blacklist'
    }
  },

  methods: {
    takeAction () {
      this.loading = true
      const self = this

      device.blacklistDevice(this.device._id, this.action === 'blacklist')
        .then((device) => {
          this.loading = false
          self.$app.toast(`Device ${self.action}ed successfully`)
          self.$emit('deviceStateChanged', device)
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
