import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Typography
} from '@mui/material'
import dayjs from 'dayjs'
import { useTriageQueueByIdQuery } from 'graphql/cms-queries/triage-queue-list.generated'
import React from 'react'

type Props = {
  triageQueueId: string
} & DialogProps

const RequestDetailsModal = ({ triageQueueId, ...props }: Props) => {
  const { data, loading } = useTriageQueueByIdQuery({
    variables: {
      id: triageQueueId
    },
    skip: !props.open
  })

  const request = data?.triageQueueRequest

  return (
    <Dialog {...props}>
      {loading && (
        <>
          <DialogTitle>Request Details</DialogTitle>
          <DialogContent>
            <Box width="100%">
              <CircularProgress />
            </Box>
          </DialogContent>
        </>
      )}
      {request && (
        <>
          <DialogTitle>Request Details: {request._id}</DialogTitle>
          <DialogContent>
            <Box>
              <Typography fontWeight={700} variant="body2">
                Request Date:
              </Typography>
              <Typography>
                {dayjs(request.created).format('MM/DD/YYYY HH:mm A')}
              </Typography>
              <Typography fontWeight={700} variant="body2" mt={2}>
                Requested by:
              </Typography>
              {request.user ? (
                <Typography>
                  {request.user.email} - {request.user.display_name}
                </Typography>
              ) : (
                <Typography>
                  {request.email} - {request.display_name}
                </Typography>
              )}
              <Typography fontWeight={700} variant="body2" mt={2}>
                <strong>Message: </strong>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: 'pre-wrap' }}
                my={2}
              >
                {request.additional_info.response}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                props.onClose({}, 'backdropClick')
              }}
            >
              {' '}
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default RequestDetailsModal
