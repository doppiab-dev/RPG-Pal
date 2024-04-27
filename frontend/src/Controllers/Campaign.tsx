import { useCallback, useEffect, useState, type FC } from 'react'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { parseErrorMessage, shrinkText } from '../Utils/f'
import { fetchACampaign, selectCampaign, selectCampaignInfoStatus, setErrorMessage } from '../Store/master'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectToken } from '../Store/users'
import { faMapLocationDot, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { type SubmitHandler, useForm } from 'react-hook-form'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DescriptionIcon from '@mui/icons-material/Description'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import Loader from '../Components/Loader'
import TextAreaDialog from '../Components/TextAreaDialog'
import * as yup from 'yup'

interface CampaignProps {
  activeCampaign: number
}

const Campaign: FC<CampaignProps> = ({ activeCampaign }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const schema = yup.object().shape({
    text: yup.string().required(t('textArea.required'))
  })

  const [description, setDescription] = useState<boolean>(false)
  const [plot, setPlot] = useState<boolean>(false)

  const token = useAppSelector(selectToken)
  const campaignInfoStatus = useAppSelector(selectCampaignInfoStatus)
  const campaign = useAppSelector(selectCampaign)

  const {
    handleSubmit: handleDescriptionSubmit,
    control: controlDescription,
    setValue: setDescriptionValue,
    formState: { errors: descriptionErrors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      text: ''
    }
  })
  const {
    handleSubmit: handlePlotSubmit,
    control: controlPlot,
    setValue: setPlotValue,
    formState: { errors: plotErrors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      text: ''
    }
  })

  const onSubmitDescription: SubmitHandler<FormDataText> = useCallback(async (data) => {
    console.log(data)
  }, [])
  const onSubmitPlot: SubmitHandler<FormDataText> = useCallback(async (data) => {
    console.log(data)
  }, [])

  const closeDescription = useCallback(() => {
    setDescription(false)
  }, [])
  const openDescription = useCallback(() => {
    setDescriptionValue('text', campaign.description)
    setDescription(true)
  }, [campaign.description, setDescriptionValue])

  const closePlot = useCallback(() => {
    setPlot(false)
  }, [])
  const openPlot = useCallback(() => {
    setPlotValue('text', campaign.plot)
    setPlot(true)
  }, [campaign.plot, setPlotValue])

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

  const chunkedDescription = shrinkText(campaign.description)
  const chunkedPlot = shrinkText(campaign.plot)

  return <Stack display='flex' width='calc(100% - 250px)'>
    <TextAreaDialog
      open={description}
      control={controlDescription}
      errors={descriptionErrors}
      onSubmit={onSubmitDescription}
      handleSubmit={handleDescriptionSubmit}
      close={closeDescription}
    />
    <TextAreaDialog
      open={plot}
      control={controlPlot}
      errors={plotErrors}
      onSubmit={onSubmitPlot}
      handleSubmit={handlePlotSubmit}
      close={closePlot}
    />
    <Box display='flex' width='100%' flexDirection='column' boxShadow={1} height='67px'>
      <Typography fontSize='3rem' alignSelf='center'>{campaign.name}</Typography>
    </Box>
    <Box width='98%' alignSelf='center' flexDirection='column' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <Box display='flex' width='100%' flexDirection='column' minHeight='80px' maxHeight='250px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {
          campaign.description === ''
            ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography>{t('activeCampaign.description')}</Typography>
              <Button
                onClick={openDescription}
                variant="contained"
                endIcon={<DescriptionIcon />}
                sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px', alignSelf: 'flex-end' }}
              >
                {t('activeCampaign.descriptionButton')}
              </Button>
            </Box>
            : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography>{chunkedDescription}</Typography>
              <Button
                onClick={openDescription}
                variant="contained"
                endIcon={<ReadMoreIcon />}
                sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px', alignSelf: 'flex-end' }}
              >
                {t('activeCampaign.showMore')}
              </Button>
            </Box>
        }
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column' minHeight='80px' maxHeight='250px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {
          campaign.plot === ''
            ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography>{t('activeCampaign.plot')}</Typography>
              <Button
                onClick={openPlot}
                variant="contained"
                endIcon={<DescriptionIcon />}
                sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px', alignSelf: 'flex-end' }}
              >
                {t('activeCampaign.plotButton')}
              </Button>
            </Box>
            : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography>{chunkedPlot}</Typography>
              <Button
                onClick={openPlot}
                variant="contained"
                endIcon={<ReadMoreIcon />}
                sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px', alignSelf: 'flex-end' }}
              >
                {t('activeCampaign.showMore')}
              </Button>
            </Box>
        }
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column' minHeight='80px' maxHeight='150px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {
          campaign.groups.length === 0
            ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography>{t('activeCampaign.noGroups')}</Typography>
              <Button
                variant="contained"
                endIcon={<GroupAddIcon />}
                sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px', alignSelf: 'flex-end' }}
              >
                {t('activeCampaign.addGroupButton')}
              </Button>
            </Box>
            : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography>{t('activeCampaign.groups')}</Typography>
              <Box display='flex' gap='3vw' justifyContent='flex-end'>
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
        <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
          <Button
            variant="contained"
            endIcon={<FontAwesomeIcon icon={faMapLocationDot} />}
            sx={{ boxShadow: 4, width: '25wv', maxWidth: '300px', alignSelf: 'flex-end' }}
          >
            {t('activeCampaign.addLocationButton')}
          </Button>
          {
            campaign.placesOfInterest.map(point =>
              <Typography key={point.id}>{point.name}</Typography>
            )
          }
        </Box>
      </Box>
    </Box>
  </Stack >
}

export default Campaign
