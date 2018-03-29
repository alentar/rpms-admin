<template>
  <v-container grid-list-md text-xs-center xs10>
    <v-layout row wrap>
      <v-flex xs3 v-for="i in 36" :key="`3${i}`">
        <v-card dark color="secondary" height="200px" class="text-xs-center">
          <v-card-text class="px-0">
            <div class="display-2">Ward</div>
            <div class="display-1">{{ i }}</div>
            <div class="subheading">Ward Name</div>
            <div class="body-2">Total beds</div>
            <v-btn primary dark @click="">View</v-btn>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import rpms from '@/services/rpms'

export default {
  name: 'wards',

  data () {
    return {
      wards: []
    }
  },

  methods: {
    getWards () {

    }
  }
}
</script>
