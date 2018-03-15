'use strict'

import api from '../api'
import EventEmitter from 'eventemitter3'
import moment from 'moment'

export default class AuthService {
  static notifier = new EventEmitter()

  static async signIn (nic, password) {
    return api()
      .post('auth/login', {nic: nic, password: password})
      .then((resp) => {
        this.setSession(resp.data.token)
        return Promise.resolve(resp.data.user)
      })
      .catch((err) => {
        this.signOut()
        return Promise.reject(err.response.data)
      })
  }

  static refreshTokens () {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken === undefined || refreshToken === null) {
      this.notifier.emit('authChanged', {authenticated: false})
      return
    }

    api()
      .post('auth/refresh/token', {
        refreshToken: refreshToken
      })
      .then((resp) => {
        this.setSession(resp.data.token)
      })
      .catch(() => {
        this.signOut()
      })
  }

  static setSession (token) {
    if (!token.accessToken && !token.refreshToken && !token.expiresIn && !token.tokenType) {
      this.notifier.emit('authChanged', { authenticated: false })
    }

    localStorage.setItem('access_token', token.accessToken)
    localStorage.setItem('refresh_token', token.refreshToken)
    localStorage.setItem('expires_at', token.expiresIn)
    localStorage.setItem('token_type', token.tokenType)

    this.notifier.emit('sessionSet', { authenticated: true })
  }

  static isAuthenticated () {
    if (!localStorage.getItem('expires_at')) return false

    return moment().isBefore(localStorage.getItem('expires_at'))
  }

  static signOut () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('token_type')

    this.notifier.emit('authChanged', { authenticated: false })
  }
}
