import { PlayArrow } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

/**
 * Custom play button when preloading on mobile
 * @param props
 * @returns
 */
const PlayButton = (props: IconButtonProps) => {
  return (
    <StyledButton {...props} sx={{ px: { xs: 3, md: 4 } }}>
      <PlayArrow sx={{ fontSize: { xs: 32, sm: 48, md: 64 } }} />
    </StyledButton>
  )
}

export default PlayButton

const StyledButton = styled(IconButton)({
  position: 'absolute',
  left: '50%',
  top: '48%',
  borderRadius: 0,
  backgroundColor: '#000',
  color: '#fff',
  transform: 'translate3d(-50%, -50%, 0)',
  ':hover': {
    backgroundColor: '#151515'
  },
  zIndex: 2
})
