<template>
  <v-dialog v-model="model" max-width="500px" persistent>
    <v-card>
      <v-card-title class="headline">Realtime Patients Monitoring System</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <template v-if="action === 'attach'">
            <div class="subheading">Attach the device to a bed</div>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-subheader v-text="'Ward'"></v-subheader>
                </v-flex>
                <v-flex xs12 sm8>
                  <v-select
                    :items="wards"
                    item-text="name"
                    item-value="_id"
                    v-model="ward"
                    label="Ward"
                    return-object
                    autocomplete
                    :loading="loadingWards"
                    @input="getBeds"
                    :rules="[rules.required]"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-subheader v-text="'Bed'"></v-subheader>
                </v-flex>
                <v-flex xs12 sm8>
                  <v-select
                    :items="beds"
                    item-text="name"
                    item-value="_id"
                    v-model="bed"
                    label="Bed"
                    return-object
                    autocomplete
                    no-data-text="No beds found"
                    :loading="loadingBeds"
                    :disabled="ward === null"
                    :rules="[rules.required]"
                  ></v-select>
                </v-flex>
              </v-layout>
          </template>
          <template v-else>
            <div class="body-1 red--text">
              Do you want to detach the device from this bed ?
            </div>
          </template>
        </v-form>
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
import ward from '@/services/rpms/ward'

export default {
  props: [
    'display', 'device'
  ],

  data () {
    return {
      loading: false,
      ward: null,
      bed: null,
      wards: [],
      beds: [],
      loadingWards: false,
      loadingBeds: false,
      rules: {
        required: (val) => !!val || 'Field is required'
      }
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
      return (this.device.assigned === true ? 'detach' : 'attach')
    }
  },

  mounted () {
    this.getWards()
  },

  methods: {
    show () {
      console.log(this.ward)
    },

    takeAction () {
      if (!this.$refs.form.validate()) return

      if (this.action === 'detach') {
        this.ward = {}
        this.bed = {}
        this.ward._id = this.device.ward
        this.bed._id = this.device.bed
      }

      this.loading = true
      const self = this

      device.attachDevice(this.action === 'attach', this.device._id, this.ward._id, this.bed._id)
        .then((device) => {
          this.loading = false
          self.$app.toast(`Device ${self.action}ed successfully`)
          self.$emit('deviceAuthChanged', device)
          self.$emit('close')
        })
        .catch((err) => {
          this.loading = false
          alert(err.message)
        })
    },

    getWards () {
      const self = this
      this.loadingWards = true
      ward.getWards().then((res) => {
        self.wards = res.wards.map((ward) => {
          const obj = {
            name: `Ward ${ward.number} ${ward.name && ward.name.length > 0 ? `(${ward.name})` : ''}`,
            _id: ward._id
          }

          return obj
        })
        self.loadingWards = false
      })
      .catch(err => {
        self.loadingWards = false
        alert(err.message)
      })
    },

    getBeds () {
      if (this.ward === null || this.ward === undefined) return
      this.bed = null

      const self = this
      this.loadingBeds = true
      ward.getWard(self.ward._id).then((res) => {
        self.beds = res.beds
        .filter(bed => bed.device === null)
        .map((bed) => {
          const obj = {
            name: `Bed ${bed.number}`,
            _id: bed._id
          }

          return obj
        })
        self.loadingBeds = false
      })
      .catch(err => {
        self.loadingBeds = false
        alert(err.message)
      })
    }
  }
}
</script>
