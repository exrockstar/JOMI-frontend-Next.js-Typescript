import { Box } from '@mui/material'
import { useAppState } from 'components/_appstate/useAppState'
import FeedbackContainer from 'components/article/feedback/FeedbackContainer'
import Layout from 'components/layout'
import React, { useEffect } from 'react'

const FeedbackPage = () => {
  const { setShowFeedbackDialog } = useAppState()

  useEffect(() => {
    setShowFeedbackDialog(true)
  }, [])
  return (
    <Layout>
      <Box sx={{ minHeight: 'calc(100vh - 490px)' }}>
        <FeedbackContainer hideSkipButton />
      </Box>
    </Layout>
  )
}

export default FeedbackPage
