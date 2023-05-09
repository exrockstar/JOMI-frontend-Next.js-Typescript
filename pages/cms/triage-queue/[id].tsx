import { Grid, Stack, Typography } from '@mui/material'
import CmsLayout from 'components/cms/CmsLayout'
import TriageQueueDetails from 'components/cms/triage-queue/TriageQueueDetails'
import { useRouter } from 'next/router'
import React from 'react'

const TriageQueueDetail = () => {
  const router = useRouter()
  const id = router.query.id
  return (
    <CmsLayout>
      <Stack p={2} minHeight="90vh">
        <Typography variant="h4">Triage Queue Detail</Typography>
        <Grid container>
          <Grid item xs={12} lg={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Database ID: {id}
            </Typography>
          </Grid>
        </Grid>
        {id && <TriageQueueDetails id={id as string} />}
      </Stack>
    </CmsLayout>
  )
}

export default TriageQueueDetail
