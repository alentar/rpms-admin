<template>
  <v-dialog v-model="display" persistent max-width="700px">
    <v-card>
      <v-card-title>
        <div class="headline">Create beds</div>
      </v-card-title>
      <v-form ref="form">
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12 v-if="error">
              <v-alert dismissible type="error" v-model="error">{{ error.message | capitalizefirstletter }}</v-alert>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="start"
                label="Start"
                required
                type="number"
                :rules="[rules.required, rules.positive]"
                hint="Start for beds: eg 1, 4">
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="end"
                label="End"
                required
                type="number"
                :rules="[rules.required, rules.positive]"
                hint="End for beds: eg 10, 50">
              </v-text-field>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click.native="close">Close</v-btn>
          <v-btn color="green darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="createBeds">Create</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import ward from '@/services/rpms/ward'

export default {
  props: ['display', 'ward'],

  data () {
    return {
      start: null,
      end: null,
      error: null,
      loading: false,
      rules: {
        required: (val) => !!val || 'Field is required',
        positive: (val) => (!!val && val > 0) || 'Numbers must be positive'
      }
    }
  },

  methods: {
    createBeds () {
      if (!this.$refs.form.validate()) return

      if (this.start >= this.end) {
        this.error = {
          message: 'Start must be always smaller than the end'
        }

        return
      }

      this.loading = true

      const self = this
      ward.createBeds(this.ward, this.start, this.end).then(beds => {
        self.loading = false
        self.$emit('bedsCreated', beds)
        self.$app.toast(`${self.end - self.start} beds created successfully`)
      })
      .catch(err => {
        self.loading = false
        self.error = err
      })
    },

    close () {
      this.clear()
      this.$emit('close')
    },

    clear () {
      this.$refs.form.reset()
      this.start = null
      this.end = null
      this.error = null
      this.loading = false
    }
  }
}
</script>
