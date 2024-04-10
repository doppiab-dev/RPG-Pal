import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const campaigns = async (token: string): Promise<AxiosResponse<CampaignsDTO>> =>
  await axiosClient.get('/master/campaigns', createApiHeaders(token))

export const createCampaign = async (token: string, name: string): Promise<AxiosResponse<CampaignInfoDTO>> =>
  await axiosClient.post('/master/campaign', { name } satisfies CreateCampaignBody, createApiHeaders(token))
