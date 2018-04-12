<template>
  <v-container grid-list-md text-xs-center xs10>
    <v-progress-linear v-if="loading === true" :indeterminate="true"></v-progress-linear>
    <v-layout row wrap>
      <v-flex xs12 v-if="wards.length === 0 && loading === false">
        <div class="display-3">There are no wards here</div>
        <div class="display-1">Add some...</div>
      </v-flex>
      <v-flex xs3 v-for="ward in wards" :key="ward._id">
        <v-card dark color="light-blue accent-4" height="200px" class="text-xs-center">
          <v-card-text class="px-0">
            <div class="display-2">Ward</div>
            <div class="display-1">{{ ward.number }}</div>
            <div class="subheading">{{ ward.name }}</div>
            <div class="body-2">{{ getNumberOfBeds(ward) }} Beds</div>
            <v-btn color="green darken-1" icon><v-icon>visibility</v-icon></v-btn>
            <v-btn color="indigo darken-2" icon @click.native.stop="updateWard(ward)"><v-icon>mode_edit</v-icon></v-btn>
            <v-btn color="red darken-1" icon @click.native.stop="deleteWard(ward)"><v-icon>delete</v-icon></v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-btn
        color="pink"
        fab
        dark
        fixed
        bottom
        right
        style="bottom: 50px"
        medium
        @click="createWardDialog = true"
          >
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <app-ward-create-dialog
      :wards="wardNumbers"
      :display="createWardDialog"
      @close="createWardDialog = false"
      @wardCreated="wardCreated"
    >
    </app-ward-create-dialog>

    <app-ward-delete-dialog
      v-if="wardForDelete"
      :ward="wardForDelete"
      :display="deleteWardDialog"
      @close="deleteWardDialog = false"
      @deleted="wardDeleted"
    >
    </app-ward-delete-dialog>

    <app-ward-edit-dialog
      v-if="wardForEdit"
      :ward="wardForEdit"
      :wards="wardNumbers"
      :display="editWardDialog"
      @close="closeUpdateUserDialog"
      @wardUpdated="wardUpdated"
    >
    </app-ward-edit-dialog>
  </v-container>
</template>

<script>
import ward from '@/services/rpms/ward'
import CreateWardDialog from '@/components/Wards/Dialogs/CreateWardDialog'
import DeleteWardDialog from '@/components/Wards/Dialogs/DeleteWardDialog'
import EditWardDialog from '@/components/Wards/Dialogs/EditWardDialog'

export default {
  name: 'wards',

  components: {
    'app-ward-create-dialog': CreateWardDialog,
    'app-ward-delete-dialog': DeleteWardDialog,
    'app-ward-edit-dialog': EditWardDialog
  },

  data () {
    return {
      wards: [],
      createWardDialog: false,
      deleteWardDialog: false,
      editWardDialog: false,
      wardForEdit: null,
      wardForDelete: null,
      loading: false
    }
  },

  computed: {
    wardNumbers () {
      return this.wards.map(ward => ward.number)
    }
  },

  mounted () {
    this.getWards().then((wards) => {
      this.wards = wards
    })
  },

  methods: {
    async getWards () {
      this.loading = true
      return ward.getWards().then((res) => {
        this.loading = false
        return Promise.resolve(res.wards)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },

    wardCreated (ward) {
      this.createWardDialog = false
      this.wards.push(ward)
      this.wards.sort((a, b) => { return a.number - b.number })
    },

    deleteWard (ward) {
      this.wardForDelete = ward
      this.deleteWardDialog = true
    },

    wardDeleted (ward) {
      this.wards.splice(this.wards.indexOf(ward), 1)
      this.wards = [...this.wards]
      this.wardForDelete = null
      this.deleteWardDialog = false
    },

    updateWard (ward) {
      this.wardForEdit = ward
      this.editWardDialog = true
    },

    wardUpdated (ward) {
      const index = this.wards.indexOf(this.wards.find(item => item._id === ward._id))
      this.wards[index] = ward
      this.closeUpdateUserDialog()
    },

    closeUpdateUserDialog () {
      this.editWardDialog = false
      this.wardForEdit = null
    },

    getNumberOfBeds (ward) {
      let val = 0
      if (ward.beds) {
        if (Array.isArray(ward.beds)) val = ward.beds.length
        if (typeof ward.beds === 'number') val = ward.beds
      }

      return (val === 0 ? 'No' : val)
    }
  }
}
</script>
