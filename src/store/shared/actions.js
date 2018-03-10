'use strict'

import * as types from './mutation-types'

export default {
  changeAppLayout ({commit}, layout) {
    commit(types.SET_LAYOUT, layout)
  },

  setLoading ({commit}, status) {
    commit(types.SET_LOADING, status)
  }
}
