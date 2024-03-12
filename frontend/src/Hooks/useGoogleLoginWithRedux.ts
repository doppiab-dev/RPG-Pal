import { useGoogleLogin, googleLogout, type OverridableTokenClientConfig } from '@react-oauth/google'
import { useCallback } from 'react'
import { useAppDispatch } from '../Utils/store'
import { authenticateUser, setErrorMessage } from '../Store/users'

interface UseGoogleLoginWithRedux {
  logIn: (overrideConfig?: OverridableTokenClientConfig | undefined) => void
  logOut: () => void
}

const useGoogleLoginWithRedux = (): UseGoogleLoginWithRedux => {
  const dispatch = useAppDispatch()

  const logIn = useGoogleLogin({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSuccess: async (codeResponse) => {
      try {
        await dispatch(authenticateUser(codeResponse.access_token))
      } catch (error) {
        dispatch(setErrorMessage(typeof error === 'string' ? error : String(error)))
      }
    },
    onError: (error) =>
      dispatch(setErrorMessage(`Login Failed: ${String(error)}`))
  })

  const logOut = useCallback(() => { googleLogout() }, [])

  return { logIn, logOut }
}

export default useGoogleLoginWithRedux
