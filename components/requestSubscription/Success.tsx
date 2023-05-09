import { Box, Typography, Button, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import FormDivider from 'components/common/FormDivider'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BlueLink } from 'components/common/BlueLink'
import { analytics } from 'apis/analytics'

export default function Success() {
  const router = useRouter()

  return (
    <SuccessContainer>
      <Typography variant="h5" fontSize="1.25rem">
        Thank you!
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            fontFamily: 'Roboto',
            marginBottom: '10px'
          }}
        >
          Someone from JOMI will attempt to reach out to your institution to
          secure an institutional subscription.
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontFamily: 'Roboto',
            marginBottom: '10px'
          }}
        >
          In the meantime, we recommend that you reach out to your faculty /
          decision-makers and request a subscription directly with them. We
          would also recommend that you share JOMI with others at your
          institution, the more people request a journal, the more likely an
          institution is to subscribe.
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            marginBottom: '10px'
          }}
        >
          You can always review free articles{' '}
          <Link href="/sample-cases" passHref legacyBehavior>
            <BlueLink
              onClick={analytics.trackClick}
              data-event="Request Subscription Success - Sample Cases Link"
            >
              {' '}
              HERE
            </BlueLink>
          </Link>
        </Typography>
      </Box>
      <FormDivider
        my={3}
        color="text.secondary"
        fontSize={14}
        sx={{ width: '100%', backgroundColor: 'inherit' }}
      >
        or
      </FormDivider>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        marginTop={1}
        width={'100%'}
      >
        <PurchaseSubscriptionButton
          fullWidth
          variant="outlined"
          data-event="Request Subscription Success - Purchase Individual Subscription Button"
          onClick={(e) => {
            analytics.trackClick(e)
            router.push('/account/subscription')
          }}
        >
          Purchase an Individual Subscription
        </PurchaseSubscriptionButton>
      </Box>
    </SuccessContainer>
  )
}

const PurchaseSubscriptionButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgb(238, 238, 238)',
  color: '#000',
  marginBottom: '8px',
  marginLeft: '16px',
  marginRight: '16px',
  borderRadius: (theme.shape.borderRadius as number) * 1
}))

const SuccessContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  borderRadius: (theme.shape.borderRadius as number) * 1,
  backgroundColor: 'rgb(238, 238, 238)',
  padding: 16,
  [theme.breakpoints.down('sm')]: {
    width: '360px'
  },
  [theme.breakpoints.up('md')]: {
    width: '520px'
  },
  [theme.breakpoints.between(0, 300)]: {
    width: '270px'
  }
}))
