'use strict'

import * as types from './mutation-types'

export default {
  [types.SET_LAYOUT]: (state, payload) => {
    state.layout = payload
  },

  [types.SET_LOADING]: (state, payload) => {
    state.loading = payload
  },

  [types.SET_SNACKBAR]: (state, payload) => {
    state.snackbar = payload
  },

  [types.PUSH_NOTIFICATION]: (state, payload) => {
    state.notifications.push(payload)
  },

  [types.PUSH_NOTIFICATIONS]: (state, payload) => {
    state.notifications.push(...payload)
  }
}
