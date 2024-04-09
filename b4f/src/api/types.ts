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

export type GetCampaignsDTO = GetCampaignDTO[]

export interface GetCampaignDTO {
  id: number
  name: string
  groups: number // numero di gruppi collegati a questa campagna
  status: CampaignStatus
}

export type CampaignStatus = 'active' | 'on_hold' | 'ended'
