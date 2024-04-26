import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const campaigns = async (token: string): Promise<AxiosResponse<CampaignsDTO>> =>
  await axiosClient.get('/master/campaigns', createApiHeaders(token))

export const createCampaign = async (token: string, name: string): Promise<AxiosResponse<CampaignInfoDTO>> =>
  await axiosClient.post('/master/campaign', { name } satisfies CreateCampaignBody, createApiHeaders(token))

export const editCampaign = async (token: string, name: string, status: CampaignStatus, id: number): Promise<AxiosResponse<void>> =>
  await axiosClient.patch(`/master/campaign/${id}`, { name, status } satisfies EditCampaignBody, createApiHeaders(token))

export const deleteCampaign = async (token: string, id: number): Promise<AxiosResponse<void>> =>
  await axiosClient.delete(`/master/campaign/${id}`, createApiHeaders(token))

export const campaign = async (token: string, id: number): Promise<AxiosResponse<CampaignDTO>> =>
  await axiosClient.get(`/master/campaign/${id}`, createApiHeaders(token))
