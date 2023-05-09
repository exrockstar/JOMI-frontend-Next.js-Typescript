import { Box, Divider, Typography } from '@mui/material'
import { BoxProps } from '@mui/system'
import React from 'react'

const FormDivider: React.FC<BoxProps> = ({ children, sx, ...props }) => {
  return (
    <Box
      sx={{ position: 'relative', backgroundColor: 'white', ...sx }}
      {...props}
    >
      <Divider />
      <Box
        px={2}
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translate3d(-50%,-50%, 0)',
          backgroundColor: 'inherit'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default FormDivider
