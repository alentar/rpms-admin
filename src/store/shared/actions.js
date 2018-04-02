'use strict'

import * as types from './mutation-types'

export default {
  changeAppLayout ({commit}, layout) {
    commit(types.SET_LAYOUT, layout)
  },

  setLoading ({commit}, status) {
    commit(types.SET_LOADING, status)
  },

  showSnackbar ({commit}, snackbar) {
    commit(types.SET_SNACKBAR, snackbar)
  },

  pushNotification ({commit}, payload) {
    commit(types.PUSH_NOTIFICATION, payload)
  },

  pushNotifications ({commit}, payload) {
    commit(types.PUSH_NOTIFICATIONS, payload)
  },

  reset ({commit}) {
    commit(types.SET_LAYOUT, 'simple-layout')
    commit(types.SET_LOADING, false)
    commit(types.SET_SNACKBAR, null)
  }
}
