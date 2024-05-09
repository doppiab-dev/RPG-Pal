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

export const upsertDescription = async (token: string, id: number, description: string): Promise<AxiosResponse<void>> =>
  await axiosClient.put(`/master/campaign/${id}/description`, { description } satisfies UpsertDescriptionBody, createApiHeaders(token))

export const upsertPlot = async (token: string, id: number, plot: string): Promise<AxiosResponse<void>> =>
  await axiosClient.put(`/master/campaign/${id}/plot`, { plot } satisfies UpsertPlotBody, createApiHeaders(token))

export const deletePoi = async (token: string, id: number, poi: number): Promise<AxiosResponse<PlacesOfInterestDTO>> =>
  await axiosClient.delete(`/master/campaign/${id}/poi/${poi}`, createApiHeaders(token))

export const editPoiName = async (token: string, id: number, poi: number, name: string): Promise<AxiosResponse<PlacesOfInterestDTO>> =>
  await axiosClient.patch(`/master/campaign/${id}/poi/${poi}`, { name } satisfies UpdatePoiNameBody, createApiHeaders(token))

export const createPoi = async (
  token: string,
  id: number,
  parent: string | null,
  name: string,
  type: PlacesOfInterestType
): Promise<AxiosResponse<PlacesOfInterestDTO>> =>
  await axiosClient.post(`/master/campaign/${id}/poi`, { name, parent, type } satisfies CreatePoiBody, createApiHeaders(token))

export const editPoi = async (
  token: string,
  id: number,
  poi: number,
  description: string,
  parent: string | null,
  thumbnail: string
): Promise<AxiosResponse<PlacesOfInterestDTO>> =>
  await axiosClient.put(`/master/campaign/${id}/poi/${poi}`, { description, parent, thumbnail } satisfies UpdatePoiBody, createApiHeaders(token))
