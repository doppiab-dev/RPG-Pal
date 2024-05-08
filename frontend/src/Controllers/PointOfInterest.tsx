import { useCallback, useState, type FC } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  type SxProps,
  type Theme
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PlacesOfInterestEnum, PlacesOfInterestValues, parseErrorMessage, schema } from '../Utils/f'
import { yupResolver } from '@hookform/resolvers/yup'
import { DeleteForever, ExpandLess, ExpandMore, ModeEditOutlineOutlined } from '@mui/icons-material'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { faMapLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { createAPoi, deleteAPoi, editAPoi, editAPoiName, setErrorMessage } from '../Store/master'
import { selectToken } from '../Store/users'
import TextAreaDialog from '../Components/TextAreaDialog'
import Text from '../Components/Text'
import POIIcon from '../Components/POIIcon'
import ConfirmationDialog from '../Components/ConfirmationDialog'
import CustomOptionsModal from '../Components/CustomOptionsModal'
import * as yup from 'yup'

interface PointOfInterestProps {
  point: number
  activeCampaign: number
  points: Record<number, PlaceOfInterestPoint>
  style?: SxProps<Theme>
  defaultOpen?: boolean
}

const PointOfInterest: FC<PointOfInterestProps> = ({ point, points, style, defaultOpen = false, activeCampaign }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)

  const schemaNotFull = yup.object().shape({
    text: yup.string(),
    parent: yup.string()
  })
  const schemaPOI = yup.object().shape({
    type: yup.string()
      .required(t('campaign.typeValidationErrorRequired'))
      .oneOf(['world', 'continent', 'region', 'area', 'city', 'camp', 'neighborhood', 'point'], t('campaign.validationErrorInvalidType')),
    parent: yup.string()
      .required(t('campaign.parentValidationErrorRequired')),
    text: yup.string()
      .required(t('campaign.validationErrorRequired'))
      .max(32, t('campaign.validationErrorTooLong'))
      .trim()
  })

  const {
    handleSubmit, control, setValue, getValues, reset, setError, formState: { errors }
  } = useForm<PointOfInterestText>({
    resolver: yupResolver(schemaNotFull),
    defaultValues: {
      text: '',
      parent: ''
    }
  })
  const {
    control: controlCreate, handleSubmit: handleSubmitCreate, formState: { errors: errorsCreate }, reset: resetCreate, setValue: setCreateValue
  } = useForm<PointOfInterestInputs>({
    resolver: yupResolver(schemaPOI),
    defaultValues: {
      text: '',
      parent: '',
      type: ''
    }
  })
  const {
    control: controlEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit }, setValue: setEditValue
  } = useForm<FormDataText>({
    resolver: yupResolver(schema),
    defaultValues: { text: '' }
  })

  const [open, setOpen] = useState<boolean>(defaultOpen)
  const [openDescriptionEdit, setOpenDescriptionEdit] = useState<boolean>(false)
  const [deletePoi, setDeletePoi] = useState<boolean>(false)
  const [editPoiName, setEditPoiName] = useState<boolean>(false)
  const [createPoi, setCreatePoi] = useState<boolean>(false)

  const handleClick = useCallback(() => {
    setOpen(!open)
  }, [open])
  const closeDescription = useCallback(() => {
    setOpenDescriptionEdit(false)
  }, [])
  const openDescription = useCallback(() => {
    const location = points[point]
    setValue('text', location.description)
    setValue('parent', location.parent === null ? '' : String(location.parent))
    setOpenDescriptionEdit(true)
  }, [point, points, setValue])
  const cancelDescription = useCallback(() => {
    reset()
  }, [reset])

  const openDeletePoi = useCallback(() => {
    setDeletePoi(true)
  }, [])
  const closeDeletePoi = useCallback(() => {
    setDeletePoi(false)
  }, [])
  const handleDelete = useCallback(async () => {
    try {
      await dispatch(deleteAPoi({ token, id: activeCampaign, poi: point }))
      setDeletePoi(false)
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [activeCampaign, dispatch, point, token])

  const openEditPoiName = useCallback(() => {
    setEditPoiName(true)
    setEditValue('text', points[point].name)
  }, [point, points, setEditValue])
  const closeEditPoiName = useCallback(() => {
    setEditPoiName(false)
  }, [])
  const onSubmitEdit: SubmitHandler<FormDataText> = useCallback(async (data) => {
    try {
      const name = data.text ?? ''
      await dispatch(editAPoiName({ name, token, id: activeCampaign, poi: point }))
      setEditPoiName(false)
    } catch (e) {
      const msg = parseErrorMessage((e))
      dispatch(setErrorMessage(msg))
    }
  }, [activeCampaign, dispatch, point, token])

  const updateDescriptionValue = useCallback((text: string) => {
    const value = getValues('text')
    setValue('text', `${value} ${text}`
    )
  }, [getValues, setValue])
  const onSubmit: SubmitHandler<PointOfInterestText> = useCallback(async (data) => {
    try {
      const description = data.text ?? ''
      const parent = data.parent === '' || data.parent === undefined ? null : data.parent
      await dispatch(editAPoi({ description, token, id: activeCampaign, poi: point, parent }))
      setOpenDescriptionEdit(false)
    } catch (e) {
      const msg = parseErrorMessage((e))
      setError('text', { type: 'custom', message: msg ?? 'validation failed' }, { shouldFocus: true })
    }
  }, [activeCampaign, dispatch, point, setError, token])

  const openCreatePoi = useCallback((type: string) => {
    setCreateValue('parent', String(point))
    setCreateValue('type', type)
    setCreatePoi(true)
  }, [point, setCreateValue])
  const closeCreatePoi = useCallback(() => {
    resetCreate()
    setCreatePoi(false)
  }, [resetCreate])
  const onSubmitCreate: SubmitHandler<PointOfInterestInputs> = useCallback(async (data) => {
    try {
      const name = data.text ?? ''
      const parent = data.parent ?? null
      const type = data.type as PlacesOfInterestType
      await dispatch(createAPoi({ name, parent, token, id: activeCampaign, type }))
      setCreatePoi(false)
    } catch (e) {
      const msg = parseErrorMessage((e))
      dispatch(setErrorMessage(msg))
    }
  }, [activeCampaign, dispatch, token])

  const options: Option[] = []
  for (const key in points) {
    options.push({
      id: String(key),
      name: points[key].name,
      disabled: PlacesOfInterestValues[points[point].place] <= PlacesOfInterestValues[points[key].place]
    })
  }

  return <Box display='flex' flexDirection='column' sx={{ ...style }}>
    <ConfirmationDialog
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      confirm={handleDelete}
      undo={closeDeletePoi}
      open={Boolean(deletePoi)}
      title={t('placesOfInterest.deleteTitle') + t(`placesOfInterest.${points[point].place}`)}
      dialogText={t('placesOfInterest.deleteText1') + points[point].name + t('placesOfInterest.deleteText2')}
    />
    <CustomOptionsModal
      onClose={closeEditPoiName}
      handleSubmit={handleSubmitEdit}
      onSubmit={onSubmitEdit}
      open={editPoiName}
      control={controlEdit}
      icon={<FontAwesomeIcon icon={faMapLocationDot} />}
      firstError={errorsEdit?.text}
      title={t('placesOfInterest.editName')}
      editText={t('placesOfInterest.edit')}
      name="text"
      firstLabel="Name"
    />
    <CustomOptionsModal
      onClose={closeCreatePoi}
      handleSubmit={handleSubmitCreate}
      onSubmit={onSubmitCreate}
      open={createPoi}
      control={controlCreate}
      firstError={errorsCreate?.text}
      secondError={errorsCreate?.type}
      thirdError={errorsCreate?.parent}
      options={Object.keys(PlacesOfInterestEnum).map(location => ({
        id: location,
        name: t(`placesOfInterest.${location}`)
      }))}
      thirdOptions={options}
      icon={<FontAwesomeIcon icon={faMapLocationDot} />}
      name="text"
      firstLabel="Name"
      secondLabel='type'
      thirdLabel='parent'
      title={t('activeCampaign.parentLabel') + points[point].name + t('activeCampaign.parentLabel2')}
      editText={t('placesOfInterest.create')}
      disabled
      thirdDisabled
    />
    <TextAreaDialog
      open={openDescriptionEdit}
      control={control}
      errors={errors}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      close={closeDescription}
      cancel={cancelDescription}
      body={t('placesOfInterest.poiBody') + points[point].name + t('placesOfInterest.poiBody2')}
      title={t('placesOfInterest.edit') + t(`placesOfInterest.${points[point].place}`)}
      text={points[point].description}
      defaultEditMode={!Boolean(points[point].description)}
      button={t('placesOfInterest.button')}
      setValue={updateDescriptionValue}
      testId='poi-description'
    >
      {
        points[point].place !== 'world' &&
        <Controller
          name='parent'
          control={control}
          render={({ field }) =>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>{t('activeCampaign.editParent')}</InputLabel>
              <Select
                {...field}
                label={t('activeCampaign.editParent')}
                error={Boolean(errors.parent)}
                data-testid='second-select'
              >
                <MenuItem value='' data-testid='option-second-default'>
                  {t('placesOfInterest.placeholder')}
                </MenuItem>
                {options.map(option => (
                  <MenuItem key={option.id} value={String(option.id)} disabled={option.disabled ?? false} data-testid={`option-second-${option.id}`}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(errors.parent) && (
                <FormHelperText error>{errors.parent?.message ?? ''}</FormHelperText>
              )}
            </FormControl>
          }
        />
      }
    </TextAreaDialog>
    <ListItemButton onClick={handleClick} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box display='flex' flexDirection='row' alignItems='center' gap='2vw'>
        <ListItemIcon>
          <POIIcon place={points[point].place} />
        </ListItemIcon>
        <ListItemText primary={points[point].name} secondary={t(`placesOfInterest.${points[point].place}`)} />
        <ListItemIcon
          sx={{ display: 'flex', minWidth: 0 }}
          onClick={(e) => {
            e.stopPropagation()
            setValue('text', points[point].name)
            openEditPoiName()
          }}
          data-testid='edit-poi-name-button'
        >
          <ModeEditOutlineOutlined />
        </ListItemIcon>
        <ListItemIcon
          sx={{ display: 'flex', minWidth: 0 }}
          onClick={(e) => {
            e.stopPropagation()
            openDeletePoi()
          }}
          data-testid='delete-poi-button'
        >
          <DeleteForever />
        </ListItemIcon>
      </Box>
      <ExpandIcon size={points[point].children.length} open={open} />
    </ListItemButton>
    {
      <Box display='flex' flexDirection='row' justifyContent='flex-end'>
        {
          points[point].place !== 'point' &&
          <ButtonGroup variant="text">
            {
              (Object.keys(PlacesOfInterestEnum)).map(location =>
                PlacesOfInterestValues[points[point].place] < PlacesOfInterestValues[location as PlaceOfInterestPoint['place']] &&
                <Button
                  sx={{ fontSize: '0.8rem' }}
                  startIcon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: '0.8rem' }} />}
                  key={location}
                  onClick={() => { openCreatePoi(location) }}
                  data-testid={`add-poi-${location}-button`}
                >
                  {t(`placesOfInterest.${location}`)}
                </Button>
              )
            }
          </ButtonGroup>
        }
      </Box>
    }
    <Text
      open={openDescription}
      chunked={points[point].description}
      text={points[point].description}
      emptyText={t('activeCampaign.POInoDescription') + t(`placesOfInterest.${points[point].place}`) + t('activeCampaign.POInoDescription2')}
      button={t('placesOfInterest.edit') + t(`placesOfInterest.${points[point].place}`)}
      showMore={t('placesOfInterest.showMore')}
      testId={`poi-description-${points[point].place}`}
    />
    <Divider />
    {
      points[point].children.map(child =>
        <Collapse in={open} timeout="auto" unmountOnExit key={child}>
          <PointOfInterest point={child} points={points} style={{ pl: 2 }} activeCampaign={activeCampaign} />
        </Collapse>
      )
    }
  </Box>
}

export default PointOfInterest

interface ExpandIconProps {
  size: number
  open: boolean
}

const ExpandIcon: FC<ExpandIconProps> = ({ size, open }) =>
  size > 0
    ? <Expand open={open} />
    : null

interface ExpandProps {
  open: boolean
}

const Expand: FC<ExpandProps> = ({ open }) => open ? <ExpandLess /> : <ExpandMore />
