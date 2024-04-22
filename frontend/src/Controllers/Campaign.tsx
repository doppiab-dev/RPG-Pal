import { type FC } from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface CampaignProps {
  activeCampaign: number
}

const Campaign: FC<CampaignProps> = ({ activeCampaign }) => {
  const { t } = useTranslation()

  return <Stack display='flex' width='calc(100% - 250px)'>
    <Box display='flex' width='98%' alignSelf='center' flexDirection='column'>
      <Typography display='flex' fontSize='3rem' alignSelf='center'>{activeCampaign}</Typography>
      <Divider />
    </Box>
    <Box width='98%' alignSelf='center' flexDirection='column' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <Box display='flex' width='100%' flexDirection='column' height='300px'>
        <Typography display='flex'>{t('activeCampaign.description')}</Typography>
      </Box>
      <Box display='flex' flexDirection='column' height='300px'>
        <Typography display='flex'>{t('activeCampaign.body')}</Typography>
      </Box>
      <Box display='flex' flexDirection='column' height='1500px'>
        <Typography display='flex'>{t('activeCampaign.body')}</Typography>
      </Box>
    </Box>
  </Stack>
}

export default Campaign
