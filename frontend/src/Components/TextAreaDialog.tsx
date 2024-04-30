import { type FC } from 'react'
import { TextField, Button, Typography, Divider, Box, Dialog, DialogContent, DialogTitle, DialogActions, IconButton } from '@mui/material'
import { type Control, Controller, type FieldErrors, type SubmitHandler, type UseFormHandleSubmit } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Send, Close } from '@mui/icons-material'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type TextAreaDialogProps = WithChildren & {
  open: boolean
  control: Control<FormDataText>
  errors: FieldErrors<FormDataText>
  title?: string
  body?: string
  button?: string
  close: () => void
  cancel: () => void
  handleSubmit: UseFormHandleSubmit<FormDataText>
  onSubmit: SubmitHandler<FormDataText>
}

const TextAreaDialog: FC<TextAreaDialogProps> = ({
  open,
  control,
  errors,
  body,
  button,
  title,
  children,
  cancel,
  handleSubmit,
  close,
  onSubmit
}) => {
  const { t } = useTranslation()

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
    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <DialogContent>
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
                rows={Boolean(children) ? 20 : 25}
                margin="dense"
                error={Boolean(errors.text)}
                helperText={errors.text?.message}
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
        {children}
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<Send />}
          type="submit"
        >
          {button ?? t('textArea.button')}
        </Button>
      </DialogActions>
    </form>
  </Dialog>
}

export default TextAreaDialog
