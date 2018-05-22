'use strict'

import api from '../api'
import auth from '../auth'

class Patient {
  async admitPatient (payload) {
    return api().post('patients', payload, {
      headers: {
        Authorization: auth.accessToken
      }
    })
    .then(res => {
      return Promise.resolve(res.data.patient)
    })
    .catch(err => {
      return Promise.reject(err.response.data)
    })
  }

  async dischargePatient (patientID) {
    return api().delete(`patients/discharge/${patientID}`, {
      headers: {
        Authorization: auth.accessToken
      }
    })
    .then(res => Promise.resolve(res.data.patient))
    .catch(err => Promise.reject(err.response.data))
  }

  async deletePatient (patientID) {
    return api().delete(`patients/${patientID}`, {
      headers: {
        Authorization: auth.accessToken
      }
    })
    .then(res => Promise.resolve(res.data.patient))
    .catch(err => Promise.reject(err.response.data))
  }

  async updatePatient (patientID, payload) {
    return api().put(`patients/${patientID}`, {payload}, {
      headers: {
        Authorization: auth.accessToken
      }
    })
    .then(res => Promise.resolve(res.data.patient))
    .catch(err => Promise.reject(err.response.data))
  }

  async getPatient (patientID) {
    return api().put(`patients/${patientID}`, {
      headers: {
        Authorization: auth.accessToken
      }
    })
    .then(res => Promise.resolve(res.data.patient))
    .catch(err => Promise.reject(err.response.data))
  }

  async getPatients ({page = 1, perPage = 30, sortBy = 'createdAt', order = 'desc'}) {
    return api().get('patients', {
      params: {
        page: page,
        perPage: perPage,
        sortBy: sortBy,
        order: order
      },

      headers: {
        Authorization: auth.accessToken
      }
    })
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data))
  }
}

const patient = new Patient()
export default patient
