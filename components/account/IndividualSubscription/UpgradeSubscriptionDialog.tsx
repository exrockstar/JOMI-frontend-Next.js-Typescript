import { Check, Close } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
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
import React, { useState } from 'react'
import { frontPageTheme } from 'components/theme'
type Props = {
  priceId: string
  priceNickname: string
} & DialogProps
const UpgradeSubscriptionDialog = (props: Props) => {
  const { priceId, priceNickname, ...otherProps } = props
  const [promocode, setPromocode] = useState('')
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const {
    data,
    refetch: refetchPreview,
    loading: loadingPreview
  } = usePreviewUpgradeSubscriptionQuery({
    skip: !priceId,
    variables: {
      price_id: priceId
    },
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
    const { data } = await upgradeSubscription({
      variables: {
        price_id: priceId,
        promocode: promocode
      }
    })

    if (data.upgradeSubscription) {
      router.reload()
    }
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
              <Typography color="text.secondary">{amount}</Typography>
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
                  onChange={(e) => setPromocode(e.target.value)}
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
                      price_id: priceId,
                      promocode
                    })
                  }}
                >
                  {preview?.promocodeApplied ? 'Applied' : 'Apply'}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </DialogContent>

        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={(e) => otherProps.onClose(e, 'backdropClick')}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            color="success"
            onClick={handleUpgrade}
            loading={loading}
            disabled={loadingPreview}
          >
            Upgrade
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default UpgradeSubscriptionDialog
