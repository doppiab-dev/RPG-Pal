import { useCallback, useState, type FC } from 'react'
import {
  Box, Collapse,
  Divider, ListItemButton,
  ListItemIcon,
  ListItemText, type SxProps,
  type Theme
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { parseErrorMessage, schema } from '../Utils/f'
import { yupResolver } from '@hookform/resolvers/yup'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { type SubmitHandler, useForm } from 'react-hook-form'
import TextAreaDialog from '../Components/TextAreaDialog'
import Text from '../Components/Text'
import POIIcon from '../Components/POIIcon'

interface PointOfInterestProps {
  point: number
  points: Record<number, PlaceOfInterestPoint>
  places: Record<PlacesOfInterestType, number[]>
  style?: SxProps<Theme>
}

const PointOfInterest: FC<PointOfInterestProps> = ({ point, points, places, style }) => {
  const { t } = useTranslation()

  const {
    handleSubmit, control, setValue, reset, setError, formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      text: ''
    }
  })

  const [open, setOpen] = useState<boolean>(false)
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
      <ListItemText primary={pointOfInterest.name} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Text
      open={openDescription}
      chunked={pointOfInterest.description}
      text={pointOfInterest.description}
      emptyText={t('activeCampaign.POInoDescription')}
      button={t('activeCampaign.descriptionButton')}
      showMore={t('activeCampaign.editDescription')}
    />
    <Divider />
    {
      pointOfInterest.children.length !== 0 && pointOfInterest.children.map(child =>
        <Collapse in={open} timeout="auto" unmountOnExit key={child}>
          <PointOfInterest point={child} points={points} places={places} style={{ pl: 2 }} />
        </Collapse>
      )
    }
  </Box>
}

export default PointOfInterest
