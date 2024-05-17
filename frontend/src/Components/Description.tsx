import { type FC } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { shrinkText } from '../Utils/f'
import Text from './Text'

interface DescriptionProps {
  description: string
  openDescription: () => void
}

const Description: FC<DescriptionProps> = ({ description, openDescription }) => {
  const { t } = useTranslation()

  return <Box
    display='flex'
    width='100%'
    flexDirection='column'
    minHeight='80px'
    maxHeight='250px'
    paddingTop='1vh'
    sx={{ overflowY: 'auto', overflowX: 'hidden' }}
  >
    <Typography variant="h6" component="h2">{t('activeCampaign.description')}</Typography>
    <Text
      emptyText={t('activeCampaign.noDescription')}
      open={openDescription}
      chunked={shrinkText(description)}
      button={t('activeCampaign.descriptionButton')}
      showMore={t('activeCampaign.showMore')}
      testId='description'
      editMode={description === ''} />
  </Box>
}

export default Description
