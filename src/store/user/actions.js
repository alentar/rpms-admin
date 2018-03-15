'use strict'

import * as types from './mutation-types'
import rpms from '../../services/rpms'

export default {
  signIn ({commit}, payload) {
    commit('shared/SET_LOADING', true, {root: true})
    return rpms.AuthService
      .signIn(payload.nic, payload.password)
      .then(user => {
        commit('shared/SET_LOADING', false, {root: true})
        if (user.role !== 'admin') throw new Error('Unauthorized user')

        commit(types.SET_USER, user)
        return Promise.resolve(user)
      }).catch(err => {
        commit('shared/SET_LOADING', false, {root: true})
        return Promise.reject(err)
      })
  },

  autoSignIn ({commit}, payload) {
    commit(types.SET_USER, payload)
    commit('shared/SET_LAYOUT', 'app-layout', {root: true})
  }
}
