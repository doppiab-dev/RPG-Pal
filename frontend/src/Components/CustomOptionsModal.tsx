import { type FC } from 'react'
import { Controller, type Control, type UseFormHandleSubmit, type SubmitHandler, type FieldError } from 'react-hook-form'
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  capitalize
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface CustomTextModalProps {
  onClose: () => void
  handleSubmit: UseFormHandleSubmit<any>
  onSubmit: SubmitHandler<any>
  open: boolean
  icon: JSX.Element
  control: Control<any>
  firstError: FieldError | undefined
  secondError: FieldError | undefined
  thirdError?: FieldError | undefined
  name: string
  firstLabel: string
  secondLabel: string
  options: Option[]
  thirdLabel?: string
  editText?: string
  title?: string
}

const CustomTextModal: FC<CustomTextModalProps> = ({
  onClose,
  handleSubmit,
  onSubmit,
  open,
  icon,
  control,
  firstError,
  secondError,
  name,
  firstLabel,
  secondLabel,
  thirdError,
  thirdLabel,
  editText,
  options,
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
          {
            (thirdLabel !== undefined) && <Controller
              name={thirdLabel}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={capitalize(thirdLabel)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={Boolean(thirdError)}
                  helperText={thirdError?.message ?? ''}
                />
              )}
            />
          }
          <Controller
            name={firstLabel}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={capitalize(firstLabel)}
                variant="outlined"
                margin="normal"
                fullWidth
                error={Boolean(firstError)}
                helperText={firstError?.message ?? ''}
              />
            )}
          />
          <Controller
            name={secondLabel}
            control={control}
            render={({ field }) => <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="select-label-2">{secondLabel}</InputLabel>
              <Select
                {...field}
                labelId="select-label-2"
                label={secondLabel}
                error={Boolean(secondError)}
              >
                {options.map((option, index) => (
                  <MenuItem key={index} value={String(option.id)}>{option.name}</MenuItem>
                ))}
              </Select>
              {Boolean(secondError) && (
                <FormHelperText error>{secondError?.message ?? ''}</FormHelperText>
              )}
            </FormControl>
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            endIcon={icon}
          >
            {editText ?? t('editModal.edit')}
          </Button>
        </form>
      </Box>
    </Modal >
  )
}

export default CustomTextModal
