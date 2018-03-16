import api from '../api'
import EventEmitter from 'events'
import moment from 'moment'

export default class AuthService {
  /* global notifier */
  /* eslint no-undef: "error" */
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

  static async autoSignIn () {
    this.refreshTokens(true)

    if (!this.isAuthenticated()) {
      throw new Error('Unauthorized user')
    }

    return api()
      .get('users/me', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then((res) => {
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        throw err
      })
  }

  static refreshTokens (forced = false) {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken === undefined || refreshToken === null) {
      this.notifier.emit('authChanged', { authenticated: false })
      return
    }

    if (this.isAuthenticated() && !forced) return

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

    this.notifier.emit('authChanged', { authenticated: true })
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
