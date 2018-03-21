<template>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
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
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.calories }}</td>
              <td class="text-xs-right">{{ props.item.fat }}</td>
              <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td class="text-xs-right">{{ props.item.protein }}</td>
              <td class="text-xs-right">{{ props.item.iron }}</td>
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
      <app-user-create-dialog :dialog="createUserDialog" @close="createUserDialog = false" @userCreated="logUser"></app-user-create-dialog>
    </v-container>
</template>

<script>
  import CreateUserDialog from '@/components/Users/Dialogs/CreateUserDialog'

  export default {
    components: {
      'app-user-create-dialog': CreateUserDialog
    },
    data () {
      return {
        fab: false,
        createUserDialog: false,
        search: '',
        totalItems: 0,
        items: [],
        loading: true,
        pagination: {},
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ]
      }
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi()
            .then(data => {
              this.items = data.items
              this.totalItems = data.total
            })
        },
        deep: true
      }
    },
    mounted () {
      this.getDataFromApi()
        .then(data => {
          this.items = data.items
          this.totalItems = data.total
        })
    },
    methods: {
      logUser (user) {
        console.log(user)
      },

      getDataFromApi () {
        this.loading = true
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination

          let items = this.getDesserts()
          const total = items.length

          if (this.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }

          setTimeout(() => {
            this.loading = false
            resolve({
              items,
              total
            })
          }, 1000)
        })
      },
      getDesserts () {
        return []
      }
    }
  }
</script>

<style scoped>

</style>
