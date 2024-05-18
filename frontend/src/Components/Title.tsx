import { type FC } from 'react'
import { Box, Typography } from '@mui/material'

interface TitleProps {
  name: string
}

const Title: FC<TitleProps> = ({ name }) =>
  <Box display='flex' width='100%' flexDirection='column' boxShadow={1} height='66px'>
    <Typography fontSize='3rem' alignSelf='center' height='100%'>{name}</Typography>
  </Box>

export default Title
