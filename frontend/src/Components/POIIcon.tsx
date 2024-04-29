import { type FC } from 'react'
import { faBuildingFlag, faGlobe, faLocationPin, faMap, faMountain, faShop, faTents, faTreeCity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface POIIconProps {
  place: PlacesOfInterestType
}

const POIIcon: FC<POIIconProps> = ({ place }) => {
  switch (place) {
    case 'world':
      return <FontAwesomeIcon icon={faGlobe} />
    case 'continent':
      return <FontAwesomeIcon icon={faMap} />
    case 'region':
      return <FontAwesomeIcon icon={faLocationPin} />
    case 'city':
      return <FontAwesomeIcon icon={faTreeCity} />
    case 'camp':
      return <FontAwesomeIcon icon={faTents} />
    case 'area':
      return <FontAwesomeIcon icon={faMountain} />
    case 'neighborhood':
      return <FontAwesomeIcon icon={faBuildingFlag} />
    case 'point':
      return <FontAwesomeIcon icon={faShop} />
  }
}

export default POIIcon
