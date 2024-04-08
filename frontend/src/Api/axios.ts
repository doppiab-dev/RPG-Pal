import axios from 'axios'

const axiosClient = axios.create({ baseURL: 'beHost/' })
axiosClient.defaults.headers.common.Accept = 'application/json'

export default axiosClient
