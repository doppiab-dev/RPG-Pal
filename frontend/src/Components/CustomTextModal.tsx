import { type FC } from 'react'
import { Controller, type Control, type FieldError, type UseFormHandleSubmit, type SubmitHandler } from 'react-hook-form'
import { Modal, Box, Typography, TextField, Button, capitalize } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface CustomTextModalProps {
  onClose: () => void
  handleSubmit: UseFormHandleSubmit<any>
  onSubmit: SubmitHandler<any>
  open: boolean
  control: Control<any>
  errors: FieldError | undefined
  name: string
  icon: JSX.Element
  editText?: string
  title?: string
}

const CustomTextModal: FC<CustomTextModalProps> = ({
  open,
  onClose,
  handleSubmit,
  onSubmit,
  icon,
  control,
  errors,
  name,
  editText,
  title
}) => {
  const { t } = useTranslation()

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-modal"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography id="edit-modal" variant="h6" component="h2">
          {title ?? t('editModal.title')}
        </Typography>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)} id={name}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  label={capitalize(name)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={Boolean(errors)}
                  helperText={errors?.message ?? ''}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  endIcon={icon}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {editText ?? t('editModal.edit')}
                </Button>
              </>
            )}
          />
        </form>
      </Box>
    </Modal>
  )
}

export default CustomTextModal
