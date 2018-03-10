'use strict'

import api from '../api'

export default {
  async signIn (nic, password) {
    return api()
      .post('auth/login', {nic: nic, password: password})
      .then((resp) => {
        localStorage.setItem('token', resp.data.token)
        return Promise.resolve(resp.data.user)
      })
      .catch((err) => {
        localStorage.removeItem('token')
        return Promise.reject(err.response.data)
      })
  },

  async autoSignIn () {
    if (!localStorage.getItem('token')) return Promise.resolve(null)

    return api()
      .post('auth/validate/token', {}, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then((resp) => {
        localStorage.setItem('token', resp.data.token)
        return Promise.resolve(resp.data.user)
      })
      .catch(() => {
        localStorage.removeItem('token')
        return Promise.resolve(null)
      })
  },

  signOut () {
    localStorage.removeItem('token')
  }
}
