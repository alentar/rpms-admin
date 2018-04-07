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
    state.notifications.unshift(payload)
  },

  [types.MARK_NOTIFICATION_AS_READ]: (state, payload) => {
    const i = state.notifications.findIndex((notification) => notification._id === payload._id)
    const elem = state.notifications[i]
    elem.read = payload.read
    state.notifications[i] = elem
  },

  [types.SET_NOTIFICATIONS]: (state, payload) => {
    state.notifications = payload
  },

  [types.INCREMENT_UNREAD_NOTIFICATIONS]: (state, payload = 1) => {
    state.unread += payload
  },

  [types.DECCREMENT_UNREAD_NOTIFICATIONS]: (state, payload = 1) => {
    state.unread -= payload
  },

  [types.SET_UNREAD]: (state, payload) => {
    state.unread = payload
  }
}
