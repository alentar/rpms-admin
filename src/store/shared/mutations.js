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
    state.notifications.unshift(payload)
  },

  [types.PUSH_NOTIFICATIONS]: (state, payload) => {
    state.notifications.push(...payload)
  },

  [types.SOCKET_CONNECT]: (state, payload) => {
    state.connected = true
  },

  [types.SOCKET_DISCONNECT]: (state, payload) => {
    state.connected = false
  }
}
