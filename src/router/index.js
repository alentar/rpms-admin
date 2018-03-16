import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Signin from '@/pages/Authentication/Signin'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Users from '@/pages/Users/Users'
import Devices from '@/pages/Devices/Devices'
import Feedback from '@/pages/Feedback/Feedback'
import Help from '@/pages/Help/Help'
import Patients from '@/pages/Patients/Patients'
import Settings from '@/pages/Settings/Settings'
import Wards from '@/pages/Wards/Wards'
import Profile from '@/pages/Profile/Profile'

// Guards
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
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Users'
      }
    },
    {
      path: '/wards',
      name: 'Wards',
      component: Wards,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Wards'
      }
    },
    {
      path: '/devices',
      name: 'Devices',
      component: Devices,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Devices'
      }
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Feedback'
      }
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Help'
      }
    },
    {
      path: '/patients',
      name: 'Patients',
      component: Patients,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Patients'
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Settings'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard,
      meta: {
        title: 'Profile'
      }
    }
  ],
  mode: 'history'
})
