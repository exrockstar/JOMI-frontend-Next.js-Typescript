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
  Box,
  Grid
} from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { useUserPricesQuery } from 'graphql/queries/user-prices.generated'

import { useSession } from 'next-auth/react'
import React from 'react'
import CTAButton from '../CTAButton'
import { frontPageTheme } from 'components/theme'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
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

  const [addTrialOrder, { loading: trialLoading }] =
    useAddTrialOrderForUserMutation({
      onCompleted() {
        analytics.trackTrial()
        amplitudeTrackTrial({
          userId: session && session.user ? session.user._id : 'anon',
          duration: trialDuration
        })
        router.reload()
      }
    })

  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'))
  if (loading || error || !user) return null

  const trialDuration = user.trialDuration

  const handleClose = () => {
    setShowPricingDialog(false)
  }

  const prices = user.stripeData?.prices
  const stripeId = user.stripeData?.stripeId
  const trialsAllowed = user.trialsAllowed
  const trialsEnabled = user.isTrialsFeatureEnabled
  // const showTrialsForUser = trialsAllowed && trialsEnabled
  const showTrialsForUser = true

  if (!showPricingDialog) return null

  return (
    <ThemeProvider theme={frontPageTheme}>
      <Dialog
        open={showPricingDialog}
        maxWidth={'md'}
        fullScreen={isSmallDevice}
      >
        <DialogTitle>
          <Stack>
            <Typography variant="h4" mb={1}>
              Thank you for registering with us!
            </Typography>
            <Typography variant="body1">
              If you like our content, please check out the pricing options
              below.
            </Typography>
          </Stack>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[300]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />

        <DialogContent sx={{ p: 0 }}>
          <Grid container>
            {showTrialsForUser && (
              <Grid item xs={12} sm={6}>
                <Card elevation={0} sx={{ width: { xs: '100%', sm: 'unset' } }}>
                  <CardContent>
                    <Box minHeight={100}>
                      <Typography variant="h6" textAlign={'center'}>
                        Free Trial
                      </Typography>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      <Typography
                        variant="body2"
                        textAlign={'center'}
                        color="text.secondary"
                      >
                        Get full access to {`JOMI's`} content for{' '}
                        {trialDuration} days!
                      </Typography>
                    </Box>
                    <CTAButton
                      onClick={() => {
                        addTrialOrder()
                      }}
                      fullWidth
                    >
                      Start Trial
                    </CTAButton>
                  </CardContent>
                </Card>
              </Grid>
            )}
            <Divider
              orientation={isSmallDevice ? 'horizontal' : 'vertical'}
              flexItem
              sx={{
                mr: '-1px',
                height: { xs: 1, sm: 'auto' },
                width: { xs: '100%', sm: 0 }
              }}
            />
            <Grid item xs={12} sm={showTrialsForUser ? 6 : 12}>
              <Box sx={{ p: 2 }}>
                <Box minHeight={100}>
                  <Typography variant="h6" textAlign={'center'}>
                    Individual Subscription
                  </Typography>

                  <Typography
                    variant="body2"
                    textAlign={'center'}
                    color="text.secondary"
                  >
                    Get full access to {`JOMI's`} content with a monthly or
                    yearly plan!
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {prices?.map((price) => {
                    return (
                      <Grid item key={price.id} xs={12} sm={6}>
                        <PriceDialogSubscribeButton
                          priceId={price.id}
                          nickname={price.nickname}
                          stripeId={stripeId}
                          mode={'subscription'}
                          interval={price.interval}
                          productId={price.product}
                          isSmallDevice={isSmallDevice}
                          amount={price.unit_amount}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}

export default PricingSignupDialog
