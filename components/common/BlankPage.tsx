import React from 'react'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { BlueLink } from 'components/common/BlueLink'

export default function BlankPage() {
  return (
    <Box
      bgcolor="white"
      height="100%"
      alignItems="center"
      justifyContent="center"
      flex={1}
      p={3}
    >
      <Box>
        Please{' '}
        <Link href="/login" passHref legacyBehavior>
          <BlueLink>login</BlueLink>
        </Link>
      </Box>
    </Box>
  )
}
