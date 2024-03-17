import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const campaigns = async (token: string): Promise<AxiosResponse<CampaignsDTO>> =>
  await axiosClient.get('/master/campaigns', createApiHeaders(token))
