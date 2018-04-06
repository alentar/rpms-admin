import api from '../api'
import auth from '../auth'

class User {
  async createUser (payload) {
    return api().post('users', payload, {
      headers: {
        Authorization: auth.accessToken
      }
    })
    .then((res) => { return Promise.resolve(res.data.user) })
    .catch(err => { return Promise.reject(err.response.data) })
  }

  async updateUser (id, payload) {
    return api().put(`users/${id}`, payload, {
      headers: {
        Authorization: auth.accessToken
      }
    })
    .then((res) => { return Promise.resolve(res.data.user) })
    .catch(err => { return Promise.reject(err.response.data) })
  }

  async getUser (id) {
    return api().get(`users/${id}`, {
      headers: {
        Authorization: auth.accessToken
      }
    })
    .then((res) => { return Promise.resolve(res.data.user) })
    .catch(err => { return Promise.reject(err.response.data) })
  }

  async deleteUser (id) {
    return api().delete(`users/${id}`, {
      headers: {
        Authorization: auth.accessToken
      }
    })
    .then((res) => { return Promise.resolve(res.data) })
    .catch(err => { return Promise.reject(err.response.data) })
  }

  async getUsers ({page = 1, perPage = 30, sortBy = 'createdAt', order = 'desc', role = 'all'}) {
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
          Authorization: auth.accessToken
        }
      })
      .then((res) => { return Promise.resolve(res.data) })
      .catch((err) => { return Promise.reject(err.response.data) })
  }
}

const user = new User()
export default user
