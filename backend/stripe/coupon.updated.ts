import { getApolloAdminClient } from 'apis/apollo-admin-client'
import {
  UpdateStripeCodeDocument,
  UpdateStripeCodeMutation,
  UpdateStripeCodeMutationVariables
} from 'graphql/cms-queries/stripe-promo-codes.generated'
import { logger } from 'logger/logger'
import Stripe from 'stripe'

const API_KEY = process.env.STRIPE_SECRET_KEY

export const stripe = new Stripe(API_KEY, {
  apiVersion: '2020-08-27',
  maxNetworkRetries: 2
})

export async function handleCouponUpdated(coupon: Stripe.Coupon) {
  try {
    const client = getApolloAdminClient()

    await client.mutate<
      UpdateStripeCodeMutation,
      UpdateStripeCodeMutationVariables
    >({
      variables: {
        input: {
          couponId: coupon.id,
          name: coupon.name
        }
      },
      mutation: UpdateStripeCodeDocument
    })
    logger.info('[WebhookHandler] handleCouponUpdated', {
      couponId: coupon.id
    })
  } catch (e) {
    if (e instanceof Error) {
      logger.error('[WebhookHandler] handleCouponUpdated', {
        message: e.message,
        stack: e.stack,
        couponId: coupon.id
      })
    }
    throw e
  }
}
