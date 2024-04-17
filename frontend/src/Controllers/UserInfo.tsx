import { Fragment, useCallback, useState, type FC } from 'react'
import { Modal, Box, Typography, Paper, IconButton, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { clearUserState, deleteTheUser, selectToken, selectUsername } from '../Store/users'
import { faCheck, faUserXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { clearMasterState } from '../Store/master'
import { clearPlayerState } from '../Store/player'
import useGoogleLoginWithRedux from '../Hooks/useGoogleLoginWithRedux'
import Username from './Username'
import ConfirmationDialog from '../Components/ConfirmationDialog'
import * as ls from '../Utils/ls'

interface UserInfoProps {
  onClose: () => void
  open: boolean
  text?: string
  title?: string
}

const UserInfo: FC<UserInfoProps> = ({
  onClose,
  open,
  text,
  title
}) => {
  const { t } = useTranslation()
  const { logOut } = useGoogleLoginWithRedux()
  const dispatch = useAppDispatch()

  const [openDialog, setOpenDialog] = useState(false)

  const username = useAppSelector(selectUsername)
  const token = useAppSelector(selectToken)

  const handleLogOut = useCallback(() => {
    dispatch(clearUserState())
    dispatch(clearPlayerState())
    dispatch(clearMasterState())

    ls.del('rpgPal')
    logOut()
  }, [dispatch, logOut])

  const handleDelete = useCallback(async () => {
    await dispatch(deleteTheUser({ token }))
    setOpenDialog(false)
    onClose()
    handleLogOut()
  }, [dispatch, handleLogOut, onClose, token])

  const closeDelete = useCallback(() => {
    setOpenDialog(false)
  }, [])

  const openDelete = useCallback(() => {
    setOpenDialog(true)
  }, [])

  return <Fragment>
    <ConfirmationDialog
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      confirm={handleDelete}
      undo={closeDelete}
      open={Boolean(openDialog)}
      title={t('userInfo.deleteTitle')}
      dialogText={t('userInfo.deleteText')}
    />
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-info-modal"
      data-testid="user-info"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          p: 4
        }}
        component={Paper}
      >
        <Typography variant="h6" component="h2" data-testid="user-info-title">
          {title ?? t('userInfo.title')}
        </Typography>
        <Typography data-testid="user-info-text">
          {text ?? t('userInfo.text')}
        </Typography>
        <Typography variant="h6" component="h2" data-testid="user-info-title" mt='2vh'>
          {title ?? t('userInfo.changeUsername')}
        </Typography>
        <Username
          username={username ?? ''}
          style={{ flexDirection: 'row', marginTop: '2vh' }}
        >
          <IconButton type="submit" sx={{ display: 'flex', alignSelf: 'center', marginBottom: '2vw' }}>
            <FontAwesomeIcon icon={faCheck} />
          </IconButton>
        </Username>
        <Box display='flex' width='100%' justifyContent='center' flexDirection='column'>
          <Typography variant="h6" component="h2" data-testid="user-info-title" mt='2vh'>
            {title ?? t('userInfo.deleteTitle')}
          </Typography>
          <Typography data-testid="user-info-delete">
            {t('userInfo.deleteText')}
          </Typography>
          <Button
            onClick={openDelete}
            variant="contained"
            color="primary"
            data-testid="update-username-button"
            sx={{ mt: 3, fontWeight: 800, boxShadow: 10 }}
            endIcon={<FontAwesomeIcon icon={faUserXmark} />}
            size='large'
          >
            {t('userInfo.delete')}
          </Button>
        </Box>
      </Box>
    </Modal>
  </Fragment>
}

export default UserInfo
