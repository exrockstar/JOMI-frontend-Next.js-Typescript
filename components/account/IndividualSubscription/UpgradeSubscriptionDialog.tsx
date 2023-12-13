import { Check } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import {
  usePreviewUpgradeSubscriptionQuery,
  useUpgradeSubscriptionMutation
} from 'graphql/mutations/order.generated'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { frontPageTheme } from 'components/theme'
import { useSession } from 'next-auth/react'
import CTAButton from 'components/common/CTAButton'
type Props = {
  priceNickname: string
} & DialogProps
const UpgradeSubscriptionDialog = (props: Props) => {
  const { priceNickname, ...otherProps } = props
  const { data: session } = useSession()
  const [promocode, setPromocode] = useState('')
  const [promocodeApplied, setPromocodeApplied] = useState(false)
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const {
    data,
    refetch: refetchPreview,
    loading: loadingPreview
  } = usePreviewUpgradeSubscriptionQuery({
    skip: !props.open,
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
    fetchPolicy: 'network-only'
  })

  const [upgradeSubscription, { loading }] = useUpgradeSubscriptionMutation({
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  })
  const preview = data?.upgradeSubscriptionPreview
  const amount = `${(preview?.amount / 100).toFixed(2)} USD`

  const handleUpgrade = async () => {
    await upgradeSubscription({
      variables: {
        promocode: promocode
      },
      onCompleted(result) {
        if (result.upgradeSubscription) {
          setTimeout(() => router.reload(), 1000)
        }
      }
    })
  }

  const isCard = !!preview?.cardLast4
  return (
    <ThemeProvider theme={frontPageTheme}>
      <Dialog {...otherProps} maxWidth="lg">
        <DialogTitle>Upgrade Your Subscription</DialogTitle>
        <Divider />

        <DialogContent sx={{ width: { lg: 400, sm: '100%' } }}>
          <Box gap={1} display="flex" flexDirection="column">
            <Box>
              <Typography variant="body2" fontWeight={700}>
                Description:
              </Typography>
              <Typography color="text.secondary">{priceNickname}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={700}>
                Amount (Prorated):
              </Typography>
              <Typography color="text.secondary">
                {loadingPreview ? 'Calculating Amount...' : amount}
              </Typography>
            </Box>

            {isCard && (
              <Box>
                <Typography variant="body2" fontWeight={700}>
                  Last 4 digits:
                </Typography>
                <Typography color="text.secondary">
                  **** **** **** {preview?.cardLast4}
                </Typography>
              </Box>
            )}
            <Box>
              <Typography variant="body2" fontWeight={700}>
                Enter Promocode:
              </Typography>
              <Stack
                direction={{ md: 'row', xs: 'column' }}
                alignItems={'stretch'}
                gap={2}
              >
                <TextField
                  color="secondary"
                  value={promocode}
                  onChange={(e) => {
                    setPromocode(e.target.value)
                    setPromocodeApplied(false)
                  }}
                  size="small"
                  placeholder="e.g.: SUMMER2023"
                  fullWidth
                />
                <LoadingButton
                  startIcon={<Check />}
                  color="success"
                  variant="outlined"
                  sx={{ px: 4 }}
                  loading={loadingPreview}
                  onClick={() => {
                    refetchPreview({
                      promocode
                    }).then(({ data }) => {
                      const promocodeApplied =
                        data?.upgradeSubscriptionPreview?.promocodeApplied
                      setPromocodeApplied(promocodeApplied)
                    })
                  }}
                >
                  {promocodeApplied ? 'Applied' : 'Apply'}
                </LoadingButton>
              </Stack>
              {promocodeApplied && (
                <Typography color="success.main" variant="caption">
                  Promocode applied. please check the amount.
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>

        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Button
            color="error"
            onClick={(e) => otherProps.onClose(e, 'backdropClick')}
          >
            Cancel
          </Button>
          <CTAButton
            type="submit"
            variant="contained"
            color="success"
            onClick={handleUpgrade}
            loading={loading}
            disabled={loadingPreview}
          >
            Upgrade
          </CTAButton>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default UpgradeSubscriptionDialog
