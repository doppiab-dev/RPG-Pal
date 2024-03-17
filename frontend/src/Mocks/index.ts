import { type AxiosResponse } from 'axios'

const mock: AxiosResponse<any> = {
  data: {},
  status: 200,
  statusText: 'OK',
  config: {
    headers: {} as any
  },
  headers: {}
}

export default mock
