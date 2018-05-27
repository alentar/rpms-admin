<template>
  <v-dialog
    v-model="model"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-toolbar card dark color="green darken-1">
        <v-btn icon dark @click.native="model = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title v-if="patient">Report for {{ patient.name | shortname }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right offset-y>
          <v-btn slot="activator" dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-menu>
      </v-toolbar>
      <v-card-text>
        <highcharts :options="bpmOptions" ref="bpmchart"></highcharts>
        <highcharts :options="tmpOptions" ref="tmpchart"></highcharts>
      </v-card-text>
      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</template>


<script>
import patient from '@/services/rpms/patient'
import Highcharts from 'highcharts'

export default {
  props: ['patient', 'display', 'device'],

  data () {
    return {
      fullPatient: this.patient,
      patientLoading: false,
      loadingRecords: false,
      bpm: {},
      temperature: [],
      bpmOptions: {
        chart: {
          type: 'spline',

          animation: Highcharts.svg
        },

        title: {
          text: 'BPM'
        },

        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150,
          maxZoom: 20 * 1000
        },

        yAxis: {
          title: {
            text: 'BPM'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        legend: {
          enabled: false
        },

        series: [{}]
      },

      tmpOptions: {
        chart: {
          type: 'spline',

          animation: Highcharts.svg
        },

        title: {
          text: 'Temperature'
        },

        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150,
          maxZoom: 20 * 1000
        },

        yAxis: {
          title: {
            text: 'Temperature'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },

        legend: {
          enabled: false
        },

        series: [{}]
      },

      bpmOpts: null
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

  watch: {
    display (value) {
      if (value) {
        this.connect()
      } else {
        this.disconnect()
      }
    },

    device (data) {
      this.connect()
    },

    patient (data) {
      this.connect()
    }
  },

  mounted () {
    this.connect()
  },

  destroyed () {
    this.disconnect()
  },

  methods: {

    async getPatient () {
      this.patientLoading = true
      const self = this
      return patient.getPatient(this.patient._id)
        .then(patient => {
          self.patientLoading = false
          return Promise.resolve(patient)
        })
        .catch(err => {
          self.patientLoading = false
          return Promise.reject(err)
        })
    },

    async getRecords (type) {
      this.loadingRecords = true
      const self = this
      return patient.getRecords(this.patient._id, type)
        .then(records => {
          self.loadingRecords = false
          return Promise.resolve(records)
        })
        .catch(err => {
          self.loadingRecords = false
          return Promise.reject(err)
        })
    },

    connect () {
      if (!this.patient || !this.device) return

      let data = []
      let time = (new Date()).getTime()
      let i

      for (i = -19; i <= 0; i += 1) {
        data.push({ x: time + i * 1000, y: 0})
      }
      const bpm = this.$refs.bpmchart.chart.series[0]
      const tmp = this.$refs.tmpchart.chart.series[0]
      bpm.setData(data)
      tmp.setData(data)

      this.$socket.emit('join', `wards/${this.ward}`)
      this.$options.sockets[`patient${this.patient._id}`] = (packet) => {
        const t = (new Date()).getTime()
        if (packet.type === 'bpm') {
          bpm.addPoint([t, Number(packet.value)], true, true)
        } else {
          tmp.addPoint([t, Number(packet.value)], true, true)
        }
      }
    },

    disconnect () {
      if (!this.patient || !this.device) return

      this.$socket.emit('leave', `wards/${this.ward}`)
      delete this.$options.sockets[`patient${this.patient._id}`]
    }
  }
}
</script>

<style>

</style>
