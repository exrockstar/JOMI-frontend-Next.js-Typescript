import { Check, Close, Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Typography,
  Card,
  Stack,
  Alert,
  MenuItem,
  Select,
  ListItemText,
  Chip,
  Tooltip,
  Paper,
  Box,
  Button
} from '@mui/material'
import {
  TriageQueueByIdQuery,
  useSendTriageQueueEmailMutation,
  useTriageQueueByIdLazyQuery
} from 'graphql/cms-queries/triage-queue-list.generated'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import UpdateResponseDialog from './UpdateResponseDialog'

type Props = {
  request: TriageQueueByIdQuery['triageQueueRequest'],
  refetchQuery(vars: Object): void
}

const TriageEmailSection = ({ request, refetchQuery }: Props) => {
  const [emailSent, setEmailSent] = useState(false)
  const institution = request?.institution
  const contacts = institution?.points_of_contact
  const mainContact = contacts && contacts[0]
  const [contact, setContact] = useState<typeof mainContact | null>(null)
  const [ccUserEmail, setCcUserEmail] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [_, { updateQuery }] = useTriageQueueByIdLazyQuery({
    variables: {
      id: request?._id
    },
  })
  const [sendEmailToInstitution, { loading: sendingEmail, client }] =
    useSendTriageQueueEmailMutation({
      variables: {
        input: {
          contactEmail: contact?.email,
          id: request._id,
          includeRequestorToCc: ccUserEmail,
          pocName: contact?.name 
        }
      },
      onCompleted(result) {
        enqueueSnackbar('Successfully sent email!', { variant: 'success' })
        console.log(result.triageQueueRequest)
        updateQuery((current) => {
          return {
            ...current,
            triageQueueRequest: result.triageQueueRequest
          }
        })
      },
      onError(error) {
        enqueueSnackbar(`Failed to send email: ${error.message}`, {
          variant: 'error'
        })
      }
    })

  useEffect(() => {
    if (!contact && contacts?.length > 0) {
      setContact(contacts[0])
    }
    console.log(contact)
  }, [contacts])

  //Used to check if an email was sent to the POC name and change emailSent accordingly
  useEffect(() => {
    if(request.additional_info?.pocs_email_sent && contact){
      request.additional_info?.pocs_email_sent?.includes(contact.name) || 
        request.additional_info?.pocs_email_sent?.includes('Sir/Madam') ? //this is needed for blank contact case.
        setEmailSent(true) : setEmailSent(false)
    }
  }, [contact])

  const handleSend = () => {
    sendEmailToInstitution()
  }
  if (!request) return null

  if (!institution) {
    return (
      <Card>
        <Stack p={2} spacing={2}>
          <Typography variant="h5">Email</Typography>
          <Alert severity="info">
            No matched institution found. Please set the matched institution
            first.
          </Alert>
        </Stack>
      </Card>
    )
  }
  const userEmail = request.user?.email || request.email
  return (
    <Card>
      <UpdateResponseDialog
        response={request.additional_info?.response ?? ''}
        triageQueueId={request._id}
        open={showEditDialog}
        onClose={() => {
          setShowEditDialog(false)
        }}
      />
      <Stack p={2} spacing={2}>
        <Typography variant="h5">Email</Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>Recipient: </Typography>
          <Select
            value={contact?.email ?? ''}
            renderValue={(selected) => {
              const item = contacts.find((c) => c.email === selected)
              if (!item) {
                return <Typography> Select POC</Typography>
              }
              return (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <strong>{item?.email ?? ''}</strong>
                  <Typography variant="body2" color="text.secondary">{`(Role: ${
                    item.role || 'N/A'
                  })`}</Typography>
                </Stack>
              )
            }}
            onChange={(e) => {
              const newContact = institution?.points_of_contact.find(
                (i) => i.email === e.target.value
              )
              setContact(newContact)
              //Refetch so that the email template updates in the CMS interface
              refetchQuery({
                id: request._id,
                pocName: newContact.name
              })
              //when changing, check if that POC was already sent an email, if not, re-enable sending
            }}
            size="small"
          >
            {institution?.points_of_contact?.map((item) => {
              return (
                <MenuItem key={item.email} value={item.email}>
                  <ListItemText
                    primary={item.email}
                    secondary={`(Role: ${item.role || 'N/A'})`}
                  ></ListItemText>
                </MenuItem>
              )
            })}
          </Select>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>CC: </Typography>
          <Tooltip title="Cannot be unchecked" arrow>
            <Chip label="impact@jomi.com" icon={<Check />} />
          </Tooltip>
          <Tooltip
            title={
              ccUserEmail
                ? "This email will be CC'ed"
                : "This email will not be CC'ed"
            }
          >
            <Chip
              label={userEmail}
              clickable
              icon={ccUserEmail ? <Check /> : null}
              onClick={() => setCcUserEmail((prev) => !prev)}
            />
          </Tooltip>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <LoadingButton
            variant="contained"
            startIcon={<Send />}
            onClick={handleSend}
            disabled={emailSent}
            loading={sendingEmail}
          >
            Send
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            onClick={() => {
              setShowEditDialog(true)
            }}
          >
            Edit Response
          </LoadingButton>
        </Stack>
        <Paper elevation={3}>
          <Box sx={{ backgroundColor: 'grey.800' }}>
            <div
              dangerouslySetInnerHTML={{ __html: request.emailTemplate }}
            ></div>
          </Box>
        </Paper>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <LoadingButton
            variant="contained"
            startIcon={<Send />}
            onClick={handleSend}
            disabled={emailSent}
          >
            Send
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            onClick={() => {
              setShowEditDialog(true)
            }}
          >
            Edit Response
          </LoadingButton>
        </Stack>
      </Stack>
    </Card>
  )
}

export default TriageEmailSection
