<template>
  <v-dialog v-model="display" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <div class="headline">Edit Device</div>
      </v-card-title>
      <v-form>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12 v-if="error">
              <v-alert dismissible type="error" v-model="error">{{ error.message | capitalizefirstletter }}</v-alert>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="name"
                label="Device name"
                persistent-hint
                type="text"
                hint="Device name eg: Ward1-D1">
              </v-text-field>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click.native="close">Close</v-btn>
          <v-btn color="green darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="updateDevice">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import device from '@/services/rpms/device'

export default {
  props: ['display', 'device'],

  data () {
    return {
      name: this.device.name,
      error: null,
      loading: false
    }
  },

  methods: {
    updateDevice () {
      this.loading = true
      const payload = {}

      if (this.name !== this.device.name) payload.name = this.name.trim()

      const self = this
      device.updateDevice(this.device._id, payload).then(device => {
        self.loading = false
        self.$emit('deviceUpdated', device)
        self.$app.toast('Device updated successfully')
      })
      .catch(err => {
        self.loading = false
        self.error = err
      })
    },

    close () {
      this.$emit('close')
    },

    clear () {
      this.error = null
      this.loading = false
    }
  }
}
</script>
