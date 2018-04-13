<template>
  <v-layout wrap>
    <div>
    <v-avatar
    :tile="false"
    :size="150"
    class="grey lighten-4"
    align-center
    >
    <img src="/static/user.png" alt="avatar">    
    </v-avatar>   
    <h4 class="title">{{Username}}
    <br>
    </h4>
    </div>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      Username: null
    }
  },
  mounted () {
    this.Username = this.$store.state.user.user.name
  }
}
</script>
<style>
.title {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding-top: 5px;
}
</style>
