import { Close } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton
} from '@mui/material'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import {
  usePreviewUpgradeSubscriptionQuery,
  useUpgradeSubscriptionMutation
} from 'graphql/mutations/order.generated'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
type Props = {
  priceId: string
  priceNickname: string
} & DialogProps
const UpgradeSubscriptionDialog = (props: Props) => {
  const { priceId, priceNickname, ...otherProps } = props
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { data } = usePreviewUpgradeSubscriptionQuery({
    skip: !priceId,
    variables: {
      price_id: priceId
    }
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
        price_id: priceId
      }
    })

    if (data.upgradeSubscription) {
      router.reload()
    }
  }
  return (
    <Dialog {...otherProps} maxWidth="md">
      <DialogTitle
        sx={{
          position: 'relative'
        }}
      >
        Upgrade Your Subscription
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box gap={1} display="flex" flexDirection="column">
          <Box>
            <Typography variant="body2" fontWeight={700}>
              Description:
            </Typography>
            <Typography>{priceNickname}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={700}>
              Amount (Prorated):
            </Typography>
            <Typography>{amount}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={700}>
              Using Card:
            </Typography>
            {!!preview?.cardLast4 && (
              <Typography>**** **** **** {preview?.cardLast4}</Typography>
            )}
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
          disabled={!preview?.cardLast4}
        >
          Upgrade
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default UpgradeSubscriptionDialog
