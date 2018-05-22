<template>
  <v-dialog
    v-model="model"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-toolbar card dark color="green darken-1">
        <v-btn icon dark @click.native="model = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title v-if="patient">Report for {{ patient.name | shortname }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right offset-y>
          <v-btn slot="activator" dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-menu>
      </v-toolbar>
      <v-card-text>
        Details
      </v-card-text>
      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: ['patient', 'display'],

  computed: {
    model: {
      get: function () {
        return this.display
      },

      set: function (value) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style>

</style>
