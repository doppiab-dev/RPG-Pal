import { type FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ReadMore, Description as DescriptionIcon } from '@mui/icons-material'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { buttonStyle, removeHtmlTags } from '../Utils/f'

interface MoreOrEditButtonProps {
  editMode: boolean
  testId: string
  button: string
  showMore: string
  open: () => void
}

type TextProps = MoreOrEditButtonProps & {
  chunked: string
  emptyText: string
}

const Text: FC<TextProps> = ({ open, chunked, emptyText, button, showMore, editMode, testId }) => chunked === ''
  ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
    <Typography>{emptyText}</Typography>
    <MoreOrEditButton
      open={open}
      button={button}
      showMore={showMore}
      editMode={editMode}
      testId={testId}
    />
  </Box>
  : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
    <Typography data-testid={`chunked-${testId}-text`}>{removeHtmlTags(chunked)}</Typography>
    <MoreOrEditButton
      open={open}
      button={button}
      showMore={showMore}
      editMode={editMode}
      testId={testId}
    />
  </Box>

export default Text

const MoreOrEditButton: FC<MoreOrEditButtonProps> = ({ open, button, showMore, editMode, testId }) => editMode
  ? <Button
    onClick={open}
    variant="contained"
    startIcon={<FontAwesomeIcon icon={faPlus} />}
    endIcon={<DescriptionIcon />}
    sx={{ boxShadow: 4, alignSelf: 'flex-end', ...buttonStyle }}
    data-testid={`add-${testId}-button`}
  >
    {button}
  </Button>
  : <Button
    onClick={open}
    variant="contained"
    endIcon={<ReadMore />}
    sx={{ boxShadow: 4, alignSelf: 'flex-end', ...buttonStyle }}
    data-testid={`read-more-${testId}-button`}
  >
    {showMore}
  </Button>
