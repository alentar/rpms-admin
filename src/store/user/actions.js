'use strict'

import * as types from './mutation-types'
import auth from '../../services/rpms/auth'

export default {
  signIn ({commit, dispatch}, payload) {
    commit('shared/SET_LOADING', true, {root: true})

    return auth
      .signIn(payload.nic, payload.password)
      .then(user => {
        commit('shared/SET_LOADING', false, {root: true})
        if (user.role !== 'admin') throw new Error('Unauthorized user')

        commit(types.SET_USER, user)
        dispatch('initializeSocketConnection')

        return Promise.resolve(user)
      }).catch(err => {
        commit('shared/SET_LOADING', false, {root: true})
        return Promise.reject(err)
      })
  },

  autoSignIn ({commit, dispatch}) {
    commit('shared/SET_LOADING', true, {root: true})
    return auth.autoSignIn()
      .then((user) => {
        commit('shared/SET_LOADING', false, {root: true})

        if (user.role !== 'admin') throw new Error('Unauthorized user')

        commit(types.SET_USER, user)
        commit('shared/SET_LAYOUT', 'app-layout', {root: true})
        dispatch('initializeSocketConnection')
        return Promise.resolve()
      })
      .catch(() => {
        commit('shared/SET_LOADING', false, {root: true})
        dispatch('signOut')
      })
  },

  signOut ({commit, dispatch}) {
    commit(types.UNSET_USER)
    dispatch('shared/reset', {}, {root: true})
    this._vm.$socket.close()
    auth.signOut(true)
  },

  initializeSocketConnection () {
    this._vm.$socket.io.opts.query = {
      token: auth.accessToken
    }
    this._vm.$socket.open()
  }
}
