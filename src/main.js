// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store } from './store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './styles/css/styles.css'
import rpms from './services/rpms'

// filters
import ToUpperCase from './filters/touppercase'

Vue.use(Vuetify)
Vue.filter('touppercase', ToUpperCase)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = 'RPMS - ' + to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    rpms.AuthService.notifier.on('signout', () => {
      store.dispatch('user/signOut', {root: true})
      router.push('/signin')
    })

    store.dispatch('user/autoSignIn', {root: true})
  }
})
