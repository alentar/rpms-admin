'use strict'

export default {
  layout (state) {
    return state.layout
  },

  loading (state) {
    return state.loading === true
  },

  snackbar (state) {
    return state.snackbar
  },

  notifications (state) {
    return state.notifications
  }
}
