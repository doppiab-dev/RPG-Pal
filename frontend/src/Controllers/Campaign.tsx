import { useEffect, type FC } from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { parseErrorMessage } from '../Utils/f'
import { fetchACampaign, selectCampaignInfoStatus, setErrorMessage } from '../Store/master'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectToken } from '../Store/users'
import Loader from '../Components/Loader'

interface CampaignProps {
  activeCampaign: number
}

const Campaign: FC<CampaignProps> = ({ activeCampaign }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)
  const campaignInfoStatus = useAppSelector(selectCampaignInfoStatus)

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchACampaign({ token, id: activeCampaign }))
      } catch (e) {
        const msg = parseErrorMessage((e))
        dispatch(setErrorMessage(msg))
      }
    })()
      .catch(e => {
        const msg = parseErrorMessage((e))
        dispatch(setErrorMessage(msg))
      })
  }, [token, dispatch, activeCampaign])

  if (campaignInfoStatus === 'loading') return <Loader />

  return <Stack display='flex' width='calc(100% - 250px)'>
    <Box display='flex' width='100%' flexDirection='column' boxShadow={1}>
      <Typography display='flex' fontSize='3rem' alignSelf='center'>{activeCampaign}</Typography>
      <Divider />
    </Box>
    <Box width='98%' alignSelf='center' flexDirection='column' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <Box display='flex' width='100%' flexDirection='column' minHeight='100px' maxHeight='300px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <Typography display='flex'>{t('activeCampaign.description')}</Typography>
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column' minHeight='100px' maxHeight='300px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <Typography display='flex'>{t('activeCampaign.campaignManagment')}</Typography>
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column' minHeight='100px' maxHeight='300px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <Typography display='flex'>{t('activeCampaign.campaignSetting')}</Typography>
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column'>
        <Typography display='flex'>{t('lorem.ipsum')}</Typography>
      </Box>
    </Box>
  </Stack>
}

export default Campaign
