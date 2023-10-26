import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import Success from './Success'
import RequestForm from './RequestForm'

import Link from 'next/link'
import { LoadingButton } from '@mui/lab'
import { useRequestSubscriptionMutation } from 'graphql/mutations/request-subscription.generated'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { analytics } from 'apis/analytics'
import { Formik, Form } from 'formik'
import { object, string, TypeOf } from 'yup'
import { fbPixelTrackCustom, fbPixelTrackViewContent } from 'apis/fbpixel'
import { useAppState } from 'components/_appstate/useAppState'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import { amplitudeTrackRequestSubscription } from 'apis/amplitude'
const forbiddenInst = ['N/A', 'n/a', 'college', 'none']

const schema = object({
  display_name: string().required('Name is required'),
  institution_name: string().required('Institution is required.'),
  message: string().required('Message is required.'),
  contact: string().optional(),
  email: string().required('Email is required')
})
type SchemaInput = TypeOf<typeof schema>

export default function Request() {
  const isClient = typeof window !== 'undefined'
  const { data: session, status } = useSession()
  const [requestInst, setRequestInst] = useState<string>("not set")
  const { state } = useAppState()
  const { enqueueSnackbar } = useSnackbar()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const { data, loading: userLoading } = useUserProfileQuery({
    skip: !session
  })
  const { referredFrom, referrerPath, anon_link_id } =
    useGoogleAnalyticsHelpers()
  const [requestSubscriptionMutation, { loading }] =
    useRequestSubscriptionMutation({
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: 'error' })
      },
      onCompleted: () => {
        setShowSuccessMessage(true)
        gtag('event', 'request_subscription', {
          event_label: data?.user?.institution_name,
          referredFrom,
          referrerPath,
          anon_link_id
        })
        amplitudeTrackRequestSubscription({
          userInstitution: data?.user?.institution_name ? data.user.institution_name : 'none',
          userId: session && session.user ? session.user._id : 'anon',
          requestInstitution: requestInst
        })
        fbPixelTrackCustom('Requests', {
          institution: `${data?.user?.institution_name}`
        })
        setRequestInst('not set')
      }
    })

  useEffect(() => {
    fbPixelTrackViewContent(
      'Subscription',
      'Request Institutional Subscription'
    )
  }, [])
  function handleSubmit(input: SchemaInput) {
    setRequestInst(input.institution_name)
    requestSubscriptionMutation({
      variables: {
        input: {
          display_name: input.display_name,
          institution_name: input.institution_name,
          message: input.message,
          contact: input.contact,
          email: input.email,
          referredFrom,
          referrerPath,
          anon_link_id
        }
      }
    })
  }

  function renderDefaultRequestText(): string {
    return `
Dear Administration,

I would like to request that our institution subscribes to JOMI Surgical Video Journal (https://jomi.com).

JOMI helps me prepare for cases: I am able to watch procedures from incision to closure with step-by-step narration by the operating surgeon.
The cases are peer-reviewed, professionally produced, and are effectively a shadowing experience that I cannot get anywhere else. This is unique and very valuable.
    `
  }
  const display_name = data?.user?.display_name
  const institution_name = data?.user?.institution_name
  const email = data?.user?.email
  const userFetching = userLoading || status === 'loading'
  if (userFetching) return null
  return showSuccessMessage ? (
    <Success />
  ) : (
    <RequestContainer p={2}>
      <Formik
        initialValues={{
          display_name: display_name ?? '',
          institution_name: institution_name ?? '',
          message: renderDefaultRequestText(),
          contact: '',
          email: email ?? ''
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Typography color="white" fontSize={17.5} my={1}>
            Request an Institutional Subscription
          </Typography>
          <RequestForm />
          <ButtonContainer>
            <InstitutionSubscriptionButton
              fullWidth
              type="submit"
              data-event="Request Subscription - Submit Request Subscription Button"
              loading={loading}
            >
              Submit Request
            </InstitutionSubscriptionButton>
            <ButtonDivider>OR</ButtonDivider>
            <Link href="/account/subscription" passHref legacyBehavior>
              <IndividualSubscriptionButton
                fullWidth
                data-event="Request Subscription - Purchase Individual Subscription Button"
                onClick={analytics.trackClick}
                type="button"
              >
                Purchase an Individual Subscription
              </IndividualSubscriptionButton>
            </Link>
          </ButtonContainer>
        </Form>
      </Formik>
    </RequestContainer>
  )
}

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  marginTop: theme.spacing(1),
  width: '100%',
  padding: '1px 0px'
}))

const ButtonDivider = styled(Divider)(({ theme }) => ({
  color: '#fff',
  margin: theme.spacing(1)
}))

const IndividualSubscriptionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  color: '#fff',
  marginBottom: theme.spacing(1),
  borderRadius: (theme.shape.borderRadius as number) * 1,
  ':hover': {
    backgroundColor: theme.palette.grey[700]
  },
  textTransform: 'none'
}))

const InstitutionSubscriptionButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: 'rgb(64, 193, 64)',
  color: '#fff',
  borderRadius: (theme.shape.borderRadius as number) * 1,
  ':hover': {
    backgroundColor: 'rgb(64, 193, 64)'
  },
  textTransform: 'none'
}))

const RequestContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',

  backgroundColor: 'rgb(34, 34, 34)',
  [theme.breakpoints.up('sm')]: {
    alignSelf: 'center',
    width: 545,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8
  }
}))
