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

  reset ({commit}) {
    commit(types.SET_LAYOUT, 'simple-layout')
    commit(types.SET_LOADING, false)
    commit(types.SET_SNACKBAR, null)
  }
}
