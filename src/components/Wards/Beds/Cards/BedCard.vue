<template>
  <v-card>
    <v-card-media
      height="200px"
    >
      <v-container fill-height fluid>
        <v-layout justify-center align-center>
          <v-flex xs12 fill-height :class="background" justify-center align-center v-if="!device || !patient">
            <template v-if="!device">
              <span class="headline">{{'No Device was associated' | touppercase }}</span>
            </template>
            <template v-else-if="device && !patient">
              <span class="headline">{{'Admit a patient' | touppercase }}</span>
            </template>
          </v-flex>
            <template v-else>
              <v-container fluid grid-list-md fill-height class="blue lighten-5">
                <v-layout row wrap>
                  <v-flex xs6 d-flex>
                    <v-card dark color="primary" class="bpm">
                      <v-card-text class="text-xs-center data-layout">
                          <span class="display-2">{{ bpm ? bpm : 'N/A' }} <small class="subheading">bpm</small></span>
                        </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex xs6 d-flex>
                    <v-card dark color="primary" class="temperature">
                      <v-card-text class="text-xs-center data-layout">
                        <span v-if="temperature" class="display-2">{{ temperature }} <sup>°C</sup></span>
                        <span v-else class="display-2">N/A</span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </template>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-title primary-title>
      <div class="text-xs-left">
        <div class="headline">
          Bed {{ bed.number }}
        </div>
        <span class="gray--text" v-if="patient">{{ patient.name }}</span>
        <span class="gray--text" v-else>No patient</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn v-if="patient" class="red" dark>Discharge</v-btn>
      <v-btn v-else class="blue" dark @click="displayAdmitDialog = true">Admit</v-btn>
      <v-spacer></v-spacer>
      <template v-if="acl === 0">
        <v-btn icon>
          <v-icon color="red darken-2">mdi-delete-forever</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="green darken-2">mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-btn icon @click.native="show = !show">
        <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="show">
        <template v-if="patient">
          <v-card-title><h4>Patient Details</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>BHT:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ patient.bht }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Name:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ patient.name }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Age:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ patient.age }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Gender:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ patient.sex }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Admitted At:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ patient.admittedAt | prettydate }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="align-end">
                <v-list-tile-action>
                  <v-btn class="primary">Report...</v-btn>
                </v-list-tile-action>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </template>
      </v-card-text>
    </v-slide-y-transition>
    <app-admit-patient-dialog
      :display="displayAdmitDialog"
      @close="displayAdmitDialog = false"
    >
    </app-admit-patient-dialog>
  </v-card>
</template>

<script>
import AdmitPatientDialog from '../../../Patients/Dialogs/AdmitPatientDialog'

export default {
  props: ['patient', 'device', 'bed', 'ward'],

  data () {
    return {
      show: false,
      bpm: null,
      temperature: null,
      displayAdmitDialog: false
    }
  },

  components: {
    'app-admit-patient-dialog': AdmitPatientDialog
  },

  mounted () {
    if (!this.patient || !this.device) return

    const self = this
    this.$socket.emit('join', `wards/${this.ward}`)
    this.$options.sockets[`patient${this.patient._id}`] = (packet) => {
      self[packet.type] = packet.value
    }
  },

  destroyed () {
    if (!this.patient || !this.device) return

    this.$socket.emit('leave', `wards/${this.ward}`)
    delete this.$options.sockets[`patient${this.patient._id}`]
  },

  computed: {
    background () {
      if (!this.device) return 'pink lighten-2'

      return 'blue lighten-5'
    },

    acl () {
      return this.$store.getters['user/acl']
    }
  },

  methods: {

  }
}
</script>

<style>
  .data-layout {
    position: absolute;
    top: 35%;
    left: 45%;
    transform: translateX(-50%) translateY(-50%);
  }

  .bpm {
    background-image: url('/static/heart.gif');
    background-size: cover;
    background-position: center;
  }

  .temperature {
    background-image: url('/static/thermometer.png');
    background-size: contain;
    background-position: center;
  }
</style>
