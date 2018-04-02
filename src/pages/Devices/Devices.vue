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
              <td class="text-xs-right">{{ props.item.chipId }}</td>
              <td class="text-xs-right">{{ state(props.item) }}</td>
              <td class="text-xs-right">{{ props.item.createdAt | prettydate }}</td>
              <td class="justify-center layout px-0">
                <template>
                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator" @click="$router.push(`devices/${props.item.id}`)">
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <span>View Device</span>
                  </v-tooltip>

                  <v-tooltip bottom v-if="props.item.authorized === false">
                    <v-btn icon class="mx-0" slot="activator" @click="alert()">
                      <v-icon color="blue">security</v-icon>
                    </v-btn>
                    <span>Authorize Device</span>
                  </v-tooltip>
                  <v-tooltip bottom v-else>
                    <v-btn icon class="mx-0" slot="activator" @click="alert()">
                      <v-icon color="red accent-2">clear</v-icon>
                    </v-btn>
                    <span>Unauthorize Device</span>
                  </v-tooltip>

                  <v-tooltip bottom v-if="props.item.blacklisted === false">
                    <v-btn icon class="mx-0" slot="activator" @click="alert()">
                      <v-icon color="red accent-3">block</v-icon>
                    </v-btn>
                    <span>Blacklist Device</span>
                  </v-tooltip>
                  <v-tooltip bottom v-else>
                    <v-btn icon class="mx-0" slot="activator" @click="alert()">
                      <v-icon color="indigo darken-1">add_circle</v-icon>
                    </v-btn>
                    <span>Whitelist Device</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator" @click="alert()">
                      <v-icon color="cyan">edit</v-icon>
                    </v-btn>
                    <span>Edit Device</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator" @click="alert()">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                    <span>Remove Device</span>
                  </v-tooltip>
                </template>
              </td>
            </template>
          </v-data-table>

          <v-btn
            color="pink"
            fab
            dark
            fixed
            bottom
            right
            style="bottom: 50px"
          >
            <v-icon>add</v-icon>
          </v-btn>

        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import device from '@/services/rpms/device'

export default {
  data () {
    return {
      error: null,
      search: '',
      totalItems: 0,
      items: [],
      loading: true,
      pagination: {},
      headers: [
        { text: 'Mac', align: 'left', sortable: false, value: 'name' },
        { text: 'Chip ID', align: 'right', sortable: false, value: 'nic' },
        { text: 'Status', align: 'right', sortable: false, value: 'role' },
        { text: 'Created At', align: 'right', sortable: true, value: 'createdAt' },
        { text: 'Actions', align: 'center', sortable: false, value: 'id' }
      ]
    }
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
    state (device) {
      if (device.blacklisted === true) return 'Blacklisted'
      if (device.blacklisted === false && device.authorized === true && device.assigned === false) return 'Authorized'
      if (device.blacklisted === false && device.authorized === false && device.assigned === false) return 'Unauthorized'

      return 'Assigned'
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

<style scoped>

</style>
