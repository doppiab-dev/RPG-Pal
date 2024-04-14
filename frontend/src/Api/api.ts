import { beHost } from '../Utils/config'
import axios from 'axios'

const axiosClient = axios.create({ baseURL: `${beHost}/api` })
axiosClient.defaults.headers.common.Accept = 'application/json'

export default axiosClient
