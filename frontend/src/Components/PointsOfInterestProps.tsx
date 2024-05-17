import { type FC } from 'react'
import { Box, Button, List, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { buttonStyle } from '../Utils/f'
import { faMapLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PointOfInterest from '../Controllers/PointOfInterest'

interface PointsOfInterestProps {
  roots: number[]
  points: Record<number, PlaceOfInterestPoint>
  activeCampaign: number
  openCreate: () => void
}

const PointsOfInterest: FC<PointsOfInterestProps> = ({ activeCampaign, openCreate, points, roots }) => {
  const { t } = useTranslation()

  return <Box display='flex' flexDirection='column'>
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
          data-testid="add-location-button"
        >
          {t('activeCampaign.addLocationButton')}
        </Button>
      </Box>
      <List>
        {roots.map(point => <PointOfInterest key={point} point={point} points={points} defaultOpen activeCampaign={activeCampaign} />)}
      </List>
    </Box>
  </Box>
}

export default PointsOfInterest
