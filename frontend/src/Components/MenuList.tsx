import { type FC, Fragment } from 'react'
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { InfoOutlined, Logout, Home, FiberNew } from '@mui/icons-material'
import { type UseFormSetValue } from 'react-hook-form'
import Item from './CampaignItem'

interface MenuListProps {
  campaingsInfo: Campaigns
  activeCampaign: number
  openCreateCampaign: () => void
  openEditCampaign: (id: number) => void
  openDeleteCampaign: (id: number) => void
  setValue: UseFormSetValue<EditCampaignInputs>
  setCampaign: (id: number) => void
  openUserInfo: () => void
  goToHome: () => void
  handleLogOut: () => void
}

const MenuList: FC<MenuListProps> = ({
  activeCampaign, campaingsInfo, goToHome, handleLogOut, openCreateCampaign, openDeleteCampaign, openEditCampaign, openUserInfo, setCampaign, setValue
}) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      width: '250px',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper
    }}
    component={Paper}
    elevation={10}
    data-testid="campaign-component"
  >
    <List
      sx={{
        width: '100%',
        height: '100%',
        padding: 0
      }}
      data-testid="campaign-list"
    >
      <ListItem sx={{ paddingBottom: '16px', height: '66px' }}>
        <ListItemText
          sx={{ my: 0 }}
          primary={t('campaign.title')}
          primaryTypographyProps={{
            fontSize: '2rem',
            letterSpacing: 0
          }}
          data-testid="campaign-list-title" />
        <ListItemIcon sx={{ fontSize: '1.5rem', color: theme.palette.primary.main }}>
          <FontAwesomeIcon icon={faDragon} data-testid="campaign-list-title-icon" />
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Box display='flex' flexDirection='column' height='calc(100% - 67px)' justifyContent='space-between'>
        <Box display='flex' flexDirection='column' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
          {campaingsInfo.length === 0
            ? <Fragment>
              <ListItemButton
                onClick={openCreateCampaign}
                sx={{
                  display: 'flex',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.contrastText
                    }
                  },
                  justifyContent: 'space-between'
                }}
                data-testid="campaign-list-create"
              >
                <ListItemText data-testid="campaign-list-create-text">{t('campaign.new')}</ListItemText>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    color: theme.palette.primary.main
                  }}
                >
                  <FiberNew />
                </ListItemIcon>
              </ListItemButton>
              <Divider />
            </Fragment>
            : campaingsInfo.map(campaign => <Item
              campaign={campaign}
              key={campaign.id}
              activeCampaign={activeCampaign}
              openEditCampaign={openEditCampaign}
              openDeleteCampaign={openDeleteCampaign}
              setValue={setValue}
              setActiveCampaign={setCampaign} />
            )}
        </Box>
        <Box display='flex' flexDirection='column'>
          <Divider />
          <ListItemButton
            sx={{
              display: 'flex',
              width: '100%',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.contrastText
                }
              },
              justifyContent: 'space-between'
            }}
            onClick={openUserInfo}
            data-testid="campaign-list-user"
          >
            <ListItemText data-testid="campaign-list-user-title">{t('campaign.user')}</ListItemText>
            <ListItemIcon
              sx={{
                minWidth: 0,
                color: theme.palette.primary.main
              }}
            >
              <InfoOutlined />
            </ListItemIcon>
          </ListItemButton>
          <Divider />
          <ListItemButton
            sx={{
              display: 'flex',
              width: '100%',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.contrastText
                }
              },
              justifyContent: 'space-between'
            }}
            onClick={goToHome}
            data-testid="campaign-list-home"
          >
            <ListItemText data-testid="campaign-list-home-title">{t('campaign.home')}</ListItemText>
            <ListItemIcon
              sx={{
                minWidth: 0,
                color: theme.palette.primary.main
              }}
            >
              <Home />
            </ListItemIcon>
          </ListItemButton>
          <Divider />
          <ListItemButton
            sx={{
              display: 'flex',
              width: '100%',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.contrastText
                }
              },
              justifyContent: 'space-between'
            }}
            onClick={handleLogOut}
            data-testid="campaign-list-logout"
          >
            <ListItemText data-testid="campaign-list-logout-text">{t('campaign.logout')}</ListItemText>
            <ListItemIcon
              sx={{
                minWidth: 0,
                color: theme.palette.primary.main
              }}
            >
              <Logout />
            </ListItemIcon>
          </ListItemButton>
        </Box>
      </Box>
    </List>
  </Box>
}

export default MenuList
