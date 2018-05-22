<template>
  <v-dialog v-model="model" max-width="400">
    <v-card>
      <v-card-title class="headline">Realtime Patients Monitoring System</v-card-title>
      <v-card-text>Do you want to discharge the patient ?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="$emit('close')">Cancel</v-btn>
        <v-btn color="red darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="dischargePatient">Discharge</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import patient from '@/services/rpms/patient'

export default {
  props: [
    'display', 'bed'
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
    dischargePatient () {
      this.loading = true
      const self = this
      patient.dischargePatient(this.bed.patient._id)
        .then(() => {
          this.loading = false
          self.$app.toast('Patient was discharged')
          self.$emit('patientDischarged', self.bed._id)
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
