import { useCallback, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../Utils/store'
import { clearUserState } from '../Store/users'
import { Stack, useTheme, lighten, CssBaseline, Box, Typography, Tooltip } from '@mui/material'
import { Version } from '../Utils/config'
import LogOutIcon from '@mui/icons-material/Logout'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import useGoogleLoginWithRedux from '../Hooks/useGoogleLoginWithRedux'
import * as ls from '../Utils/ls'

const Home: FC = () => {
  const { t } = useTranslation()
  const { logOut } = useGoogleLoginWithRedux()
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const handleLogOut = useCallback(() => {
    dispatch(clearUserState())
    ls.del('rpgPal')
    logOut()
  }, [dispatch, logOut])

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
        height: '55vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
    >
      <Typography>{t('home.title')}</Typography>
    </Box>
    <Box
      display='flex'
      flexDirection='column'
      width='32.5%'
      height='100%'
      justifyContent='space-between'
    >
      <Box
        display='flex'
        alignSelf='flex-end'
        padding='1vh 1vw'
        alignItems='center'
        data-testid="logout-button"
        sx={{ cursor: 'pointer' }}
        onClick={handleLogOut}
      >
        <Typography
          fontSize='small'
          marginRight='1vw'
          color={theme.palette.primary.main}
        >
          {t('home.logout')}
        </Typography>
        <LogOutIcon sx={{ color: theme.palette.primary.main }} />
      </Box>
      <Tooltip title={`${t('home.version')} ${Version}`}>
        <InfoIcon sx={{ alignSelf: 'flex-end', cursor: 'pointer', margin: '0 1vw 1vh 0', color: theme.palette.primary.main }} />
      </Tooltip>
    </Box>
  </Stack >
}

export default Home
