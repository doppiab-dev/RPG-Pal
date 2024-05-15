import { useCallback, useState, type FC } from 'react'
import {
  TextField,
  Button,
  Typography,
  Divider,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  ButtonGroup
} from '@mui/material'
import { type Control, Controller, type FieldErrors, type SubmitHandler, type UseFormHandleSubmit } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Send, Close } from '@mui/icons-material'
import { faTimes, faEdit, faChevronLeft, faHeading, faUnderline, faItalic, faBold, faTextHeight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { buttonStyle } from '../Utils/f'
import HtmlParser from './HtmlParser'

type TextAreaDialogProps = WithChildren & {
  open: boolean
  control: Control<FormDataText>
  errors: FieldErrors<FormDataText>
  title?: string
  body?: string
  button?: string
  text: string
  defaultEditMode?: boolean
  testId: string
  close: () => void
  cancel: () => void
  handleSubmit: UseFormHandleSubmit<FormDataText>
  onSubmit: SubmitHandler<FormDataText>
  setValue: (text: string) => void
}

const TextAreaDialog: FC<TextAreaDialogProps> = ({
  open,
  control,
  errors,
  body,
  button,
  title,
  text,
  children,
  testId,
  defaultEditMode = false,
  cancel,
  handleSubmit,
  close,
  onSubmit,
  setValue
}) => {
  const { t } = useTranslation()

  const [editMode, setEditMode] = useState<boolean>(defaultEditMode)

  const openReadMode = useCallback(() => {
    setEditMode(false)
  }, [])

  const openEditMode = useCallback(() => {
    setEditMode(true)
  }, [])

  const getRows = useCallback(() => {
    if (!Boolean(children)) return 29
    if (Array.isArray(children)) return 21

    return Boolean((children as any)?.props?.children) ? 22 : 25
  }, [children])

  return <Dialog
    open={open}
    onClose={close}
    data-testid="textArea-dialog"
    fullScreen
  >
    <DialogTitle data-testid="textArea-title" variant="h4" gutterBottom align="center" padding='16px 24px 0 16px'>
      {title ?? t('textArea.title')}
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={close}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8
      }}
    >
      <Close />
    </IconButton>
    <Divider />
    {
      editMode
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ? <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
          <DialogContent sx={{ p: '12px 24px 0 24px' }}>
            <Typography>
              {body ?? t('textArea.body')}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Controller
                name='text'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={getRows()}
                    margin="dense"
                    error={Boolean(errors.text)}
                    helperText={errors.text?.message}
                    data-testid={`${testId}-text`}
                    InputProps={{
                      ...field,
                      endAdornment:
                        <IconButton onClick={cancel} edge="end">
                          <FontAwesomeIcon icon={faTimes} data-testid="clear-username" />
                        </IconButton>
                    }}
                  />
                )}
              />
            </Box>
            <ButtonGroup sx={{ display: 'flex', marginLeft: '2vw' }} variant="outlined">
              <Button
                sx={{ fontSize: '0.8rem' }}
                startIcon={<FontAwesomeIcon icon={faHeading} style={{ fontSize: '0.8rem' }} />}
                onClick={() => { setValue('<h2> </h2>') }}
                data-testid={`add-edit-${testId}-title`}
              >
                {t('textArea.addTitle')}
              </Button>
              <Button
                sx={{ fontSize: '0.8rem' }}
                startIcon={<FontAwesomeIcon icon={faTextHeight} style={{ fontSize: '0.8rem' }} />}
                onClick={() => { setValue('<h3> </h3>') }}
                data-testid={`add-edit-${testId}-subtitle`}
              >
                {t('textArea.addSubtitle')}
              </Button>
              <Button
                sx={{ fontSize: '0.8rem' }}
                startIcon={<FontAwesomeIcon icon={faBold} style={{ fontSize: '0.8rem' }} />}
                onClick={() => { setValue('<b> </b>') }}
                data-testid={`add-edit-${testId}-bold`}
              >
                {t('textArea.bold')}
              </Button>
              <Button
                sx={{ fontSize: '0.8rem' }}
                startIcon={<FontAwesomeIcon icon={faItalic} style={{ fontSize: '0.8rem' }} />}
                onClick={() => { setValue('<i> </i>') }}
                data-testid={`add-edit-${testId}-italic`}
              >
                {t('textArea.italic')}
              </Button>
              <Button
                sx={{ fontSize: '0.8rem' }}
                startIcon={<FontAwesomeIcon icon={faUnderline} style={{ fontSize: '0.8rem' }} />}
                onClick={() => { setValue('<u> </u>') }}
                data-testid={`add-edit-${testId}-underlined`}
              >
                {t('textArea.underlined')}
              </Button>
            </ButtonGroup>
            {children}
          </DialogContent>
          <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<FontAwesomeIcon icon={faChevronLeft} />}
              onClick={openReadMode}
              data-testid={`open-read-${testId}-button`}
              sx={{ ...buttonStyle }}
            >
              {t('textArea.read')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<Send />}
              type="submit"
              sx={{ ...buttonStyle }}
            >
              {button ?? t('textArea.button')}
            </Button>
          </DialogActions>
        </form>
        : <DialogContent>
          <HtmlParser style={{ whiteSpace: 'break-spaces' }} testId={testId}>{text}</HtmlParser>
          <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<FontAwesomeIcon icon={faEdit} data-testid="edit-mode" />}
              onClick={openEditMode}
              sx={{ ...buttonStyle }}
              data-testid={`open-edit-${testId}-button`}
            >
              {t('textArea.edit')}
            </Button>
          </DialogActions>
        </DialogContent>
    }
  </Dialog>
}

export default TextAreaDialog
