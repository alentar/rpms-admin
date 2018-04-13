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
              <td class="text-xs-left">
                <v-tooltip bottom>
                  <span slot="activator">{{ props.item.name | shortname }}</span>
                  <span>{{ props.item.name }}</span>
                </v-tooltip>
              </td>
              <td class="text-xs-right">{{ props.item.bht }}</td>
              <td class="text-xs-right">{{ props.item.nic | capitalizefirstletter }}</td>
              <td class="text-xs-right">{{ props.item.sex | capitalizefirstletter }}</td>
              <td class="text-xs-right">{{ props.item.age }}</td>
              <td class="text-xs-right">Ward {{ props.item.ward.number || '' }} <span v-if="props.item.ward.name">({{ props.item.ward.name | capitalizefirstletter }})</span></td>
              <td class="text-xs-right">{{ props.item.admittedAt | prettydate }}</td>
              <td class="justify-center layout px-0">
                <template>
                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator">
                      <v-icon>account_circle</v-icon>
                    </v-btn>
                    <span>View Patient</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator">
                      <v-icon color="cyan">edit</v-icon>
                    </v-btn>
                    <span>Edit Patient</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                    <span>Delete Patient</span>
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
import patient from '@/services/rpms/patient'

export default {
  components: {
  },

  data () {
    return {
      userForEdit: null,
      error: null,
      search: '',
      totalItems: 0,
      items: [],
      loading: true,
      pagination: {},
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'BHT', align: 'right', value: 'bht' },
        { text: 'NIC', align: 'right', value: 'nic' },
        { text: 'Sex', align: 'right', value: 'sex' },
        { text: 'Age', align: 'right', value: 'age' },
        { text: 'Ward', align: 'right', value: 'ward' },
        { text: 'Admitted At', align: 'right', value: 'admittedAt' },
        { text: 'Actions', align: 'center', sortable: false, value: 'id' }
      ]
    }
  },

  watch: {
    pagination: {
      handler () {
        this.getPatients()
          .then(data => {
            this.items = data.patients
            this.totalItems = data.total
          })
      },
      deep: true
    }
  },

  mounted () {
    const self = this
    this.pagination.rowsPerPage = 10
    this.pagination.sortBy = 'admittedAt'
    this.pagination.descending = true
    this.getPatients().then((data) => {
      self.items = data.patients
      self.totalItems = data.total
    })
  },

  methods: {
    async getPatients () {
      this.loading = true
      const self = this
      const { page, rowsPerPage, sortBy, descending } = this.pagination
      const options = {
        page: page,
        perPage: rowsPerPage,
        sortBy: sortBy,
        order: (descending === true ? 'desc' : 'asc')
      }
      return patient.getPatients(options)
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
