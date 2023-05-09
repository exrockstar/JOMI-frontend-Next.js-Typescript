import { Typography } from '@mui/material'
import React from 'react'

const GuideIndicator = () => {
  return (
    <Typography
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
        borderRadius: 0
      }}
    >
      Tap to load video
    </Typography>
  )
}

export default GuideIndicator
