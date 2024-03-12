import { useCallback, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { clearUserState, selectToken } from '../Store/users'
import { Stack, useTheme, lighten, CssBaseline, Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import useGoogleLoginWithRedux from '../Hooks/useGoogleLoginWithRedux'
import * as ls from '../Utils/ls'

const Home: FC = () => {
  const { t } = useTranslation()
  const { logOut } = useGoogleLoginWithRedux()
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)

  const handleLogOut = useCallback(() => {
    dispatch(clearUserState())
    ls.del('rpgPal')
    logOut()
  }, [dispatch, logOut])

  console.log('token', token)

  return <Stack
    data-testid="home-component"
    display='flex'
    height='100vh'
    width='100vw'
    flexDirection='row'
    sx={{
      backgroundColor: lighten(theme.palette.secondary.light, 0.7)
    }}
  >
    <CssBaseline />
    <Box
      display='flex'
      flexDirection='column'
      width='32.5%'
      height='100%'
      justifyContent='space-between'
    >
      {t('home.title')}
    </Box>
    <LogoutIcon onClick={handleLogOut} />
  </Stack >
}

export default Home
