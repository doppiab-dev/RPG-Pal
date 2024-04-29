import { type FC } from 'react'
import { TextField, Button, Typography, Divider, Box, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { type Control, Controller, type FieldErrors, type SubmitHandler, type UseFormHandleSubmit } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Send, Cancel } from '@mui/icons-material'

interface TextAreaDialogProps {
  open: boolean
  control: Control<FormDataText>
  errors: FieldErrors<FormDataText>
  title?: string
  body?: string
  button?: string
  cancelText?: string
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
  cancelText,
  cancel,
  handleSubmit,
  close,
  onSubmit
}) => {
  const { t } = useTranslation()

  return <Dialog open={open} onClose={close} fullWidth>
    <DialogTitle data-testid="textArea-title" variant="h4" gutterBottom align="center" padding='16px 24px 0 16px'>
      {title ?? t('textArea.title')}
    </DialogTitle>
    <Divider />
    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
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
                rows={6}
                margin="normal"
                error={Boolean(errors.text)}
                helperText={errors.text?.message}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<Cancel />}
          onClick={cancel}
        >
          {cancelText ?? t('textArea.cancel')}
        </Button>
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
  </Dialog >
}

export default TextAreaDialog
