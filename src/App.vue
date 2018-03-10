<template>
  <v-app>
    <component :is="layout"></component>
  </v-app>
</template>

<script>
import AppLayout from './layouts/AppLayout'
import SimpleLayout from './layouts/SimpleLayout'

export default {
  name: 'App',
  computed: {
    layout () {
      return this.$store.getters['shared/layout']
    }
  },
  components: {
    'simple-layout': SimpleLayout,
    'app-layout': AppLayout
  }
}
</script>
