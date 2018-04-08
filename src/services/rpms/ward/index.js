import api from '../api'
import auth from '../auth'

class Ward {
  async createWard (payload) {
    return api().post('wards', payload, {
      headers: {
        authorization: auth.accessToken
      }
    }).then((res) => {
      return Promise.resolve(res.data.ward)
    })
    .catch(err => {
      return Promise.reject(err.response.data)
    })
  }

  async getWard (id) {
    return api().get(`wards/${id}`, {
      headers: {
        authorization: auth.accessToken
      }
    }).then((res) => {
      return Promise.resolve(res.data.ward)
    })
    .catch(err => {
      return Promise.reject(err.response.data)
    })
  }

  async getWards () {
    return api().get('wards?perPage=-1', {
      headers: {
        authorization: auth.accessToken
      }
    }).then((res) => {
      return Promise.resolve(res.data.wards)
    })
    .catch(err => {
      return Promise.reject(err.response.data)
    })
  }

  async deleteWard (id) {
    return api().delete(`wards/${id}`, {
      headers: {
        authorization: auth.accessToken
      }
    }).then((res) => {
      return Promise.resolve(res.data)
    }).catch(err => {
      return Promise.reject(err.response.data)
    })
  }

  async updateWard (id, payload) {
    return api().put(`wards/${id}`, payload, {
      headers: {
        authorization: auth.accessToken
      }
    }).then((res) => {
      return Promise.resolve(res.data.ward)
    }).catch(err => {
      return Promise.reject(err.response.data)
    })
  }
}

const ward = new Ward()
export default ward
