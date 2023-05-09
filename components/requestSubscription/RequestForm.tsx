import { Box, Typography, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { useFormikContext } from 'formik'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const contactPlaceholderText = `Please write any information you may have about the best person / people to contact. You can add (an email, phone number, role...etc)`

export default function RequestForm() {
  const inputProps = {
    style: { fontSize: 13, lineHeight: 1.2 }
  }
  return (
    <RequestFormContainer>
      <Typography variant="body2">Your Name:</Typography>
      <FormikTextField
        name="display_name"
        placeholder="Your name"
        size="small"
        inputProps={inputProps}
      />
      <Typography variant="body2" mt={1}>
        Your email:
      </Typography>
      <FormikTextField
        name="email"
        placeholder="e.g., johndoe@gmail.com"
        size="small"
        inputProps={inputProps}
      />
      <Typography variant="body2" mt={1}>
        Your institution:
      </Typography>
      <FormikTextField
        name="institution_name"
        size="small"
        inputProps={inputProps}
        placeholder="e.g. ACME University"
      />
      <Typography variant="body2" mt={1}>
        Your Message:
      </Typography>

      <FormikTextField
        fullWidth
        multiline
        minRows={6}
        maxRows={20}
        name="message"
        inputProps={inputProps}
      />
      <Typography variant="body2" mt={1}>
        Please let us know whom to contact:
      </Typography>

      <FormikTextField
        name="contact"
        fullWidth
        multiline
        minRows={2}
        maxRows={4}
        placeholder={contactPlaceholderText}
        inputProps={inputProps}
      />
    </RequestFormContainer>
  )
}

const RequestFormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  alignSelf: 'center',
  borderRadius: 0,
  backgroundColor: 'rgb(238, 238, 238)',
  width: '100%',
  padding: 16,
  [theme.breakpoints.up('sm')]: {
    borderRadius: 8
  }
}))
