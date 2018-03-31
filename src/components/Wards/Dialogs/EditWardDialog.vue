<template>
  <v-dialog v-model="display" persistent max-width="700px">
    <v-card>
      <v-card-title>
        <div class="headline">Edit ward {{ ward.number }}</div>
      </v-card-title>
      <v-form ref="form">
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12 v-if="error">
              <v-alert dismissible type="error" v-model="error">{{ error.message | capitalizefirstletter }}</v-alert>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="number"
                label="Ward number"
                persistent-hint
                required
                type="number"
                :rules="[rules.positive, rules.freeward]"
                hint="Ward number eg: 3, 5">
              </v-text-field>
              <v-text-field
                v-model="name"
                label="Ward name"
                persistent-hint
                required
                type="text"
                hint="Ward name eg: ICU">
              </v-text-field>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click.native="close">Close</v-btn>
          <v-btn color="green darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="updateWard">Update</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import ward from '@/services/rpms/ward'

export default {
  props: ['display', 'wards', 'ward'],

  data () {
    return {
      number: this.ward.number,
      name: this.ward.name,
      error: null,
      loading: false,
      rules: {
        required: (val) => !!val || 'Field is required',
        positive: (val) => parseInt(val) > 0 || 'Number needs to be a positive number',
        freeward: (val) => (parseInt(val) === this.ward.number || (val && !this.wards.includes(parseInt(val)))) || 'Ward already exists'
      }
    }
  },

  methods: {
    updateWard () {
      if (!this.$refs.form.validate()) return

      this.loading = true
      const payload = {}

      if (this.number && parseInt(this.number) !== this.ward.number) payload.number = this.number
      if (this.name && this.name.trim().length > 0 && this.name !== ward.name) payload.name = this.name.trim()

      const self = this
      ward.updateWard(this.ward._id, payload).then(ward => {
        self.loading = false
        self.$emit('wardUpdated', ward)
        self.$app.toast('Ward updated successfully')
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
      this.$refs.form.reset()
      this.error = null
      this.loading = false
    }
  }
}
</script>
