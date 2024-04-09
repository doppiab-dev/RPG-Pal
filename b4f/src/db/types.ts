import { type CampaignStatus } from '../api/types'

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
}

export interface DBGroups {
  id: number
  campaign_id: number
  user_id: string
}

export type DBCampaignsGroups = DBCampaigns & {
  groups: number
}
