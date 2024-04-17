import { type CSSProperties, useCallback, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectToken, setErrorMessage, updateTheUsername } from '../Store/users'
import { TextField, IconButton } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateUsername, parseErrorMessage } from '../Utils/f'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { capitalize } from 'lodash'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import useDebouncerValidation from '../Hooks/useDebouncerValidation'
import * as Yup from 'yup'

type UsernameProps = WithChildren & {
  username?: string
  style?: CSSProperties
}

const Username: FC<UsernameProps> = ({ children, username = '', style }) => {
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

  const { control, handleSubmit, formState: { errors }, setError, clearErrors, setValue } = useForm<FormDataUsername>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    reValidateMode: 'onChange',
    defaultValues: {
      username: capitalize(username)
    }
  })

  const setUsernameError = useCallback((msg?: string) => {
    setError('username', { type: 'custom', message: msg ?? t('username.validationErrorUsername') }, { shouldFocus: true })
  }, [setError, t])

  const { handleTextChange } = useDebouncerValidation(token, validateUsername, setUsernameError, username)

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
    setValue('username', username)
  }, [setValue, username])

  return <form
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit={handleSubmit(onSubmit)}
    id="username"
    style={{ display: 'flex', width: '100%', flexDirection: 'column', height: '65%', gap: '5vh', ...style }}
  >
    <Controller
      name="username"
      control={control}
      render={({ field }) => <TextField
        label={t('username.label')}
        placeholder={t('username.placeholder')}
        fullWidth
        data-testid='username-text'
        error={Boolean(errors.username)}
        helperText={field.value.trim() !== '' && !Boolean(errors.username)
          ? <span style={{ display: 'flex', color: 'green', alignItems: 'center', gap: '2vw', padding: 0 }} data-testid="helpertext-1">
            <CheckCircleOutlineIcon />
            {t('username.valid')}
          </span>
          : Boolean(errors.username) &&
          <span style={{ display: 'flex', alignItems: 'center', gap: '2vw', padding: 0 }} data-testid="error-helpertext-1">
            <HighlightOffIcon />
            {errors.username?.message}
          </span>}
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
              <FontAwesomeIcon icon={faTimes} data-testid="clear-username" />
            </IconButton>
          )
        }}
      />}
    />
    {children}
  </form>
}

export default Username
