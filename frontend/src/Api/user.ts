import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const userInfo = async (token: string): Promise<AxiosResponse<UserInfoDTO>> =>
  await axiosClient.get('/user/info', createApiHeaders(token))

export const usernameIsValid = async (token: string, username: string): Promise<AxiosResponse<boolean>> =>
  await axiosClient.get(`/user/username/${username}`, createApiHeaders(token))

export const updateUsername = async (token: string, username: string): Promise<AxiosResponse<UsernameDTO>> =>
  await axiosClient.post('/user/username', { username } satisfies UsernameBody, createApiHeaders(token))
