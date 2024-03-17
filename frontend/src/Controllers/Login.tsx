import { type FC, useCallback } from 'react'
import {
  CssBaseline,
  Box,
  Avatar,
  Button,
  Stack,
  Typography,
  lighten,
  useTheme
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { clearErrorMessage, clearUserAuthStatus, selectErrorMessage, selectAuthStatus, setErrorMessage } from '../Store/users'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import GoogleIcon from '@mui/icons-material/Google'
import useGoogleLoginWithRedux from '../Hooks/useGoogleLoginWithRedux'
import ErrorComponent from '../Components/Error'
import LanguageSelector from '../Components/LanguageSelector'

const Login: FC = () => {
  const { t } = useTranslation()
  const { logIn } = useGoogleLoginWithRedux()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const errorMessage = useAppSelector(selectErrorMessage)
  const authStatus = useAppSelector(selectAuthStatus)

  const clearError = useCallback(() => {
    dispatch(clearUserAuthStatus())
    dispatch(clearErrorMessage())

    navigate('/login')
  }, [dispatch, navigate])

  const handleLoginClick = useCallback(() => {
    try {
      logIn()
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, logIn])

  if (authStatus === 'error') {
    const msg = errorMessage === '' ? 'Authentication error' : errorMessage

    return (
      <ErrorComponent msg={msg} clearError={clearError} />
    )
  }

  return <Stack
    data-testid="login-component"
    display='flex'
    height='100vh'
    width='100vw'
    justifyContent='center'
    sx={{
      backgroundColor: lighten(theme.palette.secondary.light, 0.7)
    }}
  >
    <CssBaseline />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '35%',
        padding: '4%',
        borderRadius: '5%',
        minHeight: '55%',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
    >
      <LanguageSelector style={{ height: '35%' }} />
      <Box display='flex' flexDirection='column' alignItems='center' height='65%'>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5"> {t('login.signin')} </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          data-testid="login-button"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleLoginClick}
          sx={{ mt: 3, mb: 2, fontWeight: 800 }}
          startIcon={<GoogleIcon />}
          size='large'
        >
          {t('login.signin')}
        </Button>
      </Box>
    </Box>
  </Stack>
}

export default Login
