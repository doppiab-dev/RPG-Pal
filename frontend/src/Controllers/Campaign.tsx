import { useCallback, useEffect, useState, type FC } from 'react'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { parseErrorMessage, shrinkText } from '../Utils/f'
import { fetchACampaign, selectCampaign, selectCampaignInfoStatus, setErrorMessage, upsertADescription, upsertAPlot } from '../Store/master'
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
    text: yup.string()
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
    reset: resetDescription,
    setError: setDescriptionError,
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
    reset: resetPlot,
    setError: setPlotError,
    formState: { errors: plotErrors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      text: ''
    }
  })

  const onSubmitDescription: SubmitHandler<FormDataText> = useCallback(async (data) => {
    try {
      const description = data.text ?? ''
      await dispatch(upsertADescription({ token, description, id: activeCampaign }))
      setDescription(false)
      resetDescription()
    } catch (e) {
      const msg = parseErrorMessage((e))
      setDescriptionError('text', { type: 'custom', message: msg ?? 'validation failed' }, { shouldFocus: true })
    }
  }, [activeCampaign, dispatch, resetDescription, setDescriptionError, token])
  const onSubmitPlot: SubmitHandler<FormDataText> = useCallback(async (data) => {
    try {
      const plot = data.text ?? ''
      await dispatch(upsertAPlot({ token, plot, id: activeCampaign }))
      setPlot(false)
      resetPlot()
    } catch (e) {
      const msg = parseErrorMessage((e))
      setPlotError('text', { type: 'custom', message: msg ?? 'validation failed' }, { shouldFocus: true })
    }
  }, [activeCampaign, dispatch, resetPlot, setPlotError, token])

  const closeDescription = useCallback(() => {
    setDescription(false)
  }, [])
  const openDescription = useCallback(() => {
    setDescriptionValue('text', campaign.description)
    setDescription(true)
  }, [campaign.description, setDescriptionValue])
  const cancelDescription = useCallback(() => {
    resetDescription()
  }, [resetDescription])

  const closePlot = useCallback(() => {
    setPlot(false)
  }, [])
  const openPlot = useCallback(() => {
    setPlotValue('text', campaign.plot)
    setPlot(true)
  }, [campaign.plot, setPlotValue])
  const cancelPlot = useCallback(() => {
    resetPlot()
  }, [resetPlot])

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
      cancel={cancelDescription}
      body={t('activeCampaign.descriptionBody')}
      title={t('activeCampaign.descriptionTitle')}
    />
    <TextAreaDialog
      open={plot}
      control={controlPlot}
      errors={plotErrors}
      onSubmit={onSubmitPlot}
      handleSubmit={handlePlotSubmit}
      close={closePlot}
      cancel={cancelPlot}
      body={t('activeCampaign.plotBody')}
      title={t('activeCampaign.plotTitle')}
    />
    <Box display='flex' width='100%' flexDirection='column' boxShadow={1} height='67px'>
      <Typography fontSize='3rem' alignSelf='center'>{campaign.name}</Typography>
    </Box>
    <Box width='98%' alignSelf='center' flexDirection='column' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <Box display='flex' width='100%' flexDirection='column' minHeight='80px' maxHeight='250px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {
          campaign.description === ''
            ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography>{t('activeCampaign.noDescription')}</Typography>
              <Button
                onClick={openDescription}
                variant="contained"
                endIcon={<DescriptionIcon />}
                sx={{
                  boxShadow: 4,
                  width: '15vw',
                  maxWidth: '180px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  height: '5vh',
                  alignSelf: 'flex-end'
                }}
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
                sx={{
                  boxShadow: 4,
                  width: '15vw',
                  maxWidth: '180px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  height: '5vh',
                  alignSelf: 'flex-end'
                }}
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
              <Typography>{t('activeCampaign.noPlot')}</Typography>
              <Button
                onClick={openPlot}
                variant="contained"
                endIcon={<DescriptionIcon />}
                sx={{
                  boxShadow: 4,
                  width: '15vw',
                  maxWidth: '180px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  height: '5vh',
                  alignSelf: 'flex-end'
                }}
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
                sx={{
                  boxShadow: 4,
                  width: '15vw',
                  maxWidth: '180px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  height: '5vh',
                  alignSelf: 'flex-end'
                }}
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
                sx={{
                  boxShadow: 4,
                  width: '15vw',
                  maxWidth: '180px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  height: '5vh',
                  alignSelf: 'flex-end'
                }}
              >
                {t('activeCampaign.addGroupButton')}
              </Button>
            </Box>
            : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography>{t('activeCampaign.groups')}</Typography>
              <Box display='flex' gap='3vw' justifyContent='space-between'>
                <Box display='flex' gap='3vw' justifyContent='flex-end'>
                  {
                    campaign.groups.map(group =>
                      <Button
                        variant="contained"
                        endIcon={<FontAwesomeIcon icon={faPeopleGroup} />}
                        sx={{ boxShadow: 4, width: '15vw', maxWidth: '180px', textOverflow: 'ellipsis', overflow: 'hidden', height: '5vh' }}
                        key={group.id}
                      >
                        {group.name}
                      </Button>
                    )
                  }
                </Box>
                <Button
                  variant="contained"
                  endIcon={<GroupAddIcon />}
                  sx={{ boxShadow: 4, width: '15vw', maxWidth: '180px', textOverflow: 'ellipsis', overflow: 'hidden', height: '5vh' }}
                >
                  {t('activeCampaign.addGroupButton')}
                </Button>
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
            sx={{
              boxShadow: 4,
              width: '15vw',
              maxWidth: '180px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              height: '5vh',
              alignSelf: 'flex-end'
            }}
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
