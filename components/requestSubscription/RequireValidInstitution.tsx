import {
  Box,
  Paper,
  Typography,
  Divider,
  Container,
  TextField
} from '@mui/material'
import SubmitButton from 'components/account/SubmitButton'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Formik, Form } from 'formik'
import { useUpdateProfileMutation } from 'graphql/mutations/update-profile.generated'
import { UserProfileDocument } from 'graphql/queries/user-profile.generated'
import React, { useState } from 'react'
import { Asserts, object, string } from 'yup'

type Props = {
  institution: string
  _id: string
}

const schema = object({
  institution: string().required('Institution is required.')
})

type FormValues = Asserts<typeof schema>

const RequireValidInstitution: React.FC<Props> = (props) => {
  const [updateProfile, { loading }] = useUpdateProfileMutation()
  const handleSubmit = async (values: FormValues) => {
    updateProfile({
      variables: {
        input: {
          institution_name: values.institution
        }
      },
      refetchQueries: [{ query: UserProfileDocument }]
    })
  }

  return (
    <Container maxWidth="sm">
      <Paper>
        <Box p={2} mt={4}>
          <Typography variant="h5" fontSize="1.25rem">
            Valid Institution Required
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" my={2}>
            Unfortunately your institution is not valid. Please enter a valid
            institution to submit an institution request
          </Typography>

          <Typography variant="body2" fontWeight={700}>
            Here is your institution : {props.institution ?? 'N/A'}
          </Typography>

          <Formik
            initialValues={{ institution: '' }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            <Form>
              <Typography variant="body2" mt={2}>
                Institution Name
              </Typography>
              <FormikTextField
                name="institution"
                label="Please enter your institution"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 1 }}
              />

              <SubmitButton
                type="submit"
                fullWidth
                sx={{ my: 2, py: 1 }}
                loading={loading}
              >
                Submit
              </SubmitButton>
            </Form>
          </Formik>
        </Box>
      </Paper>
    </Container>
  )
}

export default RequireValidInstitution
