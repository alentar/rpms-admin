<template>
  <v-dialog v-model="display" persistent max-width="700px">
    <v-card>
      <v-card-title>
        <div class="headline">Create a new bed</div>
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
                label="Bed number"
                persistent-hint
                required
                type="number"
                :rules="[rules.required, rules.freeward]"
                hint="Ward number eg: 3, 5">
              </v-text-field>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click.native="close">Close</v-btn>
          <v-btn color="green darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="createBed">Create</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import ward from '@/services/rpms/ward'

export default {
  props: ['display', 'beds', 'ward'],

  data () {
    return {
      number: null,
      error: null,
      loading: false,
      rules: {
        required: (val) => !!val || 'Field is required',
        freeward: (val) => ((val && !this.beds.includes(parseInt(val)))) || 'Bed already exists'
      }
    }
  },

  watch: {
    display (val) {
      if (val === true) this.autoSelect()
    }
  },

  methods: {
    createBed () {
      if (!this.$refs.form.validate()) return

      this.loading = true
      const payload = {
        number: this.number
      }

      const self = this
      ward.createBed(this.ward, payload).then(bed => {
        self.loading = false
        self.$emit('bedCreated', bed)
        self.$app.toast('Bed created successfully')
      })
      .catch(err => {
        self.loading = false
        self.error = err
      })
    },

    autoSelect () {
      if (this.beds.length > 0) {
        this.number = Math.max(...this.beds) + 1
      }
    },

    close () {
      this.clear()
      this.$emit('close')
    },

    clear () {
      this.$refs.form.reset()
      this.number = null
      this.error = null
      this.loading = false
    }
  }
}
</script>
