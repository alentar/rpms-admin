<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <div @click="$router.push('/wards')" class="back">
          <v-icon>navigate_before</v-icon>
          Wards 
        </div>
      </v-flex>
    </v-layout>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="primary"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
     <v-flex xs6 class="text-xs-center">
        <v-card>
          <v-card-text>
            <v-list-tile>
                <v-list-tile-content >
                  <v-list-tile-sub-title>{{ ward.beds.length !== 0 ? ward.beds.length : 'No' }} Beds found in the ward</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="bed in beds" :key="bed._id">
        <v-card dark color="light-blue accent-4" height="200px" class="text-xs-center">
          <v-card-text class="px-0">
            <div class="display-1">Bed {{ ward.bed.number}}</div>           
            <div class="subheading">{{ ward.bed.device }}</div>
            <div class="subheading">{{ ward.bed.patient }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
  </v-container>
</template>

<script>
import ward from '@/services/rpms/ward'
export default {
  props: ['id'],
  data () {
    return {
      user: null,
      loading: true,
      notfound: false
    }
  },
  mounted () {
    const self = this
    ward.getWard(this.id)
      .then((ward) => {
        self.ward = ward
        self.loading = false
      })
      .catch(() => {
        self.notfound = true
        self.loading = false
      })
  },
  methods: {
    async getWard (id) {
      this.loading = true
      return ward.getWard(id).then((ward) => {
        this.loading = false
        return Promise.resolve(ward)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }
  }
}
</script>

<style>
  .back {
    cursor: pointer;
  }
</style>
