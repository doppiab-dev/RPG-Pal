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
import { Stack, useTheme, lighten, CssBaseline, Box, Typography, Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20, faDungeon } from '@fortawesome/free-solid-svg-icons'
import useGoogleLoginWithRedux from '../Hooks/useGoogleLoginWithRedux'
import InsertUsername from './InsertUsername'
import Loader from '../Components/Loader'
import LeftSideHome from '../Components/LeftSideHome'
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
    ls.del('rpgPal')
    logOut()
  }, [dispatch, logOut])

  useEffect(() => {
    (async () => {
      try {
        await dispatch(retrieveUserInfo({ token }))
      } catch (e) {
        dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
      }
    })()
      .catch(e => { dispatch(setErrorMessage(typeof e === 'string' ? e : String(e))) })
  }, [token, dispatch])

  if (userInfoStatus === 'loading') return <Loader />

  if (username === null) return <InsertUsername handleLogOut={handleLogOut} />

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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '35%',
        padding: '4%',
        borderRadius: '5%',
        height: '55%',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main
      }}
    >
      <Box display='flex' width='100%' height='20%' justifyContent='center'>
        <Typography variant='h6'>{t('home.title')}</Typography>
      </Box>
      <Box display='flex' width='100%' height='45%' justifyContent='space-between' flexDirection='column'>
        <Box display='flex' flexDirection='column'>
          <Typography alignSelf='center'>{userInfo.player.characters === 0 ? t('home.becomePlayer') : t('home.Player')}</Typography>
          <Button variant="contained" endIcon={<FontAwesomeIcon icon={faDiceD20} />} >
            {
              userInfo.player.characters === 0
                ? t('home.emptyPlayer')
                : `${t('home.playerButton1')} ${userInfo.player.characters} ${t('home.playerButton2')}`
            }
          </Button>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography alignSelf='center'>{userInfo.master.campaigns === 0 ? t('home.becomeMaster') : t('home.Master')}</Typography>
          <Button variant="contained" endIcon={<FontAwesomeIcon icon={faDungeon} />}>
            {
              userInfo.master.campaigns === 0
                ? t('home.emptyMaster')
                : `${t('home.masterButton1')} ${userInfo.master.campaigns} ${t('home.masterButton2')}`
            }
          </Button>
        </Box>
      </Box>
    </Box >
    <LeftSideHome handleLogOut={handleLogOut} />
  </Stack >
}

export default Home
