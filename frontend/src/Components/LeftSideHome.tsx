import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme, Box, Typography, Tooltip } from '@mui/material'
import { Version } from '../Utils/config'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import LogOutIcon from '@mui/icons-material/Logout'

interface HomeInfoProps {
  handleLogOut: () => void
}

const HomeInfo: FC<HomeInfoProps> = ({ handleLogOut }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return <Box
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
      <InfoIcon
        fontSize='medium'
        sx={{
          alignSelf: 'flex-end',
          cursor: 'pointer',
          margin: '0 1vw 1vh 0',
          color: theme.palette.primary.main,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '50%'
        }}
      />
    </Tooltip>
  </Box>
}

export default HomeInfo
