import { type FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { buttonStyle } from '../Utils/f'
import { faPeopleGroup, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GroupAdd } from '@mui/icons-material'

interface GroupsProps {
  groups: CampaignGroupDTO[]
}

const Groups: FC<GroupsProps> = ({ groups }) => {
  const { t } = useTranslation()

  return <Box display='flex' flexDirection='column' minHeight='80px' maxHeight='150px' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
    <Typography variant="h6" component="h2">{t('activeCampaign.group')}</Typography>
    {groups.length === 0
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
          data-testid="add-group-button"
        >
          {t('activeCampaign.addGroupButton')}
        </Button>
      </Box>
      : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
        <Typography>{t('activeCampaign.groups')}</Typography>
        <Box display='flex' gap='3vw' justifyContent='space-between'>
          <Box display='flex' gap='3vw' justifyContent='flex-end'>
            {groups.map((group, i) => <Button
              variant="contained"
              endIcon={<FontAwesomeIcon icon={faPeopleGroup} />}
              sx={{ boxShadow: 4, ...buttonStyle }}
              key={group.id}
              data-testid={`group-${i}-button`}
            >
              {group.name}
            </Button>
            )}
          </Box>
          <Button
            variant="contained"
            endIcon={<GroupAdd />}
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            sx={{ boxShadow: 4, ...buttonStyle }}
            data-testid="add-group-button"
          >
            {t('activeCampaign.addGroupButton')}
          </Button>
        </Box>
      </Box>}
  </Box>
}

export default Groups
