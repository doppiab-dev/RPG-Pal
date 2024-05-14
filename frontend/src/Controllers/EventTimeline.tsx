import { Fragment, type FC } from 'react'
import { IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Event, EditCalendar } from '@mui/icons-material'
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab'

interface EventTimelineProps {
  campaign: Campaign
  addEvent: (id: number) => void
  expandEvent: (id: number) => void
}

const EventTimeline: FC<EventTimelineProps> = ({ addEvent, campaign, expandEvent }) => {
  const { t } = useTranslation()

  return <Timeline position="alternate">
    <TimelineItem>
      <TimelineSeparator>
        <TimelineConnector />
        <IconButton onClick={() => { addEvent((campaign.timeline.length === 0 ? 0 : campaign.timeline[0].position - 1)) }}>
          <EditCalendar />
        </IconButton>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent alignContent='center'>
        <Typography variant="h6">{t('timeline.title')}</Typography>
      </TimelineContent>
    </TimelineItem>
    {
      campaign.timeline.length > 0 && campaign.timeline.map(event => <Fragment key={event.id}>
        <TimelineItem>
          <TimelineOppositeContent alignContent='center'>
            <Typography>{event.date}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color={event.position % 2 === 0 ? 'primary' : 'secondary'}
              sx={{ cursor: 'pointer' }}
              onClick={() => { expandEvent(event.id) }}
            >
              <Event />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent alignContent='center'>
            <Typography variant="h6">{event.name}</Typography>
            <Typography>{event.description}</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <IconButton onClick={() => { addEvent(event.position + 1) }}>
              <EditCalendar />
            </IconButton>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent alignContent='center'>
            <Typography variant="h6">{t('timeline.title')}</Typography>
          </TimelineContent>
        </TimelineItem>
      </Fragment>
      )
    }
  </Timeline>
}

export default EventTimeline
