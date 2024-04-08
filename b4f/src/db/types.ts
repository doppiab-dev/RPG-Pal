export interface DBUserInfo {
  username: string
  characters: number
  campaigns: number
}

export interface DBCheckUsername {
  exists: boolean
}
