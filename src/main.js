// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store } from './store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'mdi/css/materialdesignicons.min.css'
import './styles/css/styles.css'
import rpms from './services/rpms'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

// filters
import ToUpperCase from './filters/touppercase'
import ShortName from './filters/shortname'
import CapitalizeFirstLetter from './filters/capitalizefirstletter'
import PrettyDate from './filters/prettydate'

// plugins
import AppPlugin from './plugins/app'

// initilize plugins
Vue.use(Vuetify)
Vue.use(AppPlugin, {store})

/* global SERVICE_URI */
Vue.use(VueSocketio, socketio(SERVICE_URI, {autoConnect: false}), store)

// filters
Vue.filter('touppercase', ToUpperCase)
Vue.filter('shortname', ShortName)
Vue.filter('capitalizefirstletter', CapitalizeFirstLetter)
Vue.filter('prettydate', PrettyDate)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.acl === undefined) {
    document.title = 'RPMS - ' + to.meta.title
    next()
  } else if (to.meta.acl !== undefined && (store.getters['user/acl'] > to.meta.acl)) {
    next('/')
  } else {
    document.title = 'RPMS - ' + to.meta.title
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    rpms.eventBus.on('signout', () => {
      store.dispatch('user/signOut', {root: true})
      router.push('/signin')
    })
  },

  mounted () {
    store.dispatch('user/autoSignIn', {root: true})
  }
})
