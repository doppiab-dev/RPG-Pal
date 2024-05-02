import { useCallback, useEffect, useState, type FC } from 'react'
import {
  Box,
  Button,
  Divider,
  List,
  Stack,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PlacesOfInterestEnum, buttonStyle, parseErrorMessage, shrinkText, schema } from '../Utils/f'
import {
  clearMasterState,
  createAPoi,
  fetchACampaign,
  selectCampaign,
  selectCampaignInfoStatus,
  selectErrorMessage,
  setErrorMessage,
  upsertADescription,
  upsertAPlot
} from '../Store/master'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectToken } from '../Store/users'
import { faMapLocationDot, faPeopleGroup, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { GroupAdd } from '@mui/icons-material'
import { type SubmitHandler, useForm } from 'react-hook-form'
import PointOfInterest from './PointOfInterest'
import Loader from '../Components/Loader'
import TextAreaDialog from '../Components/TextAreaDialog'
import ErrorComponent from '../Components/Error'
import Text from '../Components/Text'
import CustomOptionsModal from '../Components/CustomOptionsModal'
import * as yup from 'yup'

interface CampaignProps {
  activeCampaign: number
}

const Campaign: FC<CampaignProps> = ({ activeCampaign }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const schemaPOI = yup.object().shape({
    text: yup.string()
      .required(t('campaign.validationErrorRequired'))
      .max(32, t('campaign.validationErrorTooLong'))
      .trim(),
    type: yup.string()
      .required(t('campaign.typeValidationErrorRequired'))
      .oneOf(['world', 'continent', 'region', 'area', 'city', 'camp', 'neighborhood', 'point'], t('campaign.validationErrorInvalidType')),
    parent: yup.string()
      .required(t('campaign.parentValidationErrorRequired'))
  })

  const [description, setDescription] = useState<boolean>(false)
  const [plot, setPlot] = useState<boolean>(false)
  const [create, setCreate] = useState<boolean>(false)

  const token = useAppSelector(selectToken)
  const campaignInfoStatus = useAppSelector(selectCampaignInfoStatus)
  const campaign = useAppSelector(selectCampaign)
  const errorMessage = useAppSelector(selectErrorMessage)

  const {
    handleSubmit: handleDescriptionSubmit,
    control: controlDescription,
    setValue: setDescriptionValue,
    reset: resetDescription,
    setError: setDescriptionError,
    formState: { errors: descriptionErrors }
  } = useForm<FormDataText>({
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
  } = useForm<FormDataText>({
    resolver: yupResolver(schema),
    defaultValues: {
      text: ''
    }
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<PointOfInterestInputs>({
    resolver: yupResolver(schemaPOI),
    defaultValues: {
      text: '',
      parent: '',
      type: ''
    }
  })

  const onSubmitDescription: SubmitHandler<FormDataText> = useCallback(async (data) => {
    try {
      const description = data.text ?? ''
      await dispatch(upsertADescription({ token, description, id: activeCampaign }))
      setDescription(false)
    } catch (e) {
      const msg = parseErrorMessage((e))
      setDescriptionError('text', { type: 'custom', message: msg ?? 'validation failed' }, { shouldFocus: true })
    }
  }, [activeCampaign, dispatch, setDescriptionError, token])
  const onSubmitPlot: SubmitHandler<FormDataText> = useCallback(async (data) => {
    try {
      const plot = data.text ?? ''
      await dispatch(upsertAPlot({ token, plot, id: activeCampaign }))
      setPlot(false)
    } catch (e) {
      const msg = parseErrorMessage((e))
      setPlotError('text', { type: 'custom', message: msg ?? 'validation failed' }, { shouldFocus: true })
    }
  }, [activeCampaign, dispatch, setPlotError, token])

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

  const openCreate = useCallback(() => {
    setCreate(true)
  }, [])
  const closeCreate = useCallback(() => {
    reset()
    setCreate(false)
  }, [reset])
  const onSubmitCreate: SubmitHandler<PointOfInterestInputs> = useCallback(async (data) => {
    try {
      const name = data.text ?? ''
      const parent = data.parent ?? null
      const type = data.type ?? ''
      await dispatch(createAPoi({ name, parent, token, id: activeCampaign, type }))
      setCreate(false)
    } catch (e) {
      const msg = parseErrorMessage((e))
      dispatch(setErrorMessage(msg))
    }
  }, [activeCampaign, dispatch, token])

  const clearError = useCallback(() => {
    dispatch(clearMasterState())
    navigate('/home')
  }, [dispatch, navigate])

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
  if (campaignInfoStatus === 'error') return <ErrorComponent clearError={clearError} msg={errorMessage} />

  const chunkedDescription = shrinkText(campaign.description)
  const chunkedPlot = shrinkText(campaign.plot)
  const { points, roots } = campaign.placesOfInterest

  const options: Option[] = []
  for (const key in points) {
    options.push({
      id: String(key),
      name: points[key].name
    })
  }

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
      text={campaign.description}
      defaultEditMode={!Boolean(campaign.description)}
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
      text={campaign.plot}
      defaultEditMode={!Boolean(campaign.plot)}
    />
    <CustomOptionsModal
      onClose={closeCreate}
      handleSubmit={handleSubmit}
      onSubmit={onSubmitCreate}
      open={create}
      control={control}
      firstError={errors?.text}
      secondError={errors?.parent}
      thirdError={errors?.type}
      options={options}
      thirdOptions={Object.keys(PlacesOfInterestEnum).map(location => ({
        id: location,
        name: t(`placesOfInterest.${location}`)
      }))}
      icon={<FontAwesomeIcon icon={faMapLocationDot} />}
      name="text"
      firstLabel="Name"
      secondLabel="parent"
      thirdLabel='type'
      title={t('placesOfInterest.createLocation')}
      editText={t('placesOfInterest.create')}
    />
    <Box display='flex' width='100%' flexDirection='column' boxShadow={1} height='67px'>
      <Typography fontSize='3rem' alignSelf='center'>{campaign.name}</Typography>
    </Box>
    <Box width='98%' alignSelf='center' flexDirection='column' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <Box display='flex' width='100%' flexDirection='column' minHeight='80px' maxHeight='250px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <Typography variant="h6" component="h2">{t('activeCampaign.description')}</Typography>
        <Text
          emptyText={t('activeCampaign.noDescription')}
          open={openDescription}
          text={campaign.description}
          chunked={chunkedDescription}
          button={t('activeCampaign.descriptionButton')}
          showMore={t('activeCampaign.showMore')}
        />
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column' minHeight='80px' maxHeight='250px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <Typography variant="h6" component="h2">{t('activeCampaign.plot')}</Typography>
        <Text
          emptyText={t('activeCampaign.noPlot')}
          open={openPlot}
          text={campaign.plot}
          chunked={chunkedPlot}
          button={t('activeCampaign.plotButton')}
          showMore={t('activeCampaign.showMore')}
        />
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column' minHeight='80px' maxHeight='150px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <Typography variant="h6" component="h2">{t('activeCampaign.group')}</Typography>
        {
          campaign.groups.length === 0
            ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
              <Typography>{t('activeCampaign.noGroups')}</Typography>
              <Button
                variant="contained"
                startIcon={<FontAwesomeIcon icon={faPlus} />}
                endIcon={<GroupAdd />}
                sx={{
                  boxShadow: 4,
                  alignSelf: 'flex-end',
                  ...buttonStyle
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
                        sx={{ boxShadow: 4, ...buttonStyle }}
                        key={group.id}
                      >
                        {group.name}
                      </Button>
                    )
                  }
                </Box>
                <Button
                  variant="contained"
                  endIcon={<GroupAdd />}
                  startIcon={<FontAwesomeIcon icon={faPlus} />}
                  sx={{ boxShadow: 4, ...buttonStyle }}
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
          <Box display='flex' flexDirection='row' justifyContent='space-between'>
            <Typography variant="h6" component="h2">{t('activeCampaign.location')}</Typography>
            <Button
              variant="contained"
              endIcon={<FontAwesomeIcon icon={faMapLocationDot} />}
              startIcon={<FontAwesomeIcon icon={faPlus} />}
              sx={{
                boxShadow: 4,
                alignSelf: 'flex-end',
                ...buttonStyle
              }}
              onClick={openCreate}
            >
              {t('activeCampaign.addLocationButton')}
            </Button>
          </Box>
          <List>
            {roots.map(point => <PointOfInterest key={point} point={point} points={points} defaultOpen activeCampaign={activeCampaign} />)}
          </List>
        </Box>
      </Box>
    </Box>
  </Stack>
}

export default Campaign
