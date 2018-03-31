<template>
  <v-dialog v-model="model" max-width="400">
    <v-card>
      <v-card-title class="headline">Realtime Patients Monitoring System</v-card-title>
      <v-card-text>
        <div>Do you want to delete this ward ?</div>
        <strong>This action will remove all assigned beds and patients in the ward !.</strong>
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="$emit('close')">Cancel</v-btn>
        <v-btn color="red darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="deleteWard">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ward from '@/services/rpms/ward'

export default {
  props: [
    'display', 'ward'
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
    deleteWard () {
      this.loading = true
      const self = this
      ward.deleteWard(this.ward._id)
        .then(() => {
          this.loading = false
          self.$app.toast('Ward deleted successfully')
          self.$emit('deleted', this.ward)
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
