import { type FC } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { shrinkText } from '../Utils/f'
import Text from './Text'

interface PlotProps {
  openPlot: () => void
  plot: string
}

const Plot: FC<PlotProps> = ({ plot, openPlot }) => {
  const { t } = useTranslation()

  return <Box display='flex' flexDirection='column' minHeight='80px' maxHeight='250px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
    <Typography variant="h6" component="h2">{t('activeCampaign.plot')}</Typography>
    <Text
      emptyText={t('activeCampaign.noPlot')}
      open={openPlot}
      chunked={shrinkText(plot)}
      button={t('activeCampaign.plotButton')}
      showMore={t('activeCampaign.showMore')}
      testId='plot'
      editMode={plot === ''} />
  </Box>
}

export default Plot
