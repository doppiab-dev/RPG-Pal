/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Forms
 */

/**
 * API
*/

/**
 * Redux
 */
type Status = 'success' | 'idle' | 'error' | 'loading'
interface State {
  userInfo: UserStore
}
interface UserStore {
  user: User
  isUserLogged: boolean
  authStatus: Status
  errorMessage: string
  token: string
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
/**
 * Utils
 */
interface WithChildren {
  children?: React.ReactNode
}
