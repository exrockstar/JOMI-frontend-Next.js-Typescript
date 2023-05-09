import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { useSnackbar } from 'notistack'

import { styled } from '@mui/material/styles'
import SubmitButton from '../SubmitButton'
import { useUpdatePreferenceMutation } from 'graphql/mutations/update-preference.generated'
import { EmailPreference } from 'graphql/types'
import { analytics } from 'apis/analytics'

export default function Newsletter() {
  const { data: session } = useSession()
  const email = session?.user?.email
  const [value, setValue] = useState<EmailPreference>(EmailPreference.All)
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value as EmailPreference)
    analytics.trackClick(event as any)
  }

  const [updateEmail] = useUpdatePreferenceMutation({
    variables: { preference: value },
    onError: (error) => {
      enqueueSnackbar('Email preference error', { variant: 'error' })
    },
    onCompleted: (data) => {
      enqueueSnackbar('Email preference updated', { variant: 'success' })
    }
  })

  const handleUpdateEmail = (e) => {
    analytics.trackClick(e)
    updateEmail()
  }

  return (
    <Box
      bgcolor="white"
      height="100%"
      alignItems="center"
      justifyContent="center"
      flex={1}
      p={2}
      pt={0}
    >
      <EmailHeaderText>Email updates</EmailHeaderText>
      <Box padding={'8px'}>
        <Typography fontSize={'16px'} fontWeight={'bold'}>
          Email Address
        </Typography>
        <Box>
          <Box display="flex">
            <Typography fontSize={'14px'}>
              Sending all email updates to{' '}
              <Typography
                component={'span'}
                fontSize={'14px'}
                fontWeight="bold"
              >
                {email}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box padding={'0px 8px 0px 8px'}>
        <Typography fontSize={'16px'} fontWeight={'bold'} marginBottom={1}>
          Email Preferences
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            defaultValue="all"
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlRadioLabel
              value={EmailPreference.All}
              mainText="Receive all emails, except for those I unsubscribe from"
              subText={`We'll occasionally send you news and updates, such as when an interesting article is released.`}
              data-event="Email Preferences - All"
            />
            <FormControlRadioLabel
              value={EmailPreference.Some}
              mainText="Only receive account related emails, and those I subscribe to"
              subText={`We'll only send you legal and administrative emails, and emails
              that you specifically subscribed to.`}
              data-event="Email Preferences - Some"
            />
            <FormControlRadioLabel
              value={EmailPreference.None}
              mainText="Receive no emails, including account related emails"
              subText={`We won't send you any emails. Not recommended, you might miss
              something important!`}
              data-event="Email Preferences - None"
            />
          </RadioGroup>
          <Box m={1}>
            <SubmitButton
              variant="text"
              type="submit"
              onClick={handleUpdateEmail}
              data-event="Email Preferences - Submit Button"
            >
              Update Email Preferences
            </SubmitButton>
          </Box>
        </FormControl>
      </Box>
    </Box>
  )
}

const EmailHeaderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: '28px',
  textAlign: 'start',
  padding: '8px',
  fontWeight: '200px'
}))

const MainText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[600],
  fontWeight: 'bold'
}))

const RadioButton = styled(Radio)(({ theme }) => ({
  '&.Mui-checked': { color: theme.palette.linkblue.main }
}))

type FormControlRadioLabel = {
  value: string
  mainText: string
  subText: string
}

function FormControlRadioLabel({
  value,
  mainText,
  subText
}: FormControlRadioLabel) {
  return (
    <FormControlLabel
      sx={{ marginBottom: 1 }}
      value={value}
      control={<RadioButton size="small" />}
      label={
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
        >
          <MainText>{mainText}</MainText>
          <Typography variant="caption" fontSize={'12px'}>
            {subText}
          </Typography>
        </Box>
      }
    />
  )
}
