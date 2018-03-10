import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Authentication/Signin'
import Dashboard from '@/components/Dashboard/Dashboard'
import AuthGuard from './guards/auth'
import GuestGuard from './guards/guest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Dashboard'
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      beforeEnter: GuestGuard,
      meta: {
        title: 'Signin'
      }
    }
  ],
  mode: 'history'
})
