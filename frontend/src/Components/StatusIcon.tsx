import { type FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

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

export default StatusIcon
