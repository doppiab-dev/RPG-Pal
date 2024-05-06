import { type FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ReadMore, Description as DescriptionIcon } from '@mui/icons-material'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { buttonStyle, removeHtmlTags } from '../Utils/f'

interface TextProps {
  open: () => void
  chunked: string
  text: string
  emptyText: string
  button: string
  showMore: string
  testId: string
}

const Text: FC<TextProps> = ({ open, chunked, text, emptyText, button, showMore, testId }) => text === ''
  ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
    <Typography>{emptyText}</Typography>
    <Button
      onClick={open}
      variant="contained"
      startIcon={<FontAwesomeIcon icon={faPlus} />}
      endIcon={<DescriptionIcon />}
      sx={{ boxShadow: 4, alignSelf: 'flex-end', ...buttonStyle }}
      data-testid={`add-${testId}-button`}
    >
      {button}
    </Button>
  </Box>
  : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
    <Typography data-testid={`chunked-${testId}-text`}>{removeHtmlTags(chunked)}</Typography>
    <Button
      onClick={open}
      variant="contained"
      endIcon={<ReadMore />}
      sx={{ boxShadow: 4, alignSelf: 'flex-end', ...buttonStyle }}
      data-testid={`read-more-${testId}-button`}
    >
      {showMore}
    </Button>
  </Box>

export default Text
