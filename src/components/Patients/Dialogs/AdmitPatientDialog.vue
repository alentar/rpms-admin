<template>
  <v-dialog
    v-model="model"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-toolbar card dark color="primary">
        <v-btn icon dark @click.native="model = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Admit a Patient</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
        </v-toolbar-items>
        <v-menu bottom right offset-y>
          <v-btn slot="activator" dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-menu>
      </v-toolbar>
      <v-card-text>
        <v-list three-line subheader>
          <v-subheader>Basic Information</v-subheader>
          <v-list-tile-content>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs4>
                  <v-text-field label="Legal first name" required></v-text-field>
                </v-flex>
                <v-flex xs4 >
                  <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    label="Legal last name"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-list-tile-content>
        </v-list>
      </v-card-text>
      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [
    'display'
  ],

  data () {
    return {
      loading: false
    }
  },

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
