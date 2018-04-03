<template>
    <v-container fluid>
      <v-layout row justify-center>
        <v-flex xs11>

          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            :pagination.sync="pagination"
            :total-items="totalItems"
            :loading="loading"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left"><b>{{ props.item.mac }}</b></td>
              <td class="text-xs-right">{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.chipId }}</td>
              <td class="text-xs-right">
                <v-chip :color="state(props.item).color" text-color="white">{{ state(props.item).state }}</v-chip>
              </td>
              <td class="text-xs-right">{{ props.item.createdAt | prettydate }}</td>
              <td class="justify-center layout px-0">
                <template>
                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator" @click="showViewDeviceDialog(props.item)">
                      <v-icon>zoom_in</v-icon>
                    </v-btn>
                    <span>View Device</span>
                  </v-tooltip>

                  <v-tooltip bottom v-if="props.item.authorized === false">
                    <v-btn
                      icon
                      class="mx-0"
                      slot="activator"
                      @click="showAuthorizeDeviceDialog(props.item)"
                      :disabled="props.item.blacklisted === true"
                    >
                      <v-icon color="blue">security</v-icon>
                    </v-btn>
                    <span>Authorize Device</span>
                  </v-tooltip>
                  <v-tooltip bottom v-else>
                    <v-btn
                      icon
                      class="mx-0"
                      slot="activator"
                      @click="showAuthorizeDeviceDialog(props.item)"
                      :disabled="props.item.blacklisted === true"
                    >
                      <v-icon color="red accent-2">clear</v-icon>
                    </v-btn>
                    <span>Unauthorize Device</span>
                  </v-tooltip>

                  <v-tooltip bottom v-if="props.item.blacklisted === false">
                    <v-btn icon class="mx-0" slot="activator" @click="showBlacklistDeviceDialog(props.item)">
                      <v-icon color="red accent-3">block</v-icon>
                    </v-btn>
                    <span>Blacklist Device</span>
                  </v-tooltip>
                  <v-tooltip bottom v-else>
                    <v-btn icon class="mx-0" slot="activator" @click="showBlacklistDeviceDialog(props.item)">
                      <v-icon color="indigo darken-1">add_circle</v-icon>
                    </v-btn>
                    <span>Whitelist Device</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator" @click="showEditDeviceDialog(props.item)">
                      <v-icon color="cyan">edit</v-icon>
                    </v-btn>
                    <span>Edit Device</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator" @click="showDeleteDeviceDialog(props.item)">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                    <span>Remove Device</span>
                  </v-tooltip>
                </template>
              </td>
            </template>
          </v-data-table>
        </v-flex>

        <app-edit-device-dialog
          v-if="deviceForEdit"
          :device="deviceForEdit"
          :display="editDeviceDialog"
          @close="closeEditDeviceDialog"
          @deviceUpdated="deviceUpdated"
        >
        </app-edit-device-dialog>

        <app-delete-device-dialog
          v-if="deviceForDelete"
          :device="deviceForDelete"
          :display="deleteDeviceDialog"
          @close="closeDeleteDeviceDialog"
          @deviceDeleted="deviceDeleted"
        >
        </app-delete-device-dialog>

        <app-authorize-device-dialog
          v-if="deviceForAuthorize"
          :device="deviceForAuthorize"
          :display="authorizeDeviceDialog"
          @close="closeAuthorizeDeviceDialog"
          @deviceAuthChanged="deviceAuthChanged"
        >
        </app-authorize-device-dialog>

        <app-blacklist-device-dialog
          v-if="deviceForBlacklist"
          :device="deviceForBlacklist"
          :display="blacklistDeviceDialog"
          @close="closeBlacklistDeviceDialog"
          @deviceStateChanged="deviceStateChanged"
        >
        </app-blacklist-device-dialog>

        <app-view-device-dialog
          v-if="deviceForView"
          :device="deviceForView"
          :display="viewDeviceDialog"
          @close="closeViewDeviceDialog"
        >
        </app-view-device-dialog>
      </v-layout>
    </v-container>
</template>

<script>
import device from '@/services/rpms/device'
import EditDeviceDialog from '@/components/Devices/Dialogs/EditDeviceDialog'
import DeleteDeviceDialog from '@/components/Devices/Dialogs/DeleteDeviceDialog'
import AuthorizeDeviceDialog from '@/components/Devices/Dialogs/AuthorizeDeviceDialog'
import BlacklistDeviceDialog from '@/components/Devices/Dialogs/BlacklistDeviceDialog'
import ViewDeviceDialog from '@/components/Devices/Dialogs/ViewDeviceDialog'

export default {
  data () {
    return {
      viewDeviceDialog: false,
      deviceForView: null,

      blacklistDeviceDialog: false,
      deviceForBlacklist: null,

      authorizeDeviceDialog: false,
      deviceForAuthorize: null,

      deviceForDelete: null,
      deleteDeviceDialog: false,

      deviceForEdit: null,
      editDeviceDialog: false,

      error: null,
      search: '',
      totalItems: 0,
      items: [],
      loading: true,
      pagination: {},
      headers: [
        { text: 'Mac', align: 'left', sortable: false, value: 'mac' },
        { text: 'Name', align: 'right', sortable: false, value: 'name' },
        { text: 'Chip ID', align: 'right', sortable: false, value: 'chipId' },
        { text: 'Status', align: 'right', sortable: true, value: 'status' },
        { text: 'Created At', align: 'right', sortable: false, value: 'createdAt' },
        { text: 'Actions', align: 'center', sortable: false, value: 'actions' }
      ]
    }
  },

  components: {
    'app-edit-device-dialog': EditDeviceDialog,
    'app-delete-device-dialog': DeleteDeviceDialog,
    'app-authorize-device-dialog': AuthorizeDeviceDialog,
    'app-blacklist-device-dialog': BlacklistDeviceDialog,
    'app-view-device-dialog': ViewDeviceDialog
  },

  computed: {

  },

  watch: {
    pagination: {
      handler () {
        this.getDevices()
          .then(data => {
            this.items = data.devices
            this.totalItems = data.total
          })
      },
      deep: true
    }
  },

  mounted () {
    const self = this
    this.pagination.rowsPerPage = 10
    this.pagination.sortBy = 'createdAt'
    this.pagination.descending = true
    this.getDevices().then((data) => {
      self.items = data.devices
      self.totalItems = data.total
    })
  },

  methods: {
    // Methods for view device
    closeViewDeviceDialog () {
      this.viewDeviceDialog = false
      this.deviceForView = null
    },

    showViewDeviceDialog (device) {
      this.viewDeviceDialog = true
      this.deviceForView = device
    },
    // End methods

    // Methods for authorize device
    closeBlacklistDeviceDialog () {
      this.blacklistDeviceDialog = false
      this.deviceForBlacklist = null
    },

    showBlacklistDeviceDialog (device) {
      this.blacklistDeviceDialog = true
      this.deviceForBlacklist = device
    },

    deviceStateChanged (device) {
      this.updateDevice(device)
      this.closeBlacklistDeviceDialog()
    },
    // End methods

    // Methods for authorize device
    closeAuthorizeDeviceDialog () {
      this.authorizeDeviceDialog = false
      this.deviceForAuthorize = null
    },

    showAuthorizeDeviceDialog (device) {
      this.authorizeDeviceDialog = true
      this.deviceForAuthorize = device
    },

    deviceAuthChanged (device) {
      this.updateDevice(device)
      this.closeAuthorizeDeviceDialog()
    },
    // End methods

    // Methods for Deleting device
    showDeleteDeviceDialog (device) {
      this.deviceForDelete = device
      this.deleteDeviceDialog = true
    },

    closeDeleteDeviceDialog () {
      this.deviceForDelete = null
      this.deleteDeviceDialog = false
    },

    deviceDeleted () {
      this.totalItems--
      this.closeDeleteDeviceDialog()
    },
    // End methods

    // Methods for editing devices
    showEditDeviceDialog (device) {
      this.deviceForEdit = device
      this.editDeviceDialog = true
    },

    closeEditDeviceDialog () {
      this.deviceForEdit = null
      this.editDeviceDialog = false
    },

    deviceUpdated (device) {
      this.updateDevice(device)
      this.closeEditDeviceDialog()
    },
    // End methods

    updateDevice (device) {
      const index = this.items.indexOf(this.items.find(item => item._id === device._id))
      this.items[index] = device
    },

    state (device) {
      if (device.blacklisted === true) return {state: 'Blacklisted', color: 'red'}
      if (device.blacklisted === false && device.authorized === true && device.assigned === false) return {state: 'Authorized', color: 'blue'}
      if (device.blacklisted === false && device.authorized === false && device.assigned === false) return {state: 'Unauthorized', color: 'orange'}

      return {state: 'Assigned', color: 'green'}
    },

    async getDevices () {
      this.loading = true
      const self = this
      const { page, rowsPerPage, sortBy, descending } = this.pagination
      const options = {
        page: page,
        perPage: rowsPerPage,
        sortBy: sortBy,
        order: (descending === true ? 'desc' : 'asc')
      }
      return device.getDevices(options)
        .then((data) => {
          self.loading = false
          return Promise.resolve(data)
        })
        .catch((err) => {
          self.error = err
        })
    }
  }
}
</script>
