import { ApolloError } from '@apollo/client'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import {
  CancelOrderMutation,
  CancelOrderMutationVariables,
  CancelOrderDocument
} from 'graphql/mutations/order.generated'
import { logger } from 'logger/logger'
import Stripe from 'stripe'

/**
 * * NOTE: If JOMI will have other subscriptions for other products. this has to be handled properly based on some metadata.
 * https://stripe.com/docs/api/events/types#event_types-customer.subscription.deleted
 * @param subscription
 */
export async function handleCustomerSubscriptonDeleted(
  subscription: Stripe.Subscription
) {
  logger.info(
    '[WebhookHandler] Customer Subscription Deleted. Updating Order',
    {
      id: subscription.id,
      userId: subscription.customer
    }
  )
  const client = getApolloAdminClient()
  try {
    const { data } = await client.mutate<
      CancelOrderMutation,
      CancelOrderMutationVariables
    >({
      variables: {
        subscription_id: subscription.id
      },
      mutation: CancelOrderDocument
    })
  } catch (e) {
    if (e instanceof ApolloError) {
      logger.error(`[WebhookHandler] CancelOrderMutation Error. ${e.message}`, {
        stack: e.stack
      })

      throw Error(`CancelOrderMutation Error. ${e.message}`)
    }
  }
}
