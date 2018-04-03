'use strict'

import api from '../api'
import auth from '../auth'

class Device {
  async getDevices ({page = 1, perPage = 30, sortBy = 'createdAt', order = 'desc', type = 'all'}) {
    return api().get('devices', {
      params: {
        page: page,
        perPage: perPage,
        sortBy: sortBy,
        order: order,
        type: type
      },

      headers: {
        authorization: auth.accessToken
      }
    })
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data))
  }

  async updateDevice (deviceId, payload) {
    return api().put(`devices/${deviceId}`, payload, {
      headers: {
        authorization: auth.accessToken
      }
    })
    .then(res => Promise.resolve(res.data.device))
    .catch(err => Promise.reject(err.response.data))
  }

  async deleteDevice (deviceId) {
    return api().delete(`devices/${deviceId}`, {
      headers: {
        authorization: auth.accessToken
      }
    })
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data))
  }

  async authorizeDevice (deviceId, authorize) {
    return api().post(`devices/${deviceId}/${authorize === true ? 'authorize' : 'unauthorize'}`, {}, {
      headers: {
        authorization: auth.accessToken
      }
    })
    .then(res => Promise.resolve(res.data.device))
    .catch(err => Promise.reject(err.response.data))
  }

  async blacklistDevice (deviceId, blacklist) {
    return api().post(`devices/${deviceId}/${blacklist === true ? 'blacklist' : 'whitelist'}`, {}, {
      headers: {
        authorization: auth.accessToken
      }
    })
    .then(res => Promise.resolve(res.data.device))
    .catch(err => Promise.reject(err.response.data))
  }
}

const device = new Device()
export default device
