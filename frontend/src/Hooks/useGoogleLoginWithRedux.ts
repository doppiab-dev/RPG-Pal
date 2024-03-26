import { useGoogleLogin, googleLogout, type OverridableTokenClientConfig } from '@react-oauth/google'
import { useCallback } from 'react'
import { useAppDispatch } from '../Utils/store'
import { authenticateUser, setErrorMessage } from '../Store/users'
import { parseErrorMessage } from '../Utils/f'

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
        const msg = parseErrorMessage((error))
        dispatch(setErrorMessage(msg))
      }
    },
    onError: (error) => {
      const msg = parseErrorMessage((error))
      return dispatch(setErrorMessage(`Login Failed: ${msg}`))
    }
  })

  const logOut = useCallback(() => { googleLogout() }, [])

  return { logIn, logOut }
}

export default useGoogleLoginWithRedux
