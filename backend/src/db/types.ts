import { type PlacesOfInterestType, type CampaignStatus } from '../api/types'

export interface DBUserInfo {
  username: string
  characters: number
  campaigns: number
}

export interface DBCheckUsername {
  exists: boolean
}

export interface DBCampaigns {
  id: number
  user_id: string
  name: string
  status: CampaignStatus
  description: string
  plot: string
}

export interface DBGroups {
  id: number
  campaign_id: number
  user_id: string
  name: string
}

export type DBCampaignsGroups = DBCampaigns & {
  groups: number
}

export type DBCampaignGroup = DBCampaigns & {
  group_id: number
  group_name: string
}

export interface DBPlacesOfInterest {
  id: number
  campaign_id: number
  user_id: string
  parent: number | null
  children: number[] | null
  description: string | null
  thumbnail: string | null
  name: string
  place: PlacesOfInterestType
}
