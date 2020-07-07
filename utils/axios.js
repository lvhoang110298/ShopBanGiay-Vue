import axios from 'axios'

const BASE_URL = 'https://ssneaker.azurewebsites.net/api'

const API = axios.create({
  baseURL: BASE_URL,
})

API.defaults.headers.post['Content-Type'] = 'application/json'

export default API
