<template>
  <v-dialog
    v-model="model"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-toolbar card dark color="primary">
        <v-btn icon dark @click.native="model = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Admit a Patient</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="admit" :loading="loading" :disabled="loading">Admit</v-btn>
        </v-toolbar-items>
        <v-menu bottom right offset-y>
          <v-btn slot="activator" dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-menu>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
        <v-list three-line subheader>
          <v-flex xs12 v-if="error">
            <v-alert dismissible type="error" v-model="error">{{ error.message | capitalizefirstletter }}</v-alert>
          </v-flex>
          <v-subheader>General</v-subheader>
          <v-list-tile-content>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs4>
                  <v-text-field label="BHT" hint="BHT for patient" v-model="bht" :rules="[rules.required, rules.bht]" required></v-text-field>
                </v-flex>
                <v-flex xs4 >
                  <v-text-field label="Name" hint="Name of patient" v-model="name" :rules="[rules.required, rules.name]" required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="NIC" v-model="nic"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Age" hint="Age of patient" v-model="age" :rules="[rules.required]" required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    v-model="menu"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                    >
                    <v-text-field
                      slot="activator"
                      v-model="dob"
                      label="Birthday date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      ref="picker"
                      v-model="dob"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Gender" v-model="sex" :rules="[rules.required]" required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Religion" v-model="religion"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Nationality" v-model="nationality"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Occupation" v-model="occupation"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Martial Status" v-model="martialStatus"></v-text-field>
                </v-flex>
                <v-flex xs8>
                  <v-select
                  label="Contacts"
                  chips
                  tags
                  prepend-icon="contacts"
                  clearable
                  v-model="telephones"
                  hint="Enter contacts numbers"
                  mask="phone"
                  :rules="[rules.contacts]"
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      close
                      @input="remove(data.item)"
                      :selected="data.selected"
                    >
                      <v-icon>phone</v-icon>
                      <strong>{{ data.item }}</strong>
                    </v-chip>
                  </template>
                </v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-list-tile-content>
          <v-divider></v-divider>

          <v-subheader>Clinical</v-subheader>
          <v-list-tile-content>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="typeOfAdmission"
                    label="Type Of Admission"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="examination"
                    label="Examination"
                    multi-line
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="invistigation"
                    label="Invistigation"
                    multi-line
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="treatment"
                    label="Treatment"
                    multi-line
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="reason"
                    label="Reason"
                    multi-line
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="clinicalNotes"
                    label="Clinical Notes"
                    multi-line
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="extra"
                    label="Extra"
                    multi-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-list-tile-content>
        </v-list>
        </v-form>
      </v-card-text>
      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</template>

<script>
import patient from '@/services/rpms/patient'
import _ from 'lodash'

export default {
  props: [
    'display', 'ward', 'bed'
  ],

  data () {
    return {
      loading: false,
      menu: false,
      dob: '',
      age: '',
      telephones: [],
      nationality: '',
      religion: '',
      occupation: '',
      martialStatus: '',
      sex: '',
      clinicalNotes: '',
      examination: '',
      invistigation: '',
      treatment: '',
      reason: '',
      typeOfAdmission: '',
      bht: '',
      nic: '',
      extra: '',
      name: '',

      rules: {
        required: (val) => !!val || 'Field is required',
        bht: (val) => {
          if (val && val.length >= 7) return true
          else return 'BHT should atleast have minimum number of 7 characters'
        },
        contacts: () => this.telephones.length <= 5 || 'Max allowed 5 contacts',
        name: v => (v && v.length <= 150) || 'Name must be less than 150 characters'
      },
      error: null
    }
  },

  computed: {
    model: {
      get: function () {
        return this.display
      },

      set: function (value) {
        this.close()
      }
    },

    user () {
      return this.$store.getters['user/user']._id
    }
  },

  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },

  methods: {
    save (date) {
      this.$refs.menu.save(date)
      const age = new Date(Date.now() - new Date(date))
      this.age = Math.abs(age.getUTCFullYear() - 1970)
    },

    admit () {
      if (!this.$refs.form.validate()) return

      this.loading = false

      const obj = {
        dob: this.dob,
        age: this.age,
        nationality: this.nationality,
        religion: this.religion,
        occupation: this.occupation,
        martialStatus: this.martialStatus,
        sex: this.sex,
        clinicalNotes: this.clinicalNotes,
        examination: this.examination,
        invistigation: this.invistigation,
        treatment: this.treatment,
        reason: this.reason,
        typeOfAdmission: this.typeOfAdmission,
        bht: this.bht,
        nic: this.nic,
        extra: this.extra,
        name: this.name,
        ward: this.ward,
        bed: this.bed
      }

      if (this.telephones.length > 0) obj.telephones = this.telephones
      const payload = _.pickBy(obj, _.identity)

      patient.admitPatient(payload)
        .then((patient) => {
          this.$emit('patientAdmitted', patient)
          this.close()
        })
        .catch((err) => {
          this.error = err
          this.loading = false
        })
    },

    // remove contact from contacts
    remove (item) {
      this.telephones.splice(this.telephones.indexOf(item), 1)
      this.telephones = [...this.telephones]
    },

    close () {
      this.$refs.form.reset()

      this.loading = false
      this.menu = false
      this.dob = ''
      this.age = ''
      this.telephones = []
      this.nationality = ''
      this.religion = ''
      this.occupation = ''
      this.martialStatus = ''
      this.sex = ''
      this.clinicalNotes = ''
      this.examination = ''
      this.invistigation = ''
      this.treatment = ''
      this.reason = ''
      this.typeOfAdmission = ''
      this.bht = ''
      this.nic = ''
      this.extra = ''
      this.name = ''
      this.error = null

      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
