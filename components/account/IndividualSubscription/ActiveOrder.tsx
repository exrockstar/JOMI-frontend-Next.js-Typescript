import { useApolloClient } from '@apollo/client'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  AlertTitle,
  Box,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import dayjs from 'dayjs'
import {
  useUnsubscribeOrderMutation,
  useResubscribeOrderMutation
} from 'graphql/mutations/order.generated'
import { UserPricesQuery } from 'graphql/queries/user-prices.generated'
import { OrderInterval } from 'graphql/types'
import { useSnackbar } from 'notistack'
import React, { useMemo, useState } from 'react'
import DiscountInfo from './DiscountInfo'

type Order = UserPricesQuery['user']['activeOrder']
type Props = {
  order: Order
  onUpdateSubscription(): void
}

type ConfirmState = {
  show: boolean
  message: string
  cancelColor: 'error' | 'success' | 'neutral'
  continueColor: 'error' | 'success' | 'neutral'
  cancelVariant: 'text' | 'outlined' | 'contained'
  continueVariant: 'text' | 'outlined' | 'contained'
  cancelText: string
  cancelAction(): void
  continueText: string
  continueAction(): void
}

const defaultConfirmState: ConfirmState = {
  show: false,
  message: '',
  cancelText: '',
  cancelAction: () => {},
  continueText: '',
  continueAction: () => {},
  cancelColor: 'neutral',
  continueColor: 'neutral',
  cancelVariant: 'text',
  continueVariant: 'text'
}

const ActiveOrder = ({ order, onUpdateSubscription }: Props) => {
  const [confirmState, setConfirmState] =
    useState<ConfirmState>(defaultConfirmState)
  const [actionLoading, setActionLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const daysFromNow = dayjs(order.end).diff(dayjs(), 'day')
  const end = dayjs(order.end).format('MM/DD/YYYY hh:mm A')
  const canceled = order.isCanceled
  const isInProgress = confirmState.show
  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const [unsubscribe] = useUnsubscribeOrderMutation({
    variables: {
      order_id: order._id
    },
    onCompleted({ unsubscribeOrder: result }) {
      subscriptionUpdated(result)
    },
    onError(e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    }
  })

  const [resubscribe] = useResubscribeOrderMutation({
    variables: {
      order_id: order._id
    },
    onCompleted({ resubscribeOrder: result }) {
      subscriptionUpdated(result)
    },
    onError(e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    }
  })

  const subscriptionUpdated = async (result: Order) => {
    enqueueSnackbar('Subscription updated', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      }
    })

    await onUpdateSubscription()
    hideConfirmBox()
  }

  const handleResubscribe = () => {
    setConfirmState({
      show: true,
      cancelAction: hideConfirmBox,
      message: `Your subscription will be reactivated and your credit card will be charged on ${end}. Is that okay?`,
      cancelText: 'No, I would like to lose access',
      cancelColor: 'error',
      cancelVariant: 'outlined',
      continueText: 'Yes, I want access again',
      continueColor: 'success',
      continueVariant: 'contained',
      continueAction: () => {
        resubscribe()
        setActionLoading(true)
      }
    })
    window.scrollTo({
      top: 500,
      behavior: 'smooth'
    })
  }

  const handleUnsubscribe = () => {
    setConfirmState({
      show: true,
      cancelAction: hideConfirmBox,
      message: 'Are you sure you want to cancel the subscription?',
      cancelText: 'No, I would like to keep access',
      cancelColor: 'success',
      cancelVariant: 'contained',
      continueText: 'Yes, cancel and do not renew subscription',
      continueColor: 'error',
      continueVariant: 'outlined',
      continueAction: () => {
        unsubscribe()
        setActionLoading(true)
      }
    })

    window.scrollTo({
      top: 500,
      behavior: 'smooth'
    })
  }

  const hideConfirmBox = () => {
    setConfirmState(defaultConfirmState)
    setActionLoading(false)
  }
  const recurring =
    order.plan_interval && order.plan_interval !== OrderInterval.Day

  const renewMessage = useMemo(() => {
    if (!recurring) {
      return `Your subscription will end on ${end}`
    }

    if (daysFromNow > 1) {
      return `Your subscription will renew in ${daysFromNow} days. (${end}) `
    } else if (daysFromNow === 1) {
      return `Your will renew tomorrow. (${end}) `
    }

    return `Your will renew today. (${end})`
  }, [daysFromNow, end, recurring])

  return (
    <div>
      <Alert>
        Your subscription is for {order.description}
        {!canceled && renewMessage && (
          <div>
            <Typography variant="body2" mt={1}>
              {renewMessage}
            </Typography>
            {order?.discount && (
              <DiscountInfo
                discount={order.discount}
                interval={order.plan_interval}
              />
            )}
          </div>
        )}
      </Alert>
      {canceled && (
        <Alert severity="warning" sx={{ my: 2 }}>
          Your subscription will end on {end}
          <Typography variant="body2" mt={1}>
            {`Resubscribe now so you don't lose access!`}
          </Typography>
        </Alert>
      )}

      {!isInProgress && (
        <Box py={2}>
          {canceled ? (
            <CustomButton
              color="success"
              variant="contained"
              onClick={handleResubscribe}
              fullWidth={!mdUp}
              sx={{ fontSize: 16, px: 3, py: 1 }}
            >
              Resubscribe
            </CustomButton>
          ) : (
            <CustomButton
              color="error"
              variant="outlined"
              onClick={handleUnsubscribe}
              sx={{ fontWeight: 700 }}
            >
              Cancel Subscription
            </CustomButton>
          )}
        </Box>
      )}

      {isInProgress && (
        <Alert color="info" severity="warning" icon={false} sx={{ mt: 2 }}>
          <AlertTitle>{confirmState.message}</AlertTitle>
          <Stack direction={mdUp ? 'row' : 'column'} spacing={2} mt={2}>
            <CustomButton
              color={confirmState.cancelColor}
              variant={confirmState.cancelVariant}
              onClick={confirmState.cancelAction}
            >
              {confirmState.cancelText}
            </CustomButton>
            <CustomButton
              color={confirmState.continueColor}
              variant={confirmState.continueVariant}
              onClick={confirmState.continueAction}
              loading={actionLoading}
            >
              {confirmState.continueText}
            </CustomButton>
          </Stack>
        </Alert>
      )}
    </div>
  )
}

export default ActiveOrder

const CustomButton = styled(LoadingButton)({
  borderRadius: 4,
  fontWeight: 400,
  paddingLeft: 16,
  paddingRight: 16,
  fontSize: 13
})
