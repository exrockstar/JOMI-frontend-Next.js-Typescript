import { ApolloError } from '@apollo/client'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import {
  HandlePaymentFailedDocument,
  HandlePaymentFailedMutation,
  HandlePaymentFailedMutationVariables
} from 'graphql/mutations/order.generated'
import { logger } from 'logger/logger'

import Stripe from 'stripe'

const API_KEY = process.env.STRIPE_SECRET_KEY

export const stripe = new Stripe(API_KEY, {
  apiVersion: '2020-08-27',
  maxNetworkRetries: 2
})

/**
 * Handles failed payment for when a subscription is updated
 * @param invoice
 */
export async function handlePaymentFailed(invoice: Stripe.Invoice) {
  logger.info(`[WebhookHandler] Invoice.payment_failed. Updating Order...`, {
    userId: invoice.customer,
    orderId: invoice.subscription
  })
  const client = getApolloAdminClient(true)

  try {
    await client.mutate<
      HandlePaymentFailedMutation,
      HandlePaymentFailedMutationVariables
    >({
      mutation: HandlePaymentFailedDocument,
      variables: {
        error_code: 'payment_failed',
        order_id: invoice.subscription as string
      }
    })
  } catch (e) {
    if (e instanceof ApolloError) {
      logger.error(`HandlePaymentFailedMutation failed. ${e.message}`, e)

      throw Error(`HandlePaymentFailedMutation failed. ${e.message}`)
    }
  }
}
