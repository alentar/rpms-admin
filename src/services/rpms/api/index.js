'use strict'

import axios from 'axios'

/* global SERVICE_URI */
const axiosInstance = axios.create({baseURL: `${SERVICE_URI}/api/`})

export default () => {
  return axiosInstance
}
