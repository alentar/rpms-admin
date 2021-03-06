<template>
  <v-container grid-list-md text-xs-center xs10>
    <v-progress-linear v-if="loading === true" :indeterminate="true"></v-progress-linear>
    <v-layout row wrap>
      <v-flex xs12 v-if="ward && loading === false">
        <span class="title text-xs-left">
          <template v-if="ward.name">
            {{ ward.name }} - <span class="subheading">(Ward {{ ward.number }})</span>
          </template>
          <template v-else>
            Ward - {{ ward.number }}
          </template>
        </span>
      </v-flex>
      <v-flex xs12 v-if="beds.length === 0 && loading === false">
        <v-btn @click.native.stop="createBedDialog = true">Add a bed</v-btn>
      </v-flex>
      <v-flex xs4 v-for="bed in beds" :key="bed._id">
        <app-bed-card
          :bed="bed"
          :ward="id"
          :patient="bed.patient"
          :device="bed.device"
          @admit="admitPatient"
          @discharge="dischargePatient"
          @report="patientReport"
        ></app-bed-card>
      </v-flex>
        <v-speed-dial
          v-model="fab"
          dark
          fixed
          bottom
          right
          style="bottom: 50px"
        >
        <v-btn
          slot="activator"
          v-model="fab"
          color="pink darken-2"
          dark
          fab
        >
          <v-icon>mdi-bed-empty</v-icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-tooltip left>
          <v-btn
            fab
            dark
            small
            color="blue"
            slot="activator"
            @click.native="createBedDialog = true"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <span>Add a bed</span>
        </v-tooltip>

        <v-tooltip left>
          <v-btn
            fab
            dark
            small
            color="green"
            slot="activator"
            @click.native="createBedsDialog = true"
          >
            <v-icon>mdi-library-plus</v-icon>
          </v-btn>
            <span>Add beds to ward</span>
        </v-tooltip>
      </v-speed-dial>
    </v-layout>

    <app-bed-create-dialog
      :beds="bedNumbers"
      :display="createBedDialog"
      :ward="id"
      @close="createBedDialog = false"
      @bedCreated="bedCreated"
    ></app-bed-create-dialog>
    <app-beds-create-dialog
      :display="createBedsDialog"
      :ward="id"
      @close="createBedsDialog = false"
      @bedsCreated="bedsCreated"
    ></app-beds-create-dialog>
    <app-admit-patient-dialog
      :display="admitPatientDialog"
      :ward="id"
      :bed="bedForAdmit"
      @close="admitPatientDialog = false"
      @patientAdmitted="patientAdmitted"
    >
    </app-admit-patient-dialog>
    <app-discharge-patient-dialog
      :display="dischargePatientDialog"
      :bed="bedForDischarge"
      @close="dischargePatientDialog = false"
      @patientDischarged="patientDischarged"
    >
    </app-discharge-patient-dialog>
    <app-patient-report-dialog
      v-if="patientForReport"
      :patient="patientForReport"
      :device="patientDevice"
      :display="patientReportDialog"
      @close="patientReportDialog = false"
    >
    </app-patient-report-dialog>
  </v-container>
</template>

<script>
import ward from '@/services/rpms/ward'
import CreateBedDialog from '@/components/Wards/Beds/Dialogs/CreateBedDialog'
import CreateBedsDialog from '@/components/Wards/Beds/Dialogs/CreateBedsDialog'
import BedCard from '@/components/Wards/Beds/Cards/BedCard'
import AdmitPatientDialog from '../../components/Patients/Dialogs/AdmitPatientDialog'
import DischargePatientDialog from '../../components/Patients/Dialogs/DischargePatientDialog'
import PatientReportDialog from '../../components/Patients/Dialogs/PatientReportDialog'

export default {
  name: 'ward',

  props: ['id'],

  components: {
    'app-bed-create-dialog': CreateBedDialog,
    'app-beds-create-dialog': CreateBedsDialog,
    'app-bed-card': BedCard,
    'app-admit-patient-dialog': AdmitPatientDialog,
    'app-discharge-patient-dialog': DischargePatientDialog,
    'app-patient-report-dialog': PatientReportDialog
  },

  data () {
    return {
      beds: [],
      bedForAdmit: null,
      bedForDischarge: null,
      patientForReport: null,
      loading: false,
      fab: false,
      ward: null,
      createBedDialog: false,
      createBedsDialog: false,
      admitPatientDialog: false,
      dischargePatientDialog: false,
      patientReportDialog: false,
      patientDevice: null,
      show: false
    }
  },

  mounted () {
    const self = this
    this.getWard().then((ward) => {
      self.ward = ward
      self.beds = ward.beds
    })
  },

  computed: {
    bedNumbers () {
      return this.beds.map(bed => bed.number)
    }
  },

  methods: {
    async getWard () {
      this.loading = true
      return ward.getWard(this.id).then((res) => {
        this.loading = false
        return Promise.resolve(res)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },

    bedCreated (bed) {
      this.beds.push(bed)
      this.createBedDialog = false
    },

    bedsCreated (beds) {
      this.beds.push(...beds)
      this.createBedsDialog = false
    },

    admitPatient (bed) {
      this.bedForAdmit = bed
      this.admitPatientDialog = true
    },

    patientAdmitted (patient) {
      const index = this.beds.findIndex((bed) => bed._id === patient.bed)
      const newBed = Object.assign({}, this.beds[index], {
        patient: patient
      })
      this.$set(this.beds, index, newBed)
    },

    dischargePatient (bed) {
      this.bedForDischarge = bed
      this.dischargePatientDialog = true
    },

    patientDischarged (bed) {
      const index = this.beds.findIndex((item) => item._id === bed)
      const newBed = Object.assign({}, this.beds[index], {
        patient: null
      })
      this.$set(this.beds, index, newBed)
    },

    patientReport (data) {
      this.patientForReport = data.patient
      this.patientDevice = data.device
      this.patientReportDialog = true
    }
  }
}
</script>
