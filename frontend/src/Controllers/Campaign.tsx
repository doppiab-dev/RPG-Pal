import { type FC, useEffect } from 'react'
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { retrieveMasterInfo, setErrorMessage } from '../Store/master'
import { selectToken } from '../Store/users'
import { parseErrorMessage } from '../Utils/f'
import ImageLayout from '../Components/ImageLayout'
import bg from '../Images/rpg_pal.jpeg'

const Campaign: FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)

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

  return <Stack display='flex' width='100vw' height='100vh' flexDirection='row' overflow='hidden'>
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
        <ListItem sx={{ paddingBottom: '16px' }}>
          <ListItemText
            sx={{ my: 0 }}
            primary={t('campaign.title')}
            primaryTypographyProps={{
              fontSize: '2rem',
              letterSpacing: 0
            }}
          />
          <ListItemIcon sx={{ fontSize: '1.5rem', color: theme.palette.primary.main }}><FontAwesomeIcon icon={faDragon} /></ListItemIcon>
        </ListItem>
        <Divider />
      </List>
    </Box>
    <ImageLayout
      url={bg}
      style={{ width: 'calc(100% - 250px)', height: '100%', backgroundColor: 'unset' }}
    />
  </Stack>
}

export default Campaign
