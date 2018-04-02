<template>
  <v-dialog v-model="display" persistent max-width="700px">
    <v-card>
      <v-card-title>
        <div class="headline">Create a new ward</div>
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
                :rules="[rules.required, rules.freeward]"
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
          <v-btn color="green darken-1" flat="flat" :loading="loading" :disabled="loading" @click.native="createWard">Create</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import ward from '@/services/rpms/ward'

export default {
  props: ['display', 'wards'],

  data () {
    return {
      number: null,
      name: '',
      error: null,
      loading: false,
      rules: {
        required: (val) => !!val || 'Field is required',
        freeward: (val) => ((val && !this.wards.includes(parseInt(val)))) || 'Ward already exists'
      }
    }
  },

  watch: {
    display (val) {
      if (val === true) this.autoSelect()
    }
  },

  methods: {
    createWard () {
      if (!this.$refs.form.validate()) return

      this.loading = true
      const payload = {
        number: this.number
      }

      if (this.name && this.name.trim().length > 0) payload.name = this.name.trim()

      const self = this
      ward.createWard(payload).then(ward => {
        self.loading = false
        self.$emit('wardCreated', ward)
        self.$app.toast('Ward created successfully')
      })
      .catch(err => {
        self.loading = false
        self.error = err
      })
    },

    autoSelect () {
      if (this.wards.length > 0) {
        this.number = Math.max(...this.wards) + 1
        this.name = 'Ward ' + this.number
      }
    },

    close () {
      this.clear()
      this.$emit('close')
    },

    clear () {
      this.$refs.form.reset()
      this.number = null
      this.name = null
      this.error = null
      this.loading = false
    }
  }
}
</script>
