import { ApolloError } from '@apollo/client'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import dayjs from 'dayjs'
import {
  AddOrUpdateOrderMutation,
  AddOrUpdateOrderMutationVariables,
  AddOrUpdateOrderDocument
} from 'graphql/mutations/order.generated'
import { OrderInput, OrderType, PromoCode, PromoCodeType } from 'graphql/types'
import { logger } from 'logger/logger'
import Stripe from 'stripe'
import { PriceMetadata } from './common/PriceMetadata'

const API_KEY = process.env.STRIPE_SECRET_KEY

export const stripe = new Stripe(API_KEY, {
  apiVersion: '2020-08-27',
  maxNetworkRetries: 2
})

/**
 * Handles timed promo code payment and order creation
 * @param session
 * @returns
 */
export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  //if checkout session is a subscription. We don't process it here, instead on invoice.payment_succeeded.
  if (session.mode !== 'payment' || session.payment_status !== 'paid') return

  try {
    const priceId = session.metadata.priceId
    const price = await stripe.prices.retrieve(priceId)
    const metadata = price.metadata as unknown as PriceMetadata

    const end = dayjs().add(metadata.Days, 'day').add(1, 'hour').toDate()
    const start = dayjs().subtract(1, 'day').toDate()

    const order: OrderInput = {
      start: start,
      end: end,
      amount: session.amount_total / 100,
      user_id: session.customer as string,
      created: dayjs().toDate(),
      plan_interval: price.recurring?.interval ?? 'day',
      description: price.nickname,
      type: metadata.Type as unknown as OrderType,
      latest_invoice: null,
      plan_id: null,
      promoCode: metadata.Code
    }

    const client = getApolloAdminClient()
    await client.mutate<
      AddOrUpdateOrderMutation,
      AddOrUpdateOrderMutationVariables
    >({
      variables: {
        input: order
      },
      mutation: AddOrUpdateOrderDocument
    })
    logger.info(
      '[WebhookHandler] handleCheckoutSessionCompleted  - Successful',
      {
        promoCodeId: metadata['Original Code'],
        userId: session.customer
      }
    )
  } catch (e) {
    logger.error(
      `[WebhookHandler] handleCheckoutSessionCompleted - Failed ${e.message}`,
      {
        userId: session.customer
      }
    )
    throw e
  }
}
