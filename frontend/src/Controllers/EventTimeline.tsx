import { Fragment, useCallback, useState, type FC } from 'react'
import { IconButton, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Event, EditCalendar } from '@mui/icons-material'
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab'
import { type SubmitHandler, useForm, Controller, type Control } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { parseErrorMessage } from '../Utils/f'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { deleteATimelineEvent, setErrorMessage, upsertATimelineEvent } from '../Store/master'
import { selectToken } from '../Store/users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import TextAreaDialog from '../Components/TextAreaDialog'
import ConfirmationDialog from '../Components/ConfirmationDialog'
import CustomOptionsModal from '../Components/CustomOptionsModal'
import * as yup from 'yup'

interface EventTimelineProps {
  campaign: Campaign
}

const EventTimeline: FC<EventTimelineProps> = ({ campaign }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)

  const [timeline, setTimeline] = useState<number | null>(null)
  const [position, setPosition] = useState<number | null>(null)
  const [deleting, setDeleting] = useState<boolean>(false)

  const schema = yup.object().shape({
    text: yup.string().trim(),
    name: yup.string()
      .required(t('timeline.validationErrorRequired'))
      .max(32, t('timeline.nameValidationErrorTooLong'))
      .trim(),
    date: yup.string().matches(/^\d+(?:-\d+){0,2}$/, t('timeline.invalidDate'))
  })
  const schemaCreate = yup.object().shape({
    text: yup.string().trim(),
    name: yup.string()
      .required(t('timeline.validationErrorRequired'))
      .max(32, t('timeline.nameValidationErrorTooLong'))
      .trim(),
    date: yup.string()
      .required(t('timeline.invalidDate'))
      .matches(/^\d+(?:-\d+){0,2}$/, t('timeline.invalidDate'))
  })

  const upsertEvent = useCallback(async (id: number) => {
    setTimeline(id)
  }, [])
  const deleteEvent = useCallback(() => {
    setDeleting(true)
  }, [])
  const closeDelete = useCallback(() => {
    setDeleting(false)
  }, [])
  const handleDelete = useCallback(async () => {
    if (timeline === null) return

    await dispatch(deleteATimelineEvent({ token, id: campaign.id, event: timeline }))
    setTimeline(null)
    setPosition(null)
  }, [campaign.id, dispatch, timeline, token])

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    getValues,
    formState: { errors }
  } = useForm<TimelineInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      date: '',
      text: ''
    }
  })

  const {
    handleSubmit: handleSubmitCreate,
    control: controlCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate }
  } = useForm<TimelineInputsCreate>({
    resolver: yupResolver(schemaCreate),
    defaultValues: {
      text: '',
      date: '',
      name: ''
    }
  })

  const onSubmit: SubmitHandler<TimelineInputs> = useCallback(async (data) => {
    try {
      const date = data.date ?? ''
      const name = data.name ?? ''
      const description = data.text ?? ''
      await dispatch(upsertATimelineEvent({
        token,
        id: campaign.id,
        position,
        name,
        description,
        date,
        event: timeline
      }))

      setTimeline(null)
      // reset()
    } catch (e) {
      const msg = parseErrorMessage((e))
      setError('text', { type: 'custom', message: msg ?? 'validation failed' }, { shouldFocus: true })
    }
  }, [campaign.id, dispatch, position, setError, timeline, token])

  const setText = useCallback((text: string) => {
    const value = getValues('text')
    setValue('text', `${value} ${text}`)
  }, [getValues, setValue])
  const closeEdit = useCallback(() => {
    setTimeline(null)
  }, [])
  const cancel = useCallback(() => {
    setValue('text', '')
  }, [setValue])

  const openCreate = useCallback((position: number) => {
    setPosition(position)
  }, [])
  const closeCreate = useCallback(() => {
    setPosition(null)
    resetCreate()
  }, [resetCreate])
  const onSubmitCreate: SubmitHandler<TimelineInputsCreate> = useCallback(async (data) => {
    try {
      console.log('data', data)
      const description = data.text ?? ''
      const name = data.name
      const date = data.date ?? ''
      await dispatch(upsertATimelineEvent({ name, date, id: campaign.id, description, token, position, event: null }))
      setPosition(null)
      resetCreate()
    } catch (e) {
      const msg = parseErrorMessage((e))
      dispatch(setErrorMessage(msg))
    }
  }, [campaign.id, dispatch, position, resetCreate, token])

  return <Fragment>
    {/* Delete Timeline */}
    <ConfirmationDialog
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      confirm={handleDelete}
      undo={closeDelete}
      open={deleting}
      title={t('timeline.deleteTitle')}
      dialogText={t('timeline.deleteText')}
    />
    {/* create location Dialog */}
    <CustomOptionsModal
      onClose={closeCreate}
      handleSubmit={handleSubmitCreate}
      onSubmit={onSubmitCreate}
      open={position !== null}
      control={controlCreate}
      firstError={errorsCreate?.name}
      icon={<FontAwesomeIcon icon={faCalendarPlus} />}
      name="name"
      firstLabel="Name"
      title={t('timeline.createTitle')}
      editText={t('timeline.createText')}
    >
      <Controller
        name='text'
        control={controlCreate}
        render={({ field }) =>
          <TextField
            {...field}
            label={t('timeline.descriptionLabel')}
            variant="outlined"
            margin="normal"
            fullWidth
            error={Boolean(errorsCreate.text)}
            helperText={errorsCreate.text?.message ?? ''}
            data-testid='description-text'
          />
        }
      />
      <Controller
        name='date'
        control={controlCreate}
        render={({ field }) =>
          <TextField
            {...field}
            label={t('timeline.dateLabel')}
            variant="outlined"
            margin="normal"
            fullWidth
            error={Boolean(errorsCreate.date)}
            helperText={errorsCreate.date?.message ?? ''}
            data-testid='date-text'
            inputProps={{
              inputMode: 'numeric'
            }}
          />
        }
      />
    </CustomOptionsModal>
    {/* edit/delete Timeline Dialog */}
    <TextAreaDialog
      open={timeline !== null}
      control={control as unknown as Control<FormDataText>}
      errors={errors}
      onSubmit={onSubmit as SubmitHandler<FormDataText>}
      handleSubmit={handleSubmit}
      close={closeEdit}
      cancel={cancel}
      body={t('timeline.textBody')}
      title={t('timeline.textTitle')}
      text=''
      testId='timeline'
      setValue={setText}
      defaultEditMode
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      deleteValue={deleteEvent}
    >
      <Controller
        name='name'
        control={control}
        render={({ field }) =>
          <TextField
            {...field}
            label={t('timeline.nameLabel')}
            variant="outlined"
            margin="normal"
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message ?? ''}
            data-testid='name-text'
          />
        }
      />
      <Controller
        name='date'
        control={control}
        render={({ field }) =>
          <TextField
            {...field}
            label={t('timeline.dateLabel')}
            variant="outlined"
            margin="normal"
            fullWidth
            error={Boolean(errors.date)}
            helperText={errors.date?.message ?? ''}
            data-testid='date-text'
            inputProps={{
              inputMode: 'numeric'
            }}
          />
        }
      />
    </TextAreaDialog>
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          {/* eslint-disable-next-line @typescript-eslint/no-floating-promises */}
          <IconButton onClick={() => { openCreate((campaign.timeline.length === 0 ? 0 : campaign.timeline[0].position - 1)) }}>
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
                onClick={() => {
                  setValue('name', event.name)
                  setValue('text', event.description)
                  setValue('date', event.date)
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  upsertEvent(event.id)
                }}
                color={event.position % 2 === 0 ? 'primary' : 'secondary'}
                sx={{ cursor: 'pointer' }}
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
              {/* eslint-disable-next-line @typescript-eslint/no-floating-promises */}
              <IconButton onClick={() => { openCreate(event.position + 1) }}>
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
  </Fragment>
}

export default EventTimeline
