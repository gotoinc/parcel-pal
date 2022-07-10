import requests from './services/requests.js'
import { apiRoot } from './instances.js'

const api = {
  requests: requests(apiRoot)
}

export { api }
