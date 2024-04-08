import axios from 'axios'

const outerAxiostClient = axios.create({ baseURL: '/' })
outerAxiostClient.defaults.headers.common.Accept = 'application/json'

export default outerAxiostClient
