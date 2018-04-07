'use strict'

import * as types from './mutation-types'
import auth from '../../services/rpms/auth'
import user from '../../services/rpms/user'

export default {
  signIn ({commit, dispatch}, payload) {
    commit('shared/SET_LOADING', true, {root: true})

    return auth
      .signIn(payload.nic, payload.password)
      .then(user => {
        commit('shared/SET_LOADING', false, {root: true})
        if (user.role !== 'admin') throw new Error('Unauthorized user')

        dispatch('initializeSocketConnection')
        dispatch('initalize', user)

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

        dispatch('initializeSocketConnection')
        dispatch('initalize', user)
        commit('shared/SET_LAYOUT', 'app-layout', {root: true})

        return Promise.resolve()
      })
      .catch(() => {
        commit('shared/SET_LOADING', false, {root: true})
        dispatch('signOut')
      })
  },

  signOut ({commit, dispatch}) {
    commit(types.UNSET_USER)
    commit(types.SET_UNREAD, 0)
    commit(types.SET_NOTIFICATIONS, [])
    dispatch('shared/reset', {}, {root: true})
    this._vm.$socket.close()
    auth.signOut(true)
  },

  initalize ({commit}, user) {
    commit(types.SET_USER, user)
    commit(types.SET_UNREAD, user.unread)
    commit(types.SET_NOTIFICATIONS, user.notifications)
  },

  initializeSocketConnection () {
    this._vm.$socket.io.opts.query = {
      token: auth.accessToken
    }
    this._vm.$socket.open()
  },

  pushNotification ({commit}, payload) {
    commit(types.INCREMENT_UNREAD_NOTIFICATIONS)
    commit(types.PUSH_NOTIFICATION, payload)
  },

  markNotificationAsRead ({commit}, notification) {
    user.markNotificationAsRead(notification._id, notification.read)
      .then(payload => {
        commit(types.MARK_NOTIFICATION_AS_READ, payload)
        if (payload.read === true) commit(types.DECCREMENT_UNREAD_NOTIFICATIONS)
        else commit(types.INCREMENT_UNREAD_NOTIFICATIONS)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
