import { useCallback, type FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import {
  clearUserState,
  retrieveUserInfo,
  selectToken,
  selectUserInfo,
  selectUserInfoStatus,
  selectUsername,
  setErrorMessage
} from '../Store/users'
import { Stack, useTheme, lighten, CssBaseline, Box, Typography, Button, Paper } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20, faDungeon } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash'
import { clearPlayerState } from '../Store/player'
import { clearMasterState } from '../Store/master'
import { parseErrorMessage } from '../Utils/f'
import useGoogleLoginWithRedux from '../Hooks/useGoogleLoginWithRedux'
import InsertUsername from './InsertUsername'
import Loader from '../Components/Loader'
import HomeInfo from '../Components/LeftSideHome'
import ErrorComponent from '../Components/Error'
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

  if (username === null) return <InsertUsername handleLogOut={handleLogOut} />

  if (isEmpty(userInfo)) return <ErrorComponent clearError={handleLogOut} msg={(t('home.error'))} />

  return <Stack
    data-testid="home-component"
    display='flex'
    height='100vh'
    width='100vw'
    flexDirection='row'
    sx={{ backgroundColor: lighten(theme.palette.secondary.light, 0.7) }}
  >
    <CssBaseline />
    <Box width='32.5%' />
    <Box
      component={Paper}
      elevation={10}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        width: '35%',
        maxWidth: '600px',
        padding: '4%',
        borderRadius: '5%',
        height: '55%',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main
      }}
    >
      <Box display='flex' width='100%' justifyContent='center' height='30%'>
        <Typography variant='h6'>{t('home.title')}</Typography>
      </Box>
      <Box display='flex' width='100%' justifyContent='space-between' flexDirection='column' gap='4vh'>
        <Box display='flex' flexDirection='column' gap='1vh'>
          <Typography alignSelf='center'>{userInfo.player.characters === 0 ? t('home.becomePlayer') : t('home.Player')}</Typography>
          <Button variant="contained" endIcon={<FontAwesomeIcon icon={faDiceD20} />} sx={{ boxShadow: 10 }}>
            {
              userInfo.player.characters === 0
                ? t('home.emptyPlayer')
                : `${t('home.playerButton1')} ${userInfo.player.characters} ${t('home.playerButton2')}`
            }
          </Button>
        </Box>
        <Box display='flex' flexDirection='column' gap='1vh'>
          <Typography alignSelf='center'>{userInfo.master.campaigns === 0 ? t('home.becomeMaster') : t('home.Master')}</Typography>
          <Button variant="contained" endIcon={<FontAwesomeIcon icon={faDungeon} />} sx={{ boxShadow: 10 }}>
            {
              userInfo.master.campaigns === 0
                ? t('home.emptyMaster')
                : `${t('home.masterButton1')} ${userInfo.master.campaigns} ${t('home.masterButton2')}`
            }
          </Button>
        </Box>
      </Box>
    </Box>
    <HomeInfo handleLogOut={handleLogOut} />
  </Stack>
}

export default Home
