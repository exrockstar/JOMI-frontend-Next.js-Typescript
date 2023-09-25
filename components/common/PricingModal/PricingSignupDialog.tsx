import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Stack,
  useMediaQuery,
  Card,
  CardContent,
  DialogActions,
} from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { useUserPricesQuery } from 'graphql/queries/user-prices.generated'

import { useSession } from 'next-auth/react'
import React from 'react'
import CTAButton from '../CTAButton'
import { frontPageTheme } from 'components/theme'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppState } from 'components/_appstate/useAppState'
import { useRouter } from 'next/router'
import { useAddTrialOrderForUserMutation } from 'graphql/cms-queries/trials.generated'
import { analytics } from 'apis/analytics'
import { amplitudeTrackTrial } from 'apis/amplitude'
import PriceDialogSubscribeButton from './PricingDialogSubscribeButton'

/**
 * Purpose: Show pricing details to users after they signup.
 */
const PricingSignupDialog: React.FC = () => {
  const theme = useTheme()
  const router = useRouter()
  const { data: session } = useSession()
  const { showPricingDialog, setShowPricingDialog } = useAppState()
  
  const { data, loading, error, refetch } = useUserPricesQuery({
    skip: !session
  })
  const user = data?.user

  const [addTrialOrder, { loading: trialLoading }] = useAddTrialOrderForUserMutation({
    onCompleted() {
      analytics.trackTrial({})
      amplitudeTrackTrial({
        userId: session && session.user ? session.user._id : 'anon',
        duration: trialDuration
      })
      router.reload()
    }
  })

  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'))
  if (loading || error || !user)
    return null

  const trialDuration = user.trialDuration

  const handleClose = () => {
    setShowPricingDialog(false)
  };

  const prices = user.stripeData?.prices
  const stripeId = user.stripeData?.stripeId
  const trialsAllowed = user.trialsAllowed
  const trialsEnabled = user.isTrialsFeatureEnabled
  const showTrialsForUser = trialsAllowed && trialsEnabled

  if (!showPricingDialog) return null

  const cardStyle = {
    borderColor: 'grey.700',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2,
    margin: isSmallDevice ? 2 : 1,
    width: isSmallDevice ? '100%': '100%', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    flex: 1,
  }
  return (
    <ThemeProvider theme={frontPageTheme}>
      <Dialog
        open={showPricingDialog}
        maxWidth="sm"
        fullScreen={isSmallDevice}
      >
        <DialogTitle>
          <Stack>
            <Typography variant="h4" mb={1}>
              Thank you for registering with us!
            </Typography>
            <Typography variant="body1">
              If you like our content, please check out the pricing options below.
            </Typography>
          </Stack>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[300],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />

        <DialogContent 
          sx={{ 
            display: 'flex',
            // justifyContent: isSmallDevice ? 'initial' : 'space-between',
            flexDirection: isSmallDevice ? 'column' : 'row',
            alignItems: 'center',
          }}
        >
          {/* Trial Option */}
          {showTrialsForUser && 
            <Card sx={{
              ...cardStyle, 
              minHeight: 165,
              maxHeight: 165
            }}>
              <CardContent>
                <Typography variant="h6" textAlign={'center'}>Free Trial</Typography>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Typography variant="body2" textAlign={'center'}>Get full access to JOMI's content for {trialDuration} days!</Typography>
              </CardContent>
              <DialogActions>
                <CTAButton 
                  onClick={() => {
                    addTrialOrder()
                  }} 
                  variant="contained" 
                  color="primary"
                  sx={{ width: isSmallDevice ? 300 : '100%' }}
                >
                  Start Trial
                </CTAButton>
              </DialogActions>
            </Card>
          }
          {/* Monthly and Yearly Options */}
          <Card sx={{
            ...cardStyle, 
            minHeight: 165,
            maxHeight: isSmallDevice ? 165 : 165,
          }}>
            <CardContent>
              <Typography 
                variant="h6" 
                textAlign={'center'}
              >
                Individual Subscription
              </Typography>
              
              <Typography 
                variant="body2" 
                textAlign={'center'}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Get full access to JOMI's content with a monthly or yearly plan!
              </Typography>
            </CardContent>
            <DialogActions
              sx={{
                display: 'flex',
                flexDirection: isSmallDevice ? 'row' : 'row',
                alignItems: 'center', 
              }}
            >
              {prices?.map((price) => {
                return (
                  <PriceDialogSubscribeButton
                    key={price.id}
                    priceId={price.id}
                    nickname={price.nickname}
                    stripeId={stripeId}
                    mode={'subscription'}
                    interval={price.interval}
                    productId={price.product}
                    isSmallDevice={isSmallDevice}
                  />
                )
              })}
            </DialogActions>
          </Card>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}

export default PricingSignupDialog

