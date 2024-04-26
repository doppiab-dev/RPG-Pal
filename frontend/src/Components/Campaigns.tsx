import { type FC } from 'react'
import Campaign from '../Controllers/Campaign'
import ImageLayout from './ImageLayout'
import bg from '../Images/rpg_pal.jpeg'

interface CampaignsProps {
  activeCampaign: number
}

const Campaigns: FC<CampaignsProps> = ({ activeCampaign }) => activeCampaign === 0
  ? <ImageLayout
    url={bg}
    style={{ width: 'calc(100% - 250px)', height: '100%', backgroundColor: 'unset' }} />
  : <Campaign activeCampaign={activeCampaign} />

export default Campaigns
