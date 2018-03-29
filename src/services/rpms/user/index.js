import api from '../api'
import AuthService from '../auth'

export default class User {
  static async createUser (payload) {
    return api().post('users', payload, {
      headers: {
        Authorization: AuthService.accessToken
      }
    })
    .then((res) => { return Promise.resolve(res.data.user) })
    .catch(err => { return Promise.reject(err.response.data) })
  }

  static async updateUser (payload) {
    return api().put(`users/${payload.id}`, payload, {
      headers: {
        Authorization: AuthService.accessToken
      }
    })
    .then((res) => { return Promise.resolve(res.data.user) })
    .catch(err => { return Promise.reject(err.response.data) })
  }

  static async getUser (id) {
    return api().get(`users/${id}`, {
      headers: {
        Authorization: AuthService.accessToken
      }
    })
    .then((res) => { return Promise.resolve(res.data.user) })
    .catch(err => { return Promise.reject(err.response.data) })
  }

  static async deleteUser (id) {
    return api().delete(`users/${id}`, {
      headers: {
        Authorization: AuthService.accessToken
      }
    })
    .then((res) => { return Promise.resolve(res.data) })
    .catch(err => { return Promise.reject(err.response.data) })
  }

  static async getUsers ({page = 1, perPage = 30, sortBy = 'createdAt', order = 'desc', role = 'all'}) {
    return api()
      .get('users', {
        params: {
          page: page,
          perPage: perPage,
          sortBy: sortBy,
          order: order,
          role: role
        },

        headers: {
          Authorization: AuthService.accessToken
        }
      })
      .then((res) => { return Promise.resolve(res.data) })
      .catch((err) => { return Promise.reject(err.response.data) })
  }
}
