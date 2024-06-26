import { type FC } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ConfirmationDialogProps {
  undo: () => void
  confirm: () => void
  open: boolean
  title?: string
  dialogText?: string
  cancelButtonText?: string
  confirmButtonText?: string
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  confirm,
  undo,
  open,
  title,
  dialogText,
  cancelButtonText,
  confirmButtonText
}) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={undo}>
      <DialogTitle data-testid="confirmationDialog-title">{title ?? t('confirmationDialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText data-testid="confirmationDialog-text">{dialogText ?? t('confirmationDialog.dialogText')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={undo} color="primary" data-testid="confirmationDialog-cancel">
          {cancelButtonText ?? t('confirmationDialog.cancelButtonText')}
        </Button>
        <Button onClick={confirm} color="primary" data-testid="confirmationDialog-confirm">
          {confirmButtonText ?? t('confirmationDialog.confirmButtonText')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
