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

type CustomTextModalProps = WithChildren & {
  onClose: () => void
  handleSubmit: UseFormHandleSubmit<any>
  onSubmit: SubmitHandler<any>
  open: boolean
  icon: JSX.Element
  control: Control<any>
  firstError: FieldError | undefined
  secondError?: FieldError
  thirdError?: FieldError
  name: string
  firstLabel: string
  secondLabel?: string
  thirdLabel?: string
  options?: Option[]
  thirdOptions?: Option[]
  editText?: string
  title?: string
  disabled?: boolean
  thirdDisabled?: boolean
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
  editText,
  options,
  title,
  thirdError,
  thirdLabel,
  thirdOptions,
  children,
  disabled = false,
  thirdDisabled = false
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
              <TextField
                {...field}
                label={capitalize(firstLabel)}
                variant="outlined"
                margin="normal"
                fullWidth
                error={Boolean(firstError)}
                helperText={firstError?.message ?? ''}
                data-testid='first-text'
              />
            )}
          />
          {children}
          {
            (secondLabel !== undefined && options !== undefined) && <Controller
              name={secondLabel}
              control={control}
              render={({ field }) => <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="select-label-2">{capitalize(secondLabel)}</InputLabel>
                <Select
                  {...field}
                  labelId="select-label-2"
                  label={capitalize(secondLabel)}
                  error={Boolean(secondError)}
                  disabled={disabled}
                  data-testid='second-select'
                >
                  {options.map(option =>
                    <MenuItem
                      key={option.id}
                      value={String(option.id)}
                      data-testid={`option-second-${option.id}`}
                      disabled={option.disabled ?? false}
                    >
                      {option.name}
                    </MenuItem>
                  )}
                </Select>
                {Boolean(secondError) && (
                  <FormHelperText error>{secondError?.message ?? ''}</FormHelperText>
                )}
              </FormControl>
              }
            />
          }
          {
            (thirdLabel !== undefined && thirdOptions !== undefined) && <Controller
              name={thirdLabel}
              control={control}
              render={({ field }) => <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="select-label-3">{capitalize(thirdLabel)}</InputLabel>
                <Select
                  {...field}
                  labelId="select-label-3"
                  label={capitalize(thirdLabel)}
                  error={Boolean(thirdError)}
                  disabled={thirdDisabled}
                  data-testid='third-select'
                >
                  {thirdOptions.map(option => (
                    <MenuItem key={option.id} value={String(option.id)} data-testid={`option-third-${option.id}`} disabled={option.disabled ?? false}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
                {Boolean(thirdError) && (
                  <FormHelperText error>{thirdError?.message ?? ''}</FormHelperText>
                )}
              </FormControl>
              }
            />
          }
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
    </Modal>
  )
}

export default CustomTextModal
