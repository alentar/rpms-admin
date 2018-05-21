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
      return Promise.resolve(res.data)
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

  async createBed (wardID, payload) {
    return api().post(`wards/${wardID}/beds`, payload, {
      headers: { authorization: auth.accessToken }
    })
    .then(res => Promise.resolve(res.data.bed))
    .catch(err => Promise.reject(err.response.data))
  }

  async createBeds (wardID, start, end) {
    return api().post(`wards/${wardID}/beds/bulk`,
      {
        start: start,
        end: end
      }, {
        headers: { authorization: auth.accessToken }
      })
      .then(res => Promise.resolve(res.data.beds))
      .catch(err => Promise.reject(err.response.data))
  }

  async getBed (wardID, bedID) {
    return api().get(`wards/${wardID}/beds/${bedID}`, {
      headers: { authorization: auth.accessToken }
    })
    .then(res => Promise.resolve(res.data.bed))
    .catch(err => Promise.reject(err.response.data))
  }

  async deleteBed (wardID, bedID) {
    return api().delete(`wards/${wardID}/beds/${bedID}`, {
      headers: { authorization: auth.accessToken }
    })
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data))
  }

  async updateBed (wardID, bedID, payload) {
    return api().put(`wards/${wardID}/beds/${bedID}`, payload, {
      headers: { authorization: auth.accessToken }
    })
    .then(res => Promise.resolve(res.data.bed))
    .catch(err => Promise.reject(err.response.data))
  }
}

const ward = new Ward()
export default ward
