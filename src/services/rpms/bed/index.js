'use strict'

import api from '../api'
import auth from '../auth'

class Bed {
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

const bed = new Bed()
export default bed
