import { Box, LinearProgress } from '@mui/material'
import { useRouter } from 'next/router'
import React, { memo, useEffect, useState } from 'react'

function PageLoadingIndicator() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true)
    }
    const handleRouteChangeComplete = () => {
      setLoading(false)
    }
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeComplete)
  }, [router.events])

  return (
    <Box position="fixed" width="100%" zIndex={2010}>
      {loading && <LinearProgress color="info" />}
    </Box>
  )
}

export default memo(PageLoadingIndicator)
