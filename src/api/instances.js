import axios from 'axios'

const apiRoot = axios.create({
  baseURL: '/api/v1'
})

export { apiRoot }
