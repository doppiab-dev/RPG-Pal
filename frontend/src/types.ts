/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Forms
 */
interface FormDataUsername {
  username: string
}
interface CampaignInputs {
  campaign: string
}
/**
 * API
*/
interface UserInfoDTO {
  username: string | null
  player: { characters: number }
  master: { campaigns: number }
}
interface UsernameBody {
  username: string
}
interface UsernameDTO {
  username: string
}
interface CampaignInfoDTO {
  id: number
  name: string
  groups: number
  status: CampaignStatus
}
type CampaignsDTO = CampaignInfoDTO[]
interface CharacterInfo {
  name: string
  level: number
  class: string // migliora con enum
  img: string
}
type CharactersDTO = CharacterInfo[]
interface CreateCampaignBody {
  name: string
}
/**
 * Redux
 */
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
  campaignsInfoStatus: Status
  errorMessage: string
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
interface Campaign {
  id: number
  name: string
  groups: number
  status: CampaignStatus
}
type Campaigns = Campaign[]
interface Character {
  name: string
  level: number
  class: string // migliora con enum
  img: string
}
type Characters = Character[]
type CampaignStatus = 'active' | 'on_hold' | 'ended'
/**
 * Utils
 */
interface WithChildren {
  children?: React.ReactNode
}
interface Option {
  name: string
  id: number
}
