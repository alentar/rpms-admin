'use strict'

export default {
  user (state) {
    return state.user
  },

  isLoggedIn (state) {
    return state.user !== null && state.user !== undefined
  },

  notifications (state) {
    return state.notifications
  },

  unread (state) {
    return Number(state.unread)
  },

  role (state) {
    return state.user.role
  },

  acl (state) {
    return ['admin', 'doctor', 'nurse'].indexOf(state.user.role)
  }
}
