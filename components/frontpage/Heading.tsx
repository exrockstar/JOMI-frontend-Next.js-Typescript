import { Box, BoxProps, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import HeadingDivider from './HeadingDivider'
type HeadingProps = BoxProps & {
  _href?: string
}
const Heading = ({ children, _href, ...props }: HeadingProps) => {
  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      mt={{ xs: 6, md: 9 }}
      mb={{ xs: 4, md: 5 }}
      position="relative"
      {...props}
    >
      <Typography
        id={_href}
        sx={{ top: -100, position: 'absolute' }}
        component="span"
      ></Typography>
      <Typography variant="h3" component="h2">
        {children}
      </Typography>
      <HeadingDivider />
    </Box>
  )
}

export default Heading
