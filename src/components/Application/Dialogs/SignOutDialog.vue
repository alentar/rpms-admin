<template>
  <v-dialog v-model="display" max-width="400">
    <v-card>
      <v-card-title class="headline">Realtime Patients Monitoring System</v-card-title>
      <v-card-text>Are you sure do you want to sign out ?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="$emit('cancel')">Cancel</v-btn>
        <v-btn color="red darken-1" flat="flat" @click.native="signOut">Signout</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['display'],
  methods: {
    signOut () {
      this.$store.dispatch('user/signOut')
      this.$router.push('/signin')
    }
  }
}
</script>
