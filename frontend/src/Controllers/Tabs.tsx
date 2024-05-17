import { type FC, useCallback, type SyntheticEvent } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Divider, Tab } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectTabs, setTabs } from '../Store/master'
import EventTimeline from './EventTimeline'
import Description from '../Components/Description'
import Plot from '../Components/Plot'
import Groups from '../Components/Groups'
import PointsOfInterest from '../Components/PointsOfInterestProps'

interface CampaignTabsProps {
  campaign: Campaign
  activeCampaign: number
  roots: number[]
  points: Record<number, PlaceOfInterestPoint>
  openDescription: () => void
  openPlot: () => void
  openCreate: () => void
}

const CampaignTabs: FC<CampaignTabsProps> = ({ activeCampaign, campaign, openCreate, openDescription, openPlot, points, roots }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const tab = useAppSelector(selectTabs)

  const onChange = useCallback((_: SyntheticEvent, newValue: TabTypes) => {
    dispatch(setTabs(newValue))
  }, [dispatch])

  return <Box width='98%' alignSelf='center' height='calc(100% - 67px)' flexDirection='column' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
    <Description openDescription={openDescription} description={campaign.description} />
    <Divider />
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={onChange}>
          <Tab label={t('tabs.notes')} value="notes" data-testid='notes' />
          <Tab label={t('tabs.groups')} value="groups" data-testid='groups' />
          <Tab label={t('tabs.points')} value="points" data-testid='points' />
          <Tab label={t('tabs.events')} value="events" data-testid='events' />
        </TabList>
      </Box>
      <TabPanel value="notes">
        <Plot openPlot={openPlot} plot={campaign.plot} />
      </TabPanel>
      <TabPanel value="groups">
        <Groups groups={campaign.groups} />
      </TabPanel>
      <TabPanel value="points">
        <PointsOfInterest openCreate={openCreate} roots={roots} points={points} activeCampaign={activeCampaign} />
      </TabPanel>
      <TabPanel value="events">
        <EventTimeline id={campaign.id} timelineEvents={campaign.timeline} />
      </TabPanel>
    </TabContext>
  </Box>
}

export default CampaignTabs
