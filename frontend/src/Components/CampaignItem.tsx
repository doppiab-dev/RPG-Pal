import { type FC, Fragment } from 'react'
import { Divider, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type UseFormSetValue } from 'react-hook-form'
import StatusIcon from './StatusIcon'
import EditIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteIcon from '@mui/icons-material/DeleteForever'

interface ItemProps {
  campaign: Campaign
  activeCampaign: number
  openEditCampaign: (id: number) => void
  openDeleteCampaign: (id: number) => void
  setActiveCampaign: (id: number) => void
  setValue: UseFormSetValue<EditCampaignInputs>
}

const CampaignItem: FC<ItemProps> = ({ campaign, openEditCampaign, openDeleteCampaign, setValue, setActiveCampaign, activeCampaign }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return <Fragment>
    <ListItemButton
      onClick={() => { setActiveCampaign(campaign.id) }}
      sx={{
        gap: '1vw',
        color: campaign.id === activeCampaign
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
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
        }} />
      <ListItemIcon sx={{ display: 'flex', minWidth: 0 }}>
        <StatusIcon status={campaign.status} />
      </ListItemIcon>
      <ListItemIcon
        sx={{
          display: 'flex',
          minWidth: 0,
          color: campaign.id === activeCampaign
            ? theme.palette.primary.contrastText
            : theme.palette.text.primary
        }}
        onClick={(e) => {
          e.stopPropagation()
          setValue('campaign', campaign.name)
          setValue('status', campaign.status)
          openEditCampaign(campaign.id)
        }}
      >
        <EditIcon />
      </ListItemIcon>
      <ListItemIcon
        sx={{
          display: 'flex',
          minWidth: 0,
          color: campaign.id === activeCampaign
            ? theme.palette.primary.contrastText
            : theme.palette.text.primary
        }}
        onClick={(e) => {
          e.stopPropagation()
          openDeleteCampaign(campaign.id)
        }}
      >
        <DeleteIcon />
      </ListItemIcon>
    </ListItemButton>
    <Divider />
  </Fragment>
}

export default CampaignItem
