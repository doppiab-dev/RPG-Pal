/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export interface ErrorPayload {
  status: number
  error: { message: string, code: string }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorType = any

export interface UserInfoDTO {
  username: string | null
  player: { characters: number }
  master: { campaigns: number }
}

export interface UsernameBody {
  username: string
}

export type CampaignStatus = keyof typeof CampaignTypeEnum
export enum CampaignTypeEnum {
  'active' = 'active',
  'on_hold' = 'on_hold',
  'ended' = 'ended'
}

export type GetCampaignsDTO = ListCampaignDTO[]

export interface ListCampaignDTO {
  id: number
  name: string
  groups: number
  status: CampaignStatus
}

export interface CreateCampaignBody {
  name: string
}

export interface EditCampaignBody {
  name: string
  status: CampaignStatus
}

interface CampaignGroupDTO {
  id: number
  name: string
}

export interface CampaignDTO {
  id: number
  name: string
  description: string
  plot: string
  placesOfInterest: PlacesOfInterestDTO
  groups: CampaignGroupDTO[]
}

export interface PlacesOfInterestDTO {
  points: CampaignPlaceOfInterestDTO[]
  roots: number[]
}

export type PlacesOfInterestType = keyof typeof PlacesOfInterestEnum
export enum PlacesOfInterestEnum {
  'world' = 'world',
  'continent' = 'continent',
  'region' = 'region',
  'area' = 'area',
  'city' = 'city',
  'camp' = 'camp',
  'neighborhood' = 'neighborhood',
  'point' = 'point'
}

export enum PlacesOfInterestValues {
  'world' = 0,
  'continent' = 1,
  'region' = 2,
  'area' = 3,
  'city' = 3,
  'camp' = 3,
  'neighborhood' = 4,
  'point' = 5
}

export interface CampaignPlaceOfInterestDTO {
  id: number
  name: string
  place: PlacesOfInterestType
  description: string
  parent: number | null
  children: number[]
}

export interface UpsertDescriptionBody {
  description: string
}

export interface UpsertPlotBody {
  plot: string
}

export interface UpdatePoiNameBody {
  name: string
}

export interface CreatePoiBody {
  name: string
  parent: string | null
  type: PlacesOfInterestType
}

export interface UpdatePoiBody {
  description: string
  parent: string | null
}
