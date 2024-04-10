import { type FC, useCallback, useEffect, Fragment, useState } from 'react'
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon, faPause, faCheck, faXmark, faDice } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import {
  clearMasterState,
  createACampaign,
  retrieveMasterInfo,
  selectCampaigns,
  selectCampaignsInfoStatus,
  selectErrorMessage,
  setErrorMessage
} from '../Store/master'
import { clearUserState, selectToken } from '../Store/users'
import { parseErrorMessage } from '../Utils/f'
import { clearPlayerState } from '../Store/player'
import { useNavigate } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import NewIcon from '@mui/icons-material/FiberNew'
import useGoogleLoginWithRedux from '../Hooks/useGoogleLoginWithRedux'
import ImageLayout from '../Components/ImageLayout'
import Loader from '../Components/Loader'
import ErrorComponent from '../Components/Error'
import CustomTextModal from '../Components/CustomTextModal'
import bg from '../Images/rpg_pal.jpeg'
import * as ls from '../Utils/ls'
import * as Yup from 'yup'

const Campaign: FC = () => {
  const { t } = useTranslation()
  const { logOut } = useGoogleLoginWithRedux()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createCampaign, setCreateCampaign] = useState<boolean>(false)

  const token = useAppSelector(selectToken)
  const campaignsStatus = useAppSelector(selectCampaignsInfoStatus)
  const campaingsInfo = useAppSelector(selectCampaigns)
  const errorMessage = useAppSelector(selectErrorMessage)

  const {
    control: controlCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate }
  } = useForm<CampaignInputs>({
    resolver: yupResolver(Yup.object().shape({
      campaign: Yup.string()
        .required(t('campaign.validationErrorRequired'))
        .max(32, t('campaign.validationErrorTooLong'))
        .trim()
        .test('safe-string', t('campaign.validationErrorInvalid'), (value) => !((value !== null && value !== undefined) && /[<>&'"]/.test(value)))
    })),
    defaultValues: {
      campaign: ''
    }
  })

  const clearError = useCallback(() => {
    dispatch(clearMasterState())
  }, [dispatch])

  const goToHome = useCallback(() => {
    navigate('/home')
  }, [navigate])

  const handleLogOut = useCallback(() => {
    dispatch(clearUserState())
    dispatch(clearPlayerState())
    dispatch(clearMasterState())

    ls.del('rpgPal')
    logOut()
  }, [dispatch, logOut])

  const openCreateCampaign = useCallback(() => {
    setCreateCampaign(true)
  }, [])

  const closeCreateCampaign = useCallback(() => {
    resetCreate()
    setCreateCampaign(false)
  }, [resetCreate])

  const onSubmitCreate: SubmitHandler<CampaignInputs> = useCallback(async (data) => {
    try {
      await dispatch(createACampaign({ name: data.campaign, token }))
      setCreateCampaign(false)
      resetCreate()
    } catch (e) {
      const msg = parseErrorMessage((e))
      dispatch(setErrorMessage(msg))
    }
  }, [dispatch, resetCreate, token])

  useEffect(() => {
    (async () => {
      try {
        await dispatch(retrieveMasterInfo({ token }))
      } catch (e) {
        const msg = parseErrorMessage((e))
        dispatch(setErrorMessage(msg))
      }
    })()
      .catch(e => {
        const msg = parseErrorMessage((e))
        dispatch(setErrorMessage(msg))
      })
  }, [token, dispatch])

  if (campaignsStatus === 'loading') return <Loader />
  if (campaignsStatus === 'error') return <ErrorComponent clearError={clearError} msg={errorMessage} />

  return <Stack display='flex' width='100vw' height='100vh' flexDirection='row' overflow='hidden'>
    <CustomTextModal
      onClose={closeCreateCampaign}
      handleSubmit={handleSubmitCreate}
      onSubmit={onSubmitCreate}
      open={createCampaign}
      control={controlCreate}
      icon={<FontAwesomeIcon icon={faDice} />}
      errors={errorsCreate?.campaign}
      title={t('campaign.create')}
      editText={t('campaign.createButton')}
      name="campaign"
    />
    <Box
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
    >
      <List sx={{
        width: '100%',
        height: '100%'
      }}>
        <ListItem sx={{ paddingBottom: '16px', height: '66px' }}>
          <ListItemText
            sx={{ my: 0 }}
            primary={t('campaign.title')}
            primaryTypographyProps={{
              fontSize: '2rem',
              letterSpacing: 0
            }}
          />
          <ListItemIcon sx={{ fontSize: '1.5rem', color: theme.palette.primary.main }}>
            <FontAwesomeIcon icon={faDragon} />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <Box display='flex' flexDirection='column' height='calc(100% - 59px)' justifyContent='space-between'>
          <Box display='flex' flexDirection='column'>
            {
              campaingsInfo.length === 0
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
                  >
                    <ListItemText>{t('campaign.new')}</ListItemText>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        color: theme.palette.primary.main
                      }}
                    >
                      <NewIcon />
                    </ListItemIcon>
                  </ListItemButton>
                  <Divider />
                </Fragment>
                : campaingsInfo.map(campaign =>
                  <Item campaign={campaign} key={campaign.id} />
                )
            }
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
              onClick={goToHome}
            >
              <ListItemText>{t('campaign.home')}</ListItemText>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: theme.palette.primary.main
                }}
              >
                <HomeIcon />
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
            >
              <ListItemText>{t('campaign.logout')}</ListItemText>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: theme.palette.primary.main
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
            </ListItemButton>
          </Box>
        </Box>
      </List>
    </Box>
    <ImageLayout
      url={bg}
      style={{ width: 'calc(100% - 250px)', height: '100%', backgroundColor: 'unset' }}
    />
  </Stack>
}

export default Campaign

interface ItemProps {
  campaign: Campaign
}

const Item: FC<ItemProps> = ({ campaign }) => {
  const activeCampaign = 0
  const { t } = useTranslation()
  const theme = useTheme()

  return <Fragment>
    <ListItemButton sx={{
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
        }
      }
    }}>
      <ListItemText
        primary={campaign.name}
        secondary={`${campaign.groups} ${t('campaign.groups')}
      ${t('campaign.status')} ${t(`campaign.${campaign.status}`)}
      `}
      />
      <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
        <StatusIcon status={campaign.status} />
      </ListItemIcon>
    </ListItemButton>
    <Divider />
  </Fragment>
}

interface StatusIconProps {
  status: CampaignStatus
}

const StatusIcon: FC<StatusIconProps> = ({ status }) => {
  switch (status) {
    case 'active': {
      return <FontAwesomeIcon icon={faCheck} color='green' />
    }
    case 'ended': {
      return <FontAwesomeIcon icon={faXmark} color='red' />
    }
    case 'on_hold': {
      return <FontAwesomeIcon icon={faPause} color='goldenrod' />
    }
  }
}
