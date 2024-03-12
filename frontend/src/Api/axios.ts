import axios from 'axios'

const axiosClient = axios.create({ baseURL: '/' })
axiosClient.defaults.headers.common.Accept = 'application/json'

export default axiosClient
