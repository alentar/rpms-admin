'use strict'

import * as types from './mutation-types'

export default {
  [types.SET_LAYOUT]: (state, payload) => {
    state.layout = payload
  },

  [types.SET_LOADING]: (state, payload) => {
    state.loading = payload
  }
}
