import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import AccountMenu from 'components/account/AccountMenu'
import Box from '@mui/material/Box'
import { useSession } from 'next-auth/react'
import BlankPage from 'components/common/BlankPage'

export default function AccountLayout({ children }) {
  //Quick fix, move out if ssr
  const { data: session } = useSession()

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={3}>
        <Box>
          <AccountMenu />
        </Box>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Box>{session ? children : <BlankPage />}</Box>
      </Grid>
    </Grid>
  )
}
