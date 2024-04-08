import { useCallback, type FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import {
  clearUserState,
  retrieveUserInfo,
  selectErrorMessage,
  selectToken,
  selectUserInfo,
  selectUserInfoStatus,
  selectUsername,
  setErrorMessage
} from '../Store/users'
import { Stack, useTheme, lighten, CssBaseline, Box } from '@mui/material'
import { isEmpty } from 'lodash'
import { clearPlayerState } from '../Store/player'
import { clearMasterState } from '../Store/master'
import { parseErrorMessage } from '../Utils/f'
import useGoogleLoginWithRedux from '../Hooks/useGoogleLoginWithRedux'
import InsertUsername from './InsertUsername'
import Loader from '../Components/Loader'
import HomeInfo from '../Components/HomeInfo'
import ErrorComponent from '../Components/Error'
import Component from '../Components/Home'
import * as ls from '../Utils/ls'

const Home: FC = () => {
  const { t } = useTranslation()
  const { logOut } = useGoogleLoginWithRedux()
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)
  const userInfoStatus = useAppSelector(selectUserInfoStatus)
  const username = useAppSelector(selectUsername)
  const userInfo = useAppSelector(selectUserInfo)
  const errorMessage = useAppSelector(selectErrorMessage)

  const handleLogOut = useCallback(() => {
    dispatch(clearUserState())
    dispatch(clearPlayerState())
    dispatch(clearMasterState())

    ls.del('rpgPal')
    logOut()
  }, [dispatch, logOut])

  useEffect(() => {
    (async () => {
      try {
        await dispatch(retrieveUserInfo({ token }))
      } catch (e) {
        const msg = parseErrorMessage((e))
        dispatch(setErrorMessage(msg))
      }
    })()
      .catch(e => {
        const msg = parseErrorMessage((e))
        dispatch(setErrorMessage(msg))
      })
  }, [token, dispatch])

  if (userInfoStatus === 'loading') return <Loader />
  if (userInfoStatus === 'error') return <ErrorComponent clearError={handleLogOut} msg={errorMessage} />
  if (isEmpty(userInfo)) return <ErrorComponent clearError={handleLogOut} msg={(t('home.error'))} />
  if (username === null) return <InsertUsername handleLogOut={handleLogOut} />

  return <Stack
    display='flex'
    height='100vh'
    width='100vw'
    flexDirection='row'
    sx={{ backgroundColor: lighten(theme.palette.secondary.light, 0.7) }}
  >
    <CssBaseline />
    <Box width='32.5%' />
    <Component userInfo={userInfo} />
    <HomeInfo handleLogOut={handleLogOut} />
  </Stack>
}

export default Home
