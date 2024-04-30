import { type FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ReadMore, Description as DescriptionIcon } from '@mui/icons-material'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface TextProps {
  open: () => void
  chunked: string
  text: string
  emptyText: string
  button: string
  showMore: string
}

const Text: FC<TextProps> = ({ open, chunked, text, emptyText, button, showMore }) => text === ''
  ? <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
    <Typography>{emptyText}</Typography>
    <Button
      onClick={open}
      variant="contained"
      startIcon={<FontAwesomeIcon icon={faPlus} />}
      endIcon={<DescriptionIcon />}
      sx={{
        boxShadow: 4,
        width: '15vw',
        maxWidth: '200px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        height: '5vh',
        alignSelf: 'flex-end'
      }}
    >
      {button}
    </Button>
  </Box>
  : <Box display='flex' flexDirection='column' justifyContent='space-between' height='100%' padding='1vh 0' gap='1vh'>
    <Typography>{chunked}</Typography>
    <Button
      onClick={open}
      variant="contained"
      endIcon={<ReadMore />}
      sx={{
        boxShadow: 4,
        width: '15vw',
        maxWidth: '200px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        height: '5vh',
        alignSelf: 'flex-end'
      }}
    >
      {showMore}
    </Button>
  </Box>

export default Text
