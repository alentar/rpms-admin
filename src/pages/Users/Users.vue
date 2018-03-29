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
              <td>
                <v-tooltip bottom>
                  <span slot="activator">{{ props.item.name | shortname }}</span>
                  <span>{{ props.item.name }}</span>
                </v-tooltip>
              </td>
              <td class="text-xs-right">{{ props.item.nic }}</td>
              <td class="text-xs-right">{{ props.item.role | capitalizefirstletter }}</td>
              <td class="text-xs-right">{{ props.item.gender | capitalizefirstletter }}</td>
              <td class="text-xs-right">{{ props.item.createdAt | prettydate }}</td>
              <td class="justify-center layout px-0">
                <template v-if="user.id !== props.item.id">
                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator" @click="$router.push(`users/${props.item.id}`)">
                      <v-icon>account_circle</v-icon>
                    </v-btn>
                    <span>View Profile</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator" @click="updateUser(props.item)">
                      <v-icon color="cyan">edit</v-icon>
                    </v-btn>
                    <span>Edit User</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <v-btn icon class="mx-0" slot="activator" @click="deleteUser(props.item)">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                    <span>Delete User</span>
                  </v-tooltip>
                </template>
                <template v-else>
                  <v-btn flat class="mx-0" @click="$router.push('/profile')">
                    Profile
                  </v-btn>
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
            @click.native="createUserDialog = true"
          >
            <v-icon>add</v-icon>
          </v-btn>

        </v-flex>
      </v-layout>

      <app-user-delete-dialog
        v-if="userForDelete"
        :display="deleteUserDialog"
        @close="deleteUserDialog = false"
        :user="userForDelete"
        @delete="userDeleted">
      </app-user-delete-dialog>

      <app-user-edit-dialog
        v-if="userForEdit"
        :display="editUserDialog"
        @close="closeUpdateUserDialog"
        :user="userForEdit"
        @update="userUpdated">
      </app-user-edit-dialog>

      <app-user-create-dialog
        :display="createUserDialog"
        @close="createUserDialog = false"
        @userCreated="addUser">
      </app-user-create-dialog>

    </v-container>
</template>

<script>
import rpms from '@/services/rpms'
import CreateUserDialog from '@/components/Users/Dialogs/CreateUserDialog'
import DeleteUserDialog from '@/components/Users/Dialogs/DeleteUserDialog'
import EditUserDialog from '@/components/Users/Dialogs/EditUserDialog'

export default {
  components: {
    'app-user-create-dialog': CreateUserDialog,
    'app-user-delete-dialog': DeleteUserDialog,
    'app-user-edit-dialog': EditUserDialog
  },

  data () {
    return {
      deleteUserDialog: false,
      createUserDialog: false,
      editUserDialog: false,
      userForDelete: null,
      userForEdit: null,
      error: null,
      search: '',
      totalItems: 0,
      items: [],
      loading: true,
      pagination: {},
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'NIC', align: 'right', value: 'nic' },
        { text: 'Role', align: 'right', value: 'role' },
        { text: 'Gender', align: 'right', value: 'gender' },
        { text: 'Created At', align: 'right', value: 'createdAt' },
        { text: 'Actions', align: 'center', sortable: false, value: 'id' }
      ]
    }
  },

  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },

  watch: {
    pagination: {
      handler () {
        this.getUsers()
          .then(data => {
            this.items = data.users
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
    this.getUsers().then((data) => {
      self.items = data.users
      self.totalItems = data.total
    })
  },

  methods: {
    addUser (user) {
      this.items.push(user)
      this.items.sort((a, b) => {
        const A = new Date(a.createdAt)
        const B = new Date(b.createdAt)

        if (A < B) return 1
        if (A > B) return -1

        return 0
      })

      this.totalItems++
    },

    updateUser (user) {
      this.userForEdit = user
      this.editUserDialog = true
    },

    userUpdated (user) {
      const index = this.items.indexOf(this.items.find(item => item.id === user.id))
      this.items[index] = user
      this.closeUpdateUserDialog()
    },

    closeUpdateUserDialog () {
      this.userForEdit = null
      this.editUserDialog = false
    },

    deleteUser (user) {
      this.userForDelete = user
      this.deleteUserDialog = true
    },

    userDeleted (user) {
      this.items.splice(this.items.indexOf(user), 1)
      this.items = [...this.items]
      this.totalItems--
      this.userForDelete = null
      this.deleteUserDialog = false
    },

    async getUsers () {
      this.loading = true
      const self = this
      const { page, rowsPerPage, sortBy, descending } = this.pagination
      const options = {
        page: page,
        perPage: rowsPerPage,
        sortBy: sortBy,
        order: (descending === true ? 'desc' : 'asc')
      }
      return rpms.User.getUsers(options)
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
