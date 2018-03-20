import api from '../api'

export default class AuthService {
  constructor () {
    this.tokenRenewalTimeout = null
  }

  async signIn (nic, password) {
    return api()
      .post('auth/login', {nic: nic, password: password})
      .then((resp) => {
        this.setSession(resp.data.token)
        return Promise.resolve(resp.data.user)
      })
      .catch((err) => {
        console.log(err)
        this.signOut()
        return Promise.reject(err.response.data)
      })
  }

  async autoSignIn () {
    if (!this.isAuthenticated()) {
      throw new Error('Unauthorized user')
    }

    await this.renewTokens()

    return api()
      .get('users/me', {
        headers: {
          'Authorization': this.accessToken
        }
      })
      .then((res) => {
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        throw err
      })
  }

  scheduleTokenRenewal () {
    var expiresAt = this.expiresAt
    var delay = expiresAt - Date.now()

    if (delay > 0) {
      const self = this
      this.tokenRenewalTimeout = setTimeout(function () {
        self.renewTokens()
      }, delay)
    }
  }

  async renewTokens () {
    api()
      .post('auth/refresh/token', {
        refreshToken: this.refreshToken
      })
      .then((resp) => {
        this.setSession(resp.data.token)
        return Promise.resolve()
      })
      .catch(() => {
        this.signOut()
      })
  }

  setSession (token) {
    if (!token.accessToken && !token.refreshToken && !token.expiresIn && !token.tokenType) {
      return
    }

    localStorage.setItem('access_token', token.accessToken)
    localStorage.setItem('refresh_token', token.refreshToken)
    localStorage.setItem('expires_at', token.expiresIn)
    localStorage.setItem('token_type', token.tokenType)

    this.scheduleTokenRenewal()
  }

  isAuthenticated () {
    if (!this.expiresAt) return false
    const period = this.expiresAt - Date.now()
    return period > 0
  }

  get expiresAt () {
    const val = localStorage.getItem('expires_at')
    return val === null || val === undefined ? null : new Date(val)
  }

  get refreshToken () {
    return localStorage.getItem('refresh_token')
  }

  get accessToken () {
    return localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
  }

  signOut () {
    clearTimeout(this.tokenRenewalTimeout)

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('token_type')
  }
}
