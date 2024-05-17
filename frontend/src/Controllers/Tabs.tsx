import { type FC, useCallback, useState, type SyntheticEvent } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Divider, Tab } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Description from '../Components/Description'
import Plot from '../Components/Plot'
import Groups from '../Components/Groups'
import PointsOfInterest from '../Components/PointsOfInterestProps'
import EventTimeline from './EventTimeline'

interface CampaignTabsProps {
  campaign: Campaign
  activeCampaign: number
  roots: number[]
  points: Record<number, PlaceOfInterestPoint>
  openDescription: () => void
  openPlot: () => void
  openCreate: () => void
}

type TabTypes = '' | 'notes' | 'groups' | 'poi' | 'events'

const CampaignTabs: FC<CampaignTabsProps> = ({ activeCampaign, campaign, openCreate, openDescription, openPlot, points, roots }) => {
  const { t } = useTranslation()
  const [tab, setTab] = useState<TabTypes>('')

  const handleChange = useCallback((_: SyntheticEvent, newValue: TabTypes) => {
    setTab(newValue)
  }, [])

  return <Box width='98%' alignSelf='center' height='calc(100% - 67px)' flexDirection='column' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
    <Description openDescription={openDescription} description={campaign.description} />
    <Divider />
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label={t('tabs.notes')} value="note" />
          <Tab label={t('tabs.groups')} value="groups" />
          <Tab label={t('tabs.points')} value="poi" />
          <Tab label={t('tabs.events')} value="events" />
        </TabList>
      </Box>
      <TabPanel value="note">
        <Plot openPlot={openPlot} plot={campaign.plot} />
        <Divider />
      </TabPanel>
      <TabPanel value="groups">
        <Groups groups={campaign.groups} />
      </TabPanel>
      <TabPanel value="poi">
        <PointsOfInterest openCreate={openCreate} roots={roots} points={points} activeCampaign={activeCampaign} />
      </TabPanel>
      <TabPanel value="events">
        <EventTimeline campaign={campaign} />
      </TabPanel>
    </TabContext>
  </Box>
}

export default CampaignTabs
