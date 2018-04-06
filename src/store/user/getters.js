'use strict'

export default {
  user (state) {
    return state.user
  },

  isLoggedIn (state) {
    return state.user !== null && state.user !== undefined
  },

  notifications (state) {
    return state.user.notifications
  },

  unread (state) {
    return Number(state.user.unread)
  }
}
