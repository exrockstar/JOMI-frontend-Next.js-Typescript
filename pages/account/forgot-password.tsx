import { Box, Container, Typography, Stack, Alert } from '@mui/material'
import { LogoContainer } from 'components/auth/LogoContainer'
import React from 'react'
import { styled } from '@mui/material/styles'
import LoadingButton from '@mui/lab/LoadingButton'
import { Asserts, object, string } from 'yup'
import { Form, Formik } from 'formik'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import Link from 'next/link'
import { ArrowBack } from '@mui/icons-material'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { GetStaticProps } from 'next'
import { useForgotPasswordMutation } from 'graphql/mutations/forgot-password.generated'
import Head from 'next/head'

const schema = object({
  email: string()
    .required('Please enter your email')
    .email('Please enter a valid email')
})

const ForgotPasswordPage = () => {
  const [forgotPassword, { data, error, loading }] = useForgotPasswordMutation()

  const handleSubmit = async (values: Asserts<typeof schema>) => {
    await forgotPassword({
      variables: {
        email: values.email.toLowerCase()
      }
    })
  }

  const emailSent = !loading && data?.forgotPassword == true
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <Head>
            <meta name="robots" content="noindex" />
          </Head>
          <Box display="flex" flexDirection="column" flex={1} height={'100%'}>
            <Box display="flex" height="100vh">
              <LogoContainer />
              <Container maxWidth="sm">
                {!emailSent && (
                  <Stack
                    direction="column"
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
                      Forgot Pasword
                    </Typography>

                    <Typography
                      color="textSecondary"
                      align="center"
                      gutterBottom
                    >
                      Please enter your email address.You will receive an email
                      with instructions on how to reset your password.
                    </Typography>
                    <Box width="100%" mt={2} mb={1} display={'flex'}>
                      <EmailTextField
                        fullWidth={true}
                        label="Email"
                        name="email"
                        variant="outlined"
                        size="small"
                      />

                      <SubmitButton type="submit" loading={loading}>
                        Submit
                      </SubmitButton>
                    </Box>
                    {error && (
                      <Typography
                        color="error"
                        fontSize={14}
                        alignSelf="flex-start"
                      >
                        {error?.message?.split(':')[1]}
                      </Typography>
                    )}
                  </Stack>
                )}
                {emailSent && (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                    spacing={2}
                  >
                    <Alert severity="success">
                      We have sent a link to reset your password to{' '}
                      <strong>{values.email}</strong>. Please check your email.
                    </Alert>
                    <Link href="/" passHref legacyBehavior>
                      <BackToHomePage startIcon={<ArrowBack />}>
                        Back to Home page
                      </BackToHomePage>
                    </Link>
                  </Stack>
                )}
              </Container>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default ForgotPasswordPage

export const getStaticProps: GetStaticProps<DefaultPageProps> = async () => {
  return {
    props: {
      meta_data: buildGenericMetadata({
        title: 'Forgot password',
        slug: '/account/forgot-password'
      })
    }
  }
}

const EmailTextField = styled(FormikTextField)({
  '& .MuiInputBase-root': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
})

const SubmitButton = styled(LoadingButton)({
  backgroundColor: '#2cb673',
  color: 'white',
  width: 250,
  height: 40,
  borderRadius: 4,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  '&:hover': {
    backgroundColor: '#58d799'
  }
})

const BackToHomePage = styled(SubmitButton)({
  backgroundColor: '#2cb673',
  color: 'white',
  width: 250,
  height: 40,
  borderRadius: 4,
  '&:hover': {
    backgroundColor: '#58d799'
  }
})
