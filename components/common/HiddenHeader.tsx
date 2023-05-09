import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const HiddenHeader = styled(Typography)<{ component?: any }>({
  position: 'absolute',
  top: -9999,
  left: -9999
})
