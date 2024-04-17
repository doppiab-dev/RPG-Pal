import { type FC } from 'react'
import { Modal, Box, Typography, Paper, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectUsername } from '../Store/users'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Username from './Username'

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
  const username = useSelector(selectUsername)

  return <Modal
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
      <Username
        username={username ?? ''}
        style={{ flexDirection: 'row', marginTop: '2vh' }}
      >
        <IconButton type="submit" sx={{ display: 'flex', alignSelf: 'center', marginBottom: '2vw' }}>
          <FontAwesomeIcon icon={faCheck} />
        </IconButton>
      </Username>
    </Box>
  </Modal >
}

export default UserInfo
