import React from 'react'
import { Box, Container, Typography, Stack, Alert } from '@mui/material'
import { LogoContainer } from 'components/auth/LogoContainer'

import { styled } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { object, string, ref } from 'yup'
import { Form, Formik } from 'formik'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { GetStaticProps } from 'next'
import { useResetPasswordMutation } from 'graphql/mutations/reset-password.generated'
import Head from 'next/head'

const schema = object({
  password: string()
    .required('Password is required')
    .min(8, 'Password should have a minimum of 8 characters'),
  confirmPassword: string()
    .required('Confirm password is required')
    .min(8, 'Password should have a minimum of 8 characters')
    .oneOf([ref('password'), null], 'Passwords must match')
})

const ResetPasswordPage = () => {
  const router = useRouter()
  const [resetPassword, { data, error, loading }] = useResetPasswordMutation()

  const handleSubmit = async (values, { setErrors }) => {
    const token = (router.query?.token as string) ?? ''

    const { data } = await resetPassword({
      variables: {
        token,
        newPassword: values.password
      }
    })

    const signIntoken = data?.token
    if (signIntoken) {
      await signIn('token', { token: signIntoken, callbackUrl: '/' })
    }
  }

  const passwordChanged = !loading && data?.token
  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>

        <Box display="flex" flexDirection="column" flex={1} height={'100%'}>
          <Box display="flex">
            <LogoContainer />
            <Container maxWidth="sm">
              {!passwordChanged && (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  height="100vh"
                >
                  <Typography
                    color="textPrimary"
                    align="center"
                    gutterBottom
                    variant="h4"
                  >
                    Reset Password
                  </Typography>
                  <Typography color="textSecondary" align="center" gutterBottom>
                    Please enter your new password
                  </Typography>
                  <Box width="300px" mt={2} mb={1}>
                    <FormikTextField
                      fullWidth={true}
                      label="New password"
                      variant="outlined"
                      size="small"
                      type="password"
                      name="password"
                    />
                    <FormikTextField
                      fullWidth={true}
                      label="Re-type password"
                      variant="outlined"
                      size="small"
                      type="password"
                      name="confirmPassword"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  {error && (
                    <Typography color="error" fontSize={14}>
                      This reset password link is invalid. Token has expired
                    </Typography>
                  )}
                  <SubmiButton type="submit" loading={loading}>
                    Submit
                  </SubmiButton>
                </Stack>
              )}
              {passwordChanged && (
                <Stack alignItems="center" mt={45}>
                  <Alert severity="success">
                    Password changed successfully! Atomatically signing you in
                  </Alert>
                </Stack>
              )}
            </Container>
          </Box>
        </Box>
      </Form>
    </Formik>
  )
}

export default ResetPasswordPage

export const getStaticProps: GetStaticProps<DefaultPageProps> = async () => {
  return {
    props: {
      meta_data: buildGenericMetadata({
        title: 'Reset password',
        slug: '/account/reset-password'
      })
    }
  }
}

const SubmiButton = styled(LoadingButton)({
  backgroundColor: '#2cb673',
  color: 'white',
  width: 300,
  height: 40,
  borderRadius: 4,
  marginTop: 16,
  '&:hover': {
    backgroundColor: '#58d799'
  }
})
