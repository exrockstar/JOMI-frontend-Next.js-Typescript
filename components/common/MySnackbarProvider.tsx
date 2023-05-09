import { useMediaQuery } from '@mui/material'

import React, { PropsWithChildren } from 'react'
import { SnackbarProvider } from 'notistack'
import { defaultTheme } from 'components/theme'
import { isMobile as isMobileDevice } from 'components/utils/isMobile'

const MySnackbarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const isMobile = isMobileDevice()
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: isMobile ? 'bottom' : 'top',
        horizontal: isMobile ? 'center' : 'right'
      }}
    >
      {children}
    </SnackbarProvider>
  )
}

export default MySnackbarProvider
