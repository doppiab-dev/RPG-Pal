import { type FC } from 'react'
import { TextField, Button, Typography, Divider, Box, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { type Control, Controller, type FieldErrors, type SubmitHandler, type UseFormHandleSubmit } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SendIcon from '@mui/icons-material/Send'

interface TextAreaDialogProps {
  open: boolean
  control: Control<FormDataText>
  errors: FieldErrors<FormDataText>
  title?: string
  body?: string
  button?: string
  close: () => void
  handleSubmit: UseFormHandleSubmit<FormDataText>
  onSubmit: SubmitHandler<FormDataText>
}

const TextAreaDialog: FC<TextAreaDialogProps> = ({ open, control, errors, body, button, title, handleSubmit, close, onSubmit }) => {
  const { t } = useTranslation()

  return <Dialog open={open} onClose={close} fullWidth>
    <DialogTitle data-testid="textArea-title" variant="h4" gutterBottom align="center" padding='16px 24px 0 16px'>
      {title ?? t('textArea.title')}
    </DialogTitle>
    <Divider />
    <DialogContent>
      <Typography>
        {body ?? t('textArea.body')}
      </Typography>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SendIcon />}
            type="submit"
          >
            {button ?? t('textArea.button')}
          </Button>
        </Box>
      </form>
    </DialogContent>
  </Dialog>
}

export default TextAreaDialog
