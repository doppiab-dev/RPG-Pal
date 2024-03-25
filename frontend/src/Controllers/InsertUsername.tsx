import { useCallback, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectToken, setErrorMessage, updateTheUsername } from '../Store/users'
import { Stack, useTheme, lighten, CssBaseline, Box, Typography, Button, TextField, Paper, IconButton } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faTimes } from '@fortawesome/free-solid-svg-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateUsername, parseErrorMessage } from '../Utils/f'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import HomeInfo from '../Components/LeftSideHome'
import useDebouncerValidation from '../Hooks/useDebouncerValidation'
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

  const { control, handleSubmit, reset, formState: { errors }, setError, clearErrors } = useForm<FormDataUsername>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    reValidateMode: 'onChange',
    defaultValues: {
      username: ''
    }
  })

  const setUsernameError = useCallback(() => {
    setError('username', { type: 'custom', message: t('username.validationErrorUsername') }, { shouldFocus: true })
  }, [setError, t])

  const { handleTextChange } = useDebouncerValidation(token, validateUsername, setUsernameError)

  const onSubmit: SubmitHandler<FormDataUsername> = useCallback(async (data) => {
    try {
      const { username } = data
      if (username === undefined || username === '') {
        dispatch(setErrorMessage('validation failed'))
      } else {
        await dispatch(updateTheUsername({ token, username }))
      }
    } catch (e) {
      const msg = parseErrorMessage((e))
      setError('username', { type: 'custom', message: msg ?? 'validation failed' }, { shouldFocus: true })
    }
  }, [dispatch, setError, token])

  const handleClearUsername = useCallback(() => {
    reset()
  }, [reset])

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
      component={Paper}
      elevation={10}
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
      <Box display='flex' height='35%' flexDirection='column' alignItems='center' marginTop='1vh'>
        <Typography variant='h6'>{t('username.title')}</Typography>
        <Typography mt='2vh'>{t('username.text')}</Typography>
      </Box>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        id="username"
        style={{ display: 'flex', width: '100%', flexDirection: 'column', height: '65%', gap: '5vh' }}
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) =>
            <TextField
              label={t('username.label')}
              placeholder={t('username.placeholder')}
              fullWidth
              data-testid='username-text'
              error={Boolean(errors.username)}
              helperText={
                field.value.trim() !== '' && !Boolean(errors.username)
                  ? <span style={{ display: 'flex', color: 'green', alignItems: 'center', gap: '2vw', padding: 0 }}>
                    <CheckCircleOutlineIcon />
                    {t('username.valid')}
                  </span>
                  : Boolean(errors.username) && <span style={{ display: 'flex', alignItems: 'center', gap: '2vw', padding: 0 }}>
                    <HighlightOffIcon />
                    {errors.username?.message}
                  </span>
              }
              sx={{ width: '100%', boxShadow: Boolean(errors.username) || field.value.trim() !== '' ? 0 : 5 }}
              InputProps={{
                ...field,
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onChange: async (e) => {
                  clearErrors('username')
                  const { value } = e.target
                  field.onChange(value)
                  await handleTextChange(value)
                },
                endAdornment: (
                  <IconButton
                    aria-label="clear username"
                    onClick={handleClearUsername}
                    edge="end"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </IconButton>
                )
              }}
            />
          }
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-testid="update-username-button"
          sx={{ mt: 3, fontWeight: 800, boxShadow: 10 }}
          endIcon={<FontAwesomeIcon icon={faGamepad} />}
          size='large'
          disabled={Boolean(errors.username)}
        >
          {t('username.send')}
        </Button>
      </form>
    </Box>
    <HomeInfo handleLogOut={handleLogOut} />
  </Stack>
}

export default InsertUsername
