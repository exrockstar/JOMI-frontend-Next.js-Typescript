import { Box, BoxProps, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import HeadingDivider from './HeadingDivider'

const Heading = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      mt={{ xs: 6, md: 9 }}
      mb={{ xs: 4, md: 9 }}
      {...props}
    >
      <Typography variant="h3" component="h2">
        {children}
      </Typography>
      <HeadingDivider />
    </Box>
  )
}

export default Heading
