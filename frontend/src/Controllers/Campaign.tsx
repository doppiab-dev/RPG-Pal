import { useCallback, useEffect, useState, type FC } from 'react'
import { Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PlacesOfInterestEnum, parseErrorMessage, schema, PlacesOfInterestValues, cleanStyle } from '../Utils/f'
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
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { sanitize } from 'dompurify'
import { replaceDomNode, textToHtml } from '../Utils'
import { type SubmitHandler, useForm } from 'react-hook-form'
import parse from 'html-react-parser'
import CampaignTabs from './Tabs'
import Loader from '../Components/Loader'
import TextAreaDialog from '../Components/TextAreaDialog'
import ErrorComponent from '../Components/Error'
import CustomOptionsModal from '../Components/CustomOptionsModal'
import Title from '../Components/Title'
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
    parent: yup.string().test({
      name: 'parentValidation',
      message: t('campaign.parentNotValid'),
      test: function (value: string | undefined, context: yup.TestContext) {
        const { type } = context.parent
        if (value !== undefined && value !== '' && type !== '' && type !== undefined) {
          return PlacesOfInterestValues[points[Number(value)].place] < PlacesOfInterestValues[(type as PlacesOfInterestType)]
        }

        return true
      }
    })
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
    getValues: getDescriptionValues,
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
    getValues: getPlotValues,
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
    watch,
    formState: { errors }
  } = useForm<PointOfInterestCreateInputs>({
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
  const updateDescriptionValue = useCallback((text: string) => {
    const value = getDescriptionValues('text')
    setDescriptionValue('text', `${value} ${text}`)
  }, [getDescriptionValues, setDescriptionValue])

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
  const updatePlotValue = useCallback((text: string) => {
    const value = getPlotValues('text')
    setPlotValue('text', `${value} ${text}`)
  }, [getPlotValues, setPlotValue])
  const printPlot = useCallback(() =>
    textToHtml(parse(cleanStyle(sanitize(campaign.plot)), {
      replace: replaceDomNode()
    })), [campaign.plot])
  const printDescription = useCallback(() =>
    textToHtml(parse(cleanStyle((sanitize(campaign.description))), {
      replace: replaceDomNode()
    })), [campaign.description])
  const openCreate = useCallback(() => {
    setCreate(true)
  }, [])
  const closeCreate = useCallback(() => {
    setCreate(false)
    reset()
  }, [reset])
  const onSubmitCreate: SubmitHandler<PointOfInterestCreateInputs> = useCallback(async (data) => {
    try {
      const name = data.text ?? ''
      const parent = data.parent === '' || data.parent === undefined ? null : data.parent
      const type = data.type as PlacesOfInterestType
      await dispatch(createAPoi({ name, parent, token, id: activeCampaign, type }))
      setCreate(false)
      reset()
    } catch (e) {
      const msg = parseErrorMessage((e))
      dispatch(setErrorMessage(msg))
    }
  }, [activeCampaign, dispatch, reset, token])

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

  const selectedParent = watch('parent')
  const selectedType = watch('type')

  if (campaignInfoStatus === 'loading') return <Loader />
  if (campaignInfoStatus === 'error') return <ErrorComponent clearError={clearError} msg={errorMessage} />

  const { points, roots } = campaign.placesOfInterest

  const parentOptions: Option[] = []
  for (const key in points) {
    const typeSelected = selectedType !== '' && selectedType !== undefined
    parentOptions.push({
      id: String(key),
      name: points[key].name,
      disabled: typeSelected
        ? PlacesOfInterestValues[points[key].place] >= (PlacesOfInterestValues[(selectedType as PlacesOfInterestType)])
        : false
    })
  }
  parentOptions.unshift({ id: '', name: t('placesOfInterest.clear') })

  const typeOptions = Object.keys(PlacesOfInterestEnum).reduce<Option[]>((options, location) => {
    const parentSelected = selectedParent !== '' && selectedParent !== undefined
    options = options.length === 0
      ? [{
        id: location,
        name: t(`placesOfInterest.${location}`),
        disabled: parentSelected
          ? PlacesOfInterestValues[points[Number(selectedParent)].place] >= (PlacesOfInterestValues[(location as PlacesOfInterestType)])
          : false
      }]
      : [...options, {
        id: location,
        name: t(`placesOfInterest.${location}`),
        disabled: parentSelected
          ? PlacesOfInterestValues[points[Number(selectedParent)].place] >= (PlacesOfInterestValues[(location as PlacesOfInterestType)])
          : false
      }]

    return options
  }, [])

  return <Stack display='flex' width='calc(100% - 250px)'>
    {/* add/edit description Dialog */}
    <TextAreaDialog
      open={description}
      control={controlDescription}
      errors={descriptionErrors}
      onSubmit={onSubmitDescription}
      handleSubmit={handleDescriptionSubmit}
      close={closeDescription}
      cancel={cancelDescription}
      printPdf={printDescription}
      filename={`${campaign.name} description`}
      body={t('activeCampaign.descriptionBody')}
      title={t('activeCampaign.descriptionTitle')}
      text={campaign.description}
      defaultEditMode={!Boolean(campaign.description)}
      setValue={updateDescriptionValue}
      testId='description'
    />
    {/* add/edit plot Dialog */}
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
      setValue={updatePlotValue}
      printPdf={printPlot}
      filename={`${campaign.name} plot`}
      testId='plot'
    />
    {/* add/edit location Dialog */}
    <CustomOptionsModal
      onClose={closeCreate}
      handleSubmit={handleSubmit}
      onSubmit={onSubmitCreate}
      open={create}
      control={control}
      firstError={errors?.text}
      secondError={errors?.type}
      thirdError={errors?.parent}
      options={typeOptions}
      thirdOptions={parentOptions}
      icon={<FontAwesomeIcon icon={faMapLocationDot} />}
      name="text"
      firstLabel="Name"
      secondLabel='type'
      thirdLabel='parent'
      title={t('placesOfInterest.createLocation')}
      editText={t('placesOfInterest.create')}
    />
    <Title name={campaign.name} />
    <CampaignTabs
      openDescription={openDescription}
      campaign={campaign}
      openPlot={openPlot}
      openCreate={openCreate}
      roots={roots}
      points={points}
      activeCampaign={activeCampaign}
    />
  </Stack>
}

export default Campaign
