import { type AxiosResponse } from 'axios'
import outerAxiostClient from './axios'

// TODO move it to user route when/if we implement explicit flow
export const googleLogin = async (token: string): Promise<AxiosResponse<User>> =>
  await outerAxiostClient.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`)
