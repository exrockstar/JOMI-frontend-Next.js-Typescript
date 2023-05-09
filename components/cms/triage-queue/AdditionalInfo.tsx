import { Card, Stack, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { TriageQueueByIdQuery } from 'graphql/cms-queries/triage-queue-list.generated'
import React from 'react'

type Props = {
  request: TriageQueueByIdQuery['triageQueueRequest']
}

const AdditionalInfo = ({ request }: Props) => {
  const additional_info = request.additional_info
  return (
    <Card elevation={2}>
      <Stack p={2}>
        <Typography variant="h5">Additional Info</Typography>
        <Typography variant="body2">
          <strong>Question: </strong>
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {additional_info?.question}
        </Typography>
        <Typography variant="body2">
          <strong>Response: </strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: 'pre-wrap' }}
          my={2}
        >
          {additional_info.response}
        </Typography>

        <Typography variant="body2">
          <strong>Request Email Sent: </strong>{' '}
          <Typography component="span" variant="body2" color="text.secondary">
            {additional_info?.request_email_sent ? 'True' : 'False'}
          </Typography>
        </Typography>
        <Typography variant="body2">
          <strong>Contact Info </strong>(Additional Contact Info Given By User):
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {additional_info?.contactInfo ?? 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Created: </strong>{' '}
          <Typography component="span" variant="body2" color="text.secondary">
            {dayjs(request.created).format('MMM DD, YYYY HH:mm A')}
          </Typography>
        </Typography>
      </Stack>
    </Card>
  )
}

export default AdditionalInfo
