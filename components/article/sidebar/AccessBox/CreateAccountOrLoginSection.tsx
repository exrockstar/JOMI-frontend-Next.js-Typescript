import { Stack } from '@mui/material'
import CTAButton from 'components/common/CTAButton'
import AccessBoxDivider from './common/AccessBoxDivider'
import OutlinedButton from './common/OutlinedButton'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { analytics } from 'apis/analytics'
const CreateAccountOrLoginSection = () => {
  const router = useRouter()
  return (
    <Stack gap={2} p={2} pt={0}>
      <Link
        href={{ pathname: '/signup', query: { from: router.asPath } }}
        passHref
        legacyBehavior
      >
        <OutlinedButton
          content="Create an Account"
          fullWidth
          data-event="article-access-box-signup-button"
          onClick={analytics.trackClick}
        />
      </Link>

      <AccessBoxDivider />
      <Link
        href={{ pathname: '/login', query: { from: router.asPath } }}
        passHref
        legacyBehavior
      >
        <CTAButton
          fullWidth
          data-event="article-access-box-login-button"
          onClick={analytics.trackClick}
        >
          Log in
        </CTAButton>
      </Link>
    </Stack>
  )
}
export default CreateAccountOrLoginSection
