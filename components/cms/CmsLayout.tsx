import { Box, Button, Link as MuiLink } from '@mui/material'
import { styled, ThemeProvider } from '@mui/material/styles'
import { cmsTheme } from 'components/cmsTheme'
import PageLoadingIndicator from 'components/common/PageLoadingIndicator'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

import React, { PropsWithChildren, useState } from 'react'
import SideNav from '../common/Sidenav/SideNav'
import StatusBar from './StatusBar'
import Error403 from 'components/error-pages/Error403'
import SidebarItems from './Pages'
import { OpenInNew } from '@mui/icons-material'
import { UserRoles } from 'graphql/types'
import { LocalizationProvider } from '@mui/lab'
import AdapterDayjs from '@mui/lab/AdapterDayjs'

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  minHeight: '100vh',
  paddingTop: 64,
  backgroundColor: theme.palette.background.default
}))

const CmsLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  return (
    <ThemeProvider theme={cmsTheme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateFormats={{
          keyboardDate: 'M/D/YYYY',
          keyboardDateTime12h: 'M/D/YYYY hh:mm A'
        }}
      >
        <DashboardLayoutRoot
          sx={{ paddingLeft: { lg: isSidebarOpen ? '280px' : 0 } }}
        >
          <Head>
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;600;700;800&display=swap"
              rel="stylesheet"
            ></link>
          </Head>
          <PageLoadingIndicator />
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%',
              height: '100%'
            }}
          >
            {children}
          </Box>
        </DashboardLayoutRoot>
        <SideNav
          open={isSidebarOpen}
          onClose={() => {
            setSidebarOpen(false)
          }}
          rootUrl="/access"
          items={SidebarItems}
          additionalButtons={[
            <Button
              key="access"
              component={MuiLink}
              endIcon={<OpenInNew />}
              sx={{ color: '#FFF' }}
              target="_blank"
              href="/access"
            >
              Access portal
            </Button>
          ]}
        />
        <StatusBar
          onSidebarOpen={() => setSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default CmsLayout
