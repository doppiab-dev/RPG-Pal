import { type AxiosResponse } from 'axios'
import outerAxiostClient from './axios'

export const userInfo = async (token: string): Promise<AxiosResponse<User>> =>
  await outerAxiostClient.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`)
