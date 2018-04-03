<template>
  <v-dialog v-model="display" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <div class="headline">Device Information</div>
      </v-card-title>

      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Device ID:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ device._id }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>MAC Address:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ device.mac }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Chip ID:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ device.chipId || 'No information' }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Name:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ device.name || 'No information' }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Created At:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ device.createdAt | prettydate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Updated At:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ device.updatedAt | prettydate }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Status:</v-list-tile-content>
          <v-list-tile-content class="align-end">
            <v-chip :color="state(device).color" text-color="white">{{ state(device).state }}</v-chip>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" flat="flat" @click.native="close">Close</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['display', 'device'],

  methods: {
    close () {
      this.$emit('close')
    },

    state (device) {
      if (device.blacklisted === true) return {state: 'Blacklisted', color: 'red'}
      if (device.blacklisted === false && device.authorized === true && device.assigned === false) return {state: 'Authorized', color: 'blue'}
      if (device.blacklisted === false && device.authorized === false && device.assigned === false) return {state: 'Unauthorized', color: 'orange'}

      return {state: 'Assigned', color: 'green'}
    }
  }
}
</script>
