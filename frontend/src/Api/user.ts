import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import { updateUsernameMock, userInfoMock, usernameIsValidMock } from '../Mocks/user'
import axiosClient from './api'

const mockUserInfo = true
const mockUsernameIsValid = true
const mockUpdateUsername = true

export const userInfo = async (token: string): Promise<AxiosResponse<UserInfoDTO>> =>
  mockUserInfo
    ? await userInfoMock(token)
    : await axiosClient.get('/user/info', createApiHeaders(token))

export const usernameIsValid = async (token: string, username: string): Promise<AxiosResponse<boolean>> =>
  mockUsernameIsValid
    ? await usernameIsValidMock(token, username)
    : await axiosClient.get(`/user/username/${username}`, createApiHeaders(token))

export const updateUsername = async (token: string, username: string): Promise<AxiosResponse<UsernameDTO>> =>
  mockUpdateUsername
    ? await updateUsernameMock(token, username)
    : await axiosClient.post('/user/username', { username } satisfies UsernameBody, createApiHeaders(token))
