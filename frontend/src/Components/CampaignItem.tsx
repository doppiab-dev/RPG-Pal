import { type FC, Fragment } from 'react'
import { Divider, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type UseFormSetValue } from 'react-hook-form'
import StatusIcon from './StatusIcon'
import EditIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteIcon from '@mui/icons-material/DeleteForever'

interface CampaignItemProps {
  campaign: CampaignListItem
  activeCampaign: number
  openEditCampaign: (id: number) => void
  openDeleteCampaign: (id: number) => void
  setActiveCampaign: (id: number) => void
  setValue: UseFormSetValue<EditCampaignInputs>
}

const CampaignItem: FC<CampaignItemProps> = ({ campaign, openEditCampaign, openDeleteCampaign, setValue, setActiveCampaign, activeCampaign }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return <Fragment>
    <ListItemButton
      onClick={() => { setActiveCampaign(campaign.id) }}
      sx={{
        gap: '1vw',
        color: campaign.id === activeCampaign
          ? theme.palette.primary.contrastText
          : theme.palette.primary.main,
        backgroundColor: campaign.id === activeCampaign
          ? theme.palette.primary.main
          : 'transparent',
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          '& .MuiListItemText-secondary': {
            color: theme.palette.primary.contrastText
          },
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.contrastText
          }
        }
      }}
      data-testid="campaign-item"
    >
      <ListItemText
        primary={campaign.name}
        secondary={`${campaign.groups} ${t('campaign.groups')}
        ${t('campaign.status')} ${t(`campaign.${campaign.status}`)}`}
        sx={{
          '& .MuiListItemText-secondary': {
            color: campaign.id === activeCampaign
              ? theme.palette.primary.contrastText
              : theme.palette.text.secondary
          }
        }}
        data-testid="campaign-text"
      />
      <ListItemIcon sx={{ display: 'flex', minWidth: 0 }}>
        <StatusIcon status={campaign.status} />
      </ListItemIcon>
      <ListItemIcon
        sx={{
          display: 'flex',
          minWidth: 0,
          color: campaign.id === activeCampaign
            ? theme.palette.primary.contrastText
            : theme.palette.primary.main
        }}
        onClick={(e) => {
          e.stopPropagation()
          setValue('campaign', campaign.name)
          setValue('status', campaign.status)
          openEditCampaign(campaign.id)
        }}
        data-testid="edit-campaign-button"
      >
        <EditIcon />
      </ListItemIcon>
      <ListItemIcon
        sx={{
          display: 'flex',
          minWidth: 0,
          color: campaign.id === activeCampaign
            ? theme.palette.primary.contrastText
            : theme.palette.primary.main
        }}
        onClick={(e) => {
          e.stopPropagation()
          openDeleteCampaign(campaign.id)
        }}
        data-testid="delete-campaign-button"
      >
        <DeleteIcon />
      </ListItemIcon>
    </ListItemButton>
    <Divider />
  </Fragment>
}

export default CampaignItem
