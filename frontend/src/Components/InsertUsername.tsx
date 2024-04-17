import { type FC } from 'react'
import { Stack, useTheme, CssBaseline, Box, Paper, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Username from '../Controllers/Username'
import HomeInfo from './HomeInfo'

interface InsertUsernameProps {
  handleLogOut: () => void
}

const InsertUsername: FC<InsertUsernameProps> = ({ handleLogOut }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return <Stack
    data-testid="set-username-component"
    display='flex'
    height='100vh'
    width='100vw'
    flexDirection='row'
    justifyContent='center'
    sx={{
      backgroundColor: theme.palette.secondary.main
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
        maxWidth: '600px',
        padding: '4%',
        borderRadius: '5%',
        height: '55%',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main
      }}
    >
      <Box display='flex' height='35%' flexDirection='column' alignItems='center' marginTop='1vh'>
        <Typography variant='h6' data-testid="set-username-title">{t('username.title')}</Typography>
        <Typography mt='2vh' data-testid="set-username-text">{t('username.text')}</Typography>
      </Box>
      <Username>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-testid="update-username-button"
          sx={{ mt: 3, fontWeight: 800, boxShadow: 10 }}
          endIcon={<FontAwesomeIcon icon={faGamepad} />}
          size='large'
        >
          {t('username.send')}
        </Button>
      </Username>
    </Box>
    <HomeInfo handleLogOut={handleLogOut} />
  </Stack>
}

export default InsertUsername
