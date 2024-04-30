import { useCallback, useState, type FC } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  type SxProps,
  type Theme
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PlacesOfInterestValues, parseErrorMessage } from '../Utils/f'
import { yupResolver } from '@hookform/resolvers/yup'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextAreaDialog from '../Components/TextAreaDialog'
import Text from '../Components/Text'
import POIIcon from '../Components/POIIcon'
import * as yup from 'yup'

interface PointOfInterestProps {
  point: number
  points: Record<number, PlaceOfInterestPoint>
  style?: SxProps<Theme>
  defaultOpen?: boolean
}

const PointOfInterest: FC<PointOfInterestProps> = ({ point, points, style, defaultOpen = false }) => {
  const { t } = useTranslation()

  const schema = yup.object().shape({
    text: yup.string()
  })

  const {
    handleSubmit, control, setValue, reset, setError, formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      text: ''
    }
  })

  const [open, setOpen] = useState<boolean>(defaultOpen)
  const [openDescriptionEdit, setOpenDescriptionEdit] = useState<boolean>(false)

  const handleClick = useCallback(() => {
    setOpen(!open)
  }, [open])
  const closeDescription = useCallback(() => {
    setOpenDescriptionEdit(false)
  }, [])
  const openDescription = useCallback(() => {
    setValue('text', points[point].description)
    setOpenDescriptionEdit(true)
  }, [point, points, setValue])
  const cancelDescription = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit: SubmitHandler<FormDataText> = useCallback(async (data) => {
    try {
      const description = data.text ?? ''
      console.log('update poi description', description)
      setOpenDescriptionEdit(false)
    } catch (e) {
      const msg = parseErrorMessage((e))
      setError('text', { type: 'custom', message: msg ?? 'validation failed' }, { shouldFocus: true })
    }
  }, [setError])

  const pointOfInterest = points[point]

  return <Box display='flex' flexDirection='column' sx={{ ...style }}>
    <TextAreaDialog
      open={openDescriptionEdit}
      control={control}
      errors={errors}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      close={closeDescription}
      cancel={cancelDescription}
      body={t('activeCampaign.poiBody')}
      title={t('activeCampaign.poiTitle')}
    />
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <POIIcon place={pointOfInterest.place} />
      </ListItemIcon>
      <ListItemText primary={pointOfInterest.name} secondary={t(`placesOfInterest.${pointOfInterest.place}`)} />
      <ExpandIcon size={pointOfInterest.children.length} open={open} />
    </ListItemButton>
    {
      <Box display='flex' flexDirection='row' justifyContent='flex-end'>
        {
          pointOfInterest.place !== 'point' &&
          <ButtonGroup variant="text">
            {
              Object.keys(PlacesOfInterestValues).map(key =>
                PlacesOfInterestValues[pointOfInterest.place] < PlacesOfInterestValues[key as PlaceOfInterestPoint['place']]
                  ? <Button
                    sx={{ fontSize: '0.8rem' }}
                    startIcon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: '0.8rem' }} />}
                    key={key}
                  >
                    {t(`placesOfInterest.${key}`)}
                  </Button>
                  : null
              )
            }
          </ButtonGroup>
        }
      </Box>
    }
    <Text
      open={openDescription}
      chunked={pointOfInterest.description}
      text={pointOfInterest.description}
      emptyText={t('activeCampaign.POInoDescription') + t(`placesOfInterest.${pointOfInterest.place}`) + t('activeCampaign.POInoDescription2')}
      button={t('activeCampaign.descriptionButton')}
      showMore={t('activeCampaign.editDescription')}
    />
    <Divider />
    {
      pointOfInterest.children.map(child =>
        <Collapse in={open} timeout="auto" unmountOnExit key={child}>
          <PointOfInterest point={child} points={points} style={{ pl: 2 }} />
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
