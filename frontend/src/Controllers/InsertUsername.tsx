import { useCallback, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectToken, setErrorMessage, updateTheUsername } from '../Store/users'
import { Stack, useTheme, lighten, CssBaseline, Box, Typography, Button, TextField } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateUsername } from '../Utils/f'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import LeftSideHome from '../Components/LeftSideHome'
import * as Yup from 'yup'

interface InsertUsernameProps {
  handleLogOut: () => void
}

const InsertUsername: FC<InsertUsernameProps> = ({ handleLogOut }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)

  const schema = Yup.object().shape({
    username: Yup.string()
      .required(t('username.validationErrorRequired'))
      .max(16, t('username.validationErrorTooLong'))
      .trim()
      .test('safe-string', t('username.validationErrorInvalid'), (value) => !((value !== null && value !== undefined) && /[<>&'"]/.test(value)))
      .test('valid-username', t('username.validationErrorUsername'), async function (value) {
        const isValid = await validateUsername(token, value.trim())

        return isValid || this.createError({ message: t('username.validationErrorUsername') })
      })
  })

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataUsername>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: ''
    }
  })

  const onSubmit: SubmitHandler<FormDataUsername> = useCallback(async (data) => {
    try {
      const { username } = data
      if (username === undefined || username === '') {
        dispatch(setErrorMessage('validation failed'))
      } else {
        await dispatch(updateTheUsername({ token, username }))
      }
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, token])

  return <Stack
    data-testid="set-username-component"
    display='flex'
    height='100vh'
    width='100vw'
    flexDirection='row'
    justifyContent='center'
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
        justifyContent: 'space-between',
        width: '35%',
        padding: '4%',
        borderRadius: '5%',
        height: '55%',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main
      }}
    >
      <Box display='flex' height='35%' flexDirection='column' alignItems='center'>
        <Typography variant='h6'>{t('username.title')}</Typography>
        <Typography mt='2vh'>{t('username.text')}</Typography>
      </Box>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)} id="username" style={{ display: 'flex', width: '100%', flexDirection: 'column', height: '65%' }}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              label={t('username.label')}
              placeholder={t('username.placeholder')}
              fullWidth
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              data-testid='username-text'
              sx={{ width: '100%' }}
              {...field} />
          )} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-testid="update-username-button"
          sx={{ mt: 3, fontWeight: 800 }}
          endIcon={<FontAwesomeIcon icon={faGamepad} />}
          size='large'
        >
          {t('username.send')}
        </Button>
      </form>
    </Box>
    <LeftSideHome handleLogOut={handleLogOut} />
  </Stack>
}

export default InsertUsername
