import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const characters = async (token: string): Promise<AxiosResponse<CharactersDTO>> =>
  await axiosClient.get('/player/characters', createApiHeaders(token))
