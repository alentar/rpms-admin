'use strict'

import * as types from './mutation-types'

export default {
  [types.SET_USER]: (state, payload) => {
    state.user = payload
  },

  [types.UNSET_USER]: (state, payload) => {
    state.user = null
  },

  [types.PUSH_NOTIFICATION]: (state, payload) => {
    state.user.notifications.unshift(payload)
  },

  [types.INCREMENT_UNREAD_NOTIFICATIONS]: (state, payload = 1) => {
    state.user.unread = Number(state.user.unread) + payload
  },

  [types.DECCREMENT_UNREAD_NOTIFICATIONS]: (state, payload = 1) => {
    state.user.unread = Math.max(0, Number(state.user.unread) - payload)
  }
}
