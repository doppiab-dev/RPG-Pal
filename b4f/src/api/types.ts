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
