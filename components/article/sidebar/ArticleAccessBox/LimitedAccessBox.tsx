import { Stack, Typography } from '@mui/material'
import { analytics } from 'apis/analytics'
import CTAButton from 'components/common/CTAButton'
import FormDivider from 'components/common/FormDivider'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AccessBoxButton, CreateAnAccountButton } from './common'

type Props = {
  message?: React.ReactNode
}

const LimitedAccessBox = ({ message }: Props) => {
  const router = useRouter()
  const from = encodeURIComponent(router.asPath)
  return (
    <Stack>
      <Typography mb={2} variant="body2" fontWeight={500} fontFamily="Manrope">
        {message ?? 'To gain temporary access for evaluation purposes, please:'}
      </Typography>
      <Link
        href={{ pathname: '/signup', query: { from } }}
        passHref
        legacyBehavior
      >
        <CreateAnAccountButton
          fullWidth
          data-event="Not Logged In Notice - Create An Account"
          onClick={analytics.trackClick}
        />
      </Link>
      <FormDivider
        my={3}
        color="grey.600"
        fontSize={14}
        sx={{ width: '100%', backgroundColor: '#FFFFFF' }}
        component="div"
      >
        OR
      </FormDivider>
      <Link
        href={{ pathname: '/login', query: { from } }}
        passHref
        legacyBehavior
      >
        <CTAButton
          variant='contained'
          fullWidth
          data-event="Evaluation Notice - Purchase Subscription"
          onClick={analytics.trackClick}
          sx={{ fontWeight:'600'}}
        >
          Log In
        </CTAButton>
      </Link>
    </Stack>
  )
}

export default LimitedAccessBox
