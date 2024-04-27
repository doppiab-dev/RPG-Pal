import { useEffect, type FC } from 'react'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { parseErrorMessage } from '../Utils/f'
import { fetchACampaign, selectCampaign, selectCampaignInfoStatus, setErrorMessage } from '../Store/master'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectToken } from '../Store/users'
import { faMapLocationDot, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DescriptionIcon from '@mui/icons-material/Description'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import Loader from '../Components/Loader'

interface CampaignProps {
  activeCampaign: number
}

const Campaign: FC<CampaignProps> = ({ activeCampaign }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)
  const campaignInfoStatus = useAppSelector(selectCampaignInfoStatus)
  const campaign = useAppSelector(selectCampaign)

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
    <Box display='flex' width='100%' flexDirection='column' boxShadow={1} height='66px'>
      <Typography display='flex' fontSize='3rem' alignSelf='center'>{campaign.name}</Typography>
    </Box>
    <Box width='98%' alignSelf='center' flexDirection='column' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <Box display='flex' width='100%' flexDirection='column' minHeight='100px' maxHeight='300px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {
          campaign.description === ''
            ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography display='flex'>{t('activeCampaign.description')}</Typography>
              <Button variant="contained" endIcon={<DescriptionIcon />} sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px' }}>
                {t('activeCampaign.descriptionButton')}
              </Button>
            </Box>
            : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography display='flex'>{campaign.description}</Typography>
              <Button variant="contained" endIcon={<ReadMoreIcon />} sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px' }}>
                {t('activeCampaign.showMore')}
              </Button>
            </Box>
        }
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column' minHeight='100px' maxHeight='300px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {
          campaign.plot === ''
            ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography display='flex'>{t('activeCampaign.plot')}</Typography>
              <Button variant="contained" endIcon={<DescriptionIcon />} sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px' }}>
                {t('activeCampaign.plotButton')}
              </Button>
            </Box>
            : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography display='flex'>{campaign.plot}</Typography>
              <Button variant="contained" endIcon={<ReadMoreIcon />} sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px' }}>
                {t('activeCampaign.showMore')}
              </Button>
            </Box>
        }
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column' minHeight='100px' maxHeight='150px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {
          campaign.groups.length === 0
            ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography display='flex'>{t('activeCampaign.noGroups')}</Typography>
              <Button
                variant="contained"
                endIcon={<GroupAddIcon />}
                sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px' }}
              >
                {t('activeCampaign.addGroupButton')}
              </Button>
            </Box>
            : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography display='flex'>{t('activeCampaign.groups')}</Typography>
              <Box display='flex' gap='3vw'>
                <Button
                  variant="contained"
                  endIcon={<GroupAddIcon />}
                  sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px' }}
                >
                  {t('activeCampaign.addGroupButton')}
                </Button>
                {
                  campaign.groups.map(group =>
                    <Button
                      variant="contained"
                      endIcon={<FontAwesomeIcon icon={faPeopleGroup} />}
                      sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px' }}
                      key={group.id}
                    >
                      {group.name}
                    </Button>
                  )
                }
              </Box>
            </Box>
        }
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column'>
        {
          campaign.firstPOI === null
            ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography display='flex'>{t('activeCampaign.firstPOI')}</Typography>
              <Button
                variant="contained"
                endIcon={<FontAwesomeIcon icon={faMapLocationDot} />}
                sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px' }}
              >
                {t('activeCampaign.addLocationButton')}
              </Button>
            </Box>
            : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography display='flex'>{campaign.firstPOI.name}</Typography>
            </Box>
        }
      </Box>
    </Box>
  </Stack >
}

export default Campaign
