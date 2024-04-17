import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme, Box, Typography, Button, Paper } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20, faDungeon } from '@fortawesome/free-solid-svg-icons'

interface HomeProps {
  userInfo: UserInfo
  toCampaigns: () => void
}

const Home: FC<HomeProps> = ({ userInfo, toCampaigns }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return <Box
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
    data-testid="home-component"
  >
    <Box display='flex' width='100%' justifyContent='center' height='30%'>
      <Typography variant='h6' data-testid="home-title">{t('home.title')}</Typography>
    </Box>
    <Box display='flex' width='100%' justifyContent='space-between' flexDirection='column' gap='4vh'>
      <Box display='flex' flexDirection='column' gap='1vh'>
        <Typography alignSelf='center'>{userInfo.player.characters === 0 ? t('home.becomePlayer') : t('home.Player')}</Typography>
        <Button variant="contained" endIcon={<FontAwesomeIcon icon={faDiceD20} />} sx={{ boxShadow: 10 }}>
          {userInfo.player.characters === 0
            ? t('home.emptyPlayer')
            : `${t('home.playerButton1')} ${userInfo.player.characters} ${t('home.playerButton2')}`
          }
        </Button>
      </Box>
      <Box display='flex' flexDirection='column' gap='1vh'>
        <Typography alignSelf='center'>{userInfo.master.campaigns === 0 ? t('home.becomeMaster') : t('home.Master')}</Typography>
        <Button
          variant="contained"
          endIcon={<FontAwesomeIcon icon={faDungeon} />}
          sx={{ boxShadow: 10 }}
          onClick={toCampaigns}
          data-testid="browse-campaigns"
        >
          {userInfo.master.campaigns === 0
            ? t('home.emptyMaster')
            : `${t('home.masterButton1')} ${userInfo.master.campaigns} ${t('home.masterButton2')}`
          }
        </Button>
      </Box>
    </Box>
  </Box>
}

export default Home
