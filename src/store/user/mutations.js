'use strict'

import * as types from './mutation-types'

export default {
  [types.SET_USER]: (state, payload) => {
    state.user = payload
  },

  [types.UNSET_USER]: (state, payload) => {
    state.user = null
  }
}
