type Status = 'success' | 'idle' | 'error' | 'loading'
interface State {
  userInfo: UserStore
  masterInfo: MasterStore
  playerInfo: PlayerStore
}
interface UserStore {
  user: User
  isUserLogged: boolean
  errorMessage: string
  token: string
  userInfo: UserInfo
  authStatus: Status
  userInfoStatus: Status
  usernameStatus: Status
}
interface User {
  picture: string
  email: string
  familyName: string
  givenName: string
  hd: string
  id: string
  locale: string
  name: string
  verifiedEmail: boolean
}
interface PlayerStore {
  characters: Characters
  charactersInfoStatus: Status
  errorMessage: string
}
interface MasterStore {
  campaigns: Campaigns
  campaign: Campaign
  campaignsInfoStatus: Status
  errorMessage: string
  campaignInfoStatus: Status
}
interface Authenticated {
  token: string
}
interface UserInfo {
  username: Username['username']
  player: { characters: number }
  master: { campaigns: number }
}
interface Username {
  username: string | null
}
interface CampaignListItem {
  id: number
  name: string
  groups: number
  status: CampaignStatus
}
type Campaigns = CampaignListItem[]
interface Character {
  name: string
  level: number
  class: string // migliora con enum
  img: string
}
type Characters = Character[]
type CampaignStatus = 'active' | 'on_hold' | 'ended'
type PlacesOfInterestType = 'world' | 'continent' | 'region' | 'area' | 'city' | 'camp' | 'neighborhood' | 'point'
interface Campaign {
  id: number
  name: string
  description: string
  plot: string
  placesOfInterest: PlacesOfInterest
  groups: CampaignGroupDTO[]
}
interface PlacesOfInterest {
  points: Record<number, PlaceOfInterestPoint>
  roots: number[]
}
interface PlaceOfInterestPoint {
  name: string
  place: PlacesOfInterestType
  description: string
  parent: number | null
  children: number[]
}
interface CampaignGroupDTO {
  id: number
  name: string
}