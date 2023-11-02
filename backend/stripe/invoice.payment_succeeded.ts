import { ApolloError } from '@apollo/client'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import dayjs from 'dayjs'
import {
  UpdateStripeCodeDocument,
  UpdateStripeCodeMutation,
  UpdateStripeCodeMutationVariables
} from 'graphql/cms-queries/stripe-promo-codes.generated'
import {
  AddOrUpdateOrderMutation,
  AddOrUpdateOrderMutationVariables,
  AddOrUpdateOrderDocument
} from 'graphql/mutations/order.generated'
import { OrderInput, OrderType } from 'graphql/types'
import { logger } from 'logger/logger'

import Stripe from 'stripe'
import { PriceMetadata } from './common/PriceMetadata'
import { amplitudeTrackRenewal } from 'apis/amplitude'
import { analytics } from 'apis/analytics'

const API_KEY = process.env.STRIPE_SECRET_KEY

export const stripe = new Stripe(API_KEY, {
  apiVersion: '2020-08-27',
  maxNetworkRetries: 2
})

/**
 * Handles payment for subscriptions only.
 * * NOTE: If JOMI will have other subscriptions for other products. this has to be handled properly based on some metadata.
 * @param invoice
 */
export async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  // filter only for subscription events so that we don't accidentally create order for one time payments,
  // from other sources.
  // logger.debug(invoice)
  if (!invoice.subscription) {
    logger.error('Invoice is not a subscription', {
      invoice_id: invoice.id
    })
    return false
  }

  const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)

  const created = new Date(0)
  const start = new Date(0)
  const end = new Date(0)

  // Subtracting 24 hours is required, otherwise system doesn't pick it up
  const oneDay = 1 * 60 * 60 * 24

  // Adds padding to end time
  const oneHour = 1 * 60 * 60

  created.setSeconds(subscription.created)
  start.setSeconds(subscription.current_period_start - oneDay)
  end.setSeconds(subscription.current_period_end + oneHour)
  const subscrpition_data = subscription.items.data[0]
  const plan = subscrpition_data.plan
  const price = subscrpition_data.price
  //subscription_metadata - used to get description for old orders
  const subscription_metadata = invoice.lines.data[0].metadata as any
  const metadata = price.metadata as unknown as PriceMetadata

  const description = plan.nickname || price.nickname || subscription_metadata?.description

  const discount = invoice.discount
  const order: OrderInput = {
    start,
    end,
    amount: invoice.amount_paid / 100,
    plan_id: invoice.subscription as string,
    user_id: invoice.customer as string,
    created,
    plan_interval: plan.interval,
    description: description,
    latest_invoice: invoice.id,
    type: OrderType.Individual,
    promoCode: metadata.Code,
    stripeCoupon: discount?.coupon?.id,
    stripePromoCode: discount?.promotion_code as string
  }

  logger.info(`[WebhookHandler] Invoice.Payment_Succeeded. Creating/Updating Order...`, {
    plan_id: invoice.subscription,
    userId: invoice.customer,
    plan_interval: price.recurring.interval,
    plan_nickname: plan.nickname,
    description: description
  })

  const client = getApolloAdminClient(true)

  try {
    const { data } = await client.mutate<AddOrUpdateOrderMutation, AddOrUpdateOrderMutationVariables>({
      variables: {
        input: order
      },
      mutation: AddOrUpdateOrderDocument
    })

    amplitudeTrackRenewal({
      transaction_id: order.plan_id,
      value: order.amount,
      promoCode: order.promoCode,
      type: order.type,
      userId: order.user_id,
      items: [
        {
          item_id: order.plan_id,
          item_name: order.description,
          price: order.amount,
          quantity: 1
        }
      ]
    })

    analytics.trackRenewal({
      transaction_id: order.plan_id,
      value: order.amount,
      promoCode: order.promoCode,
      event_label: order.type,
      items: [
        {
          item_id: order.plan_id,
          item_name: order.description,
          price: order.amount,
          quantity: 1
        }
      ]
    })

    if (discount.coupon) {
      await client.mutate<UpdateStripeCodeMutation, UpdateStripeCodeMutationVariables>({
        variables: {
          input: {
            couponId: discount.coupon.id as string,
            times_redeemed: discount.coupon.times_redeemed,
            valid: discount.coupon.valid
          }
        },
        mutation: UpdateStripeCodeDocument
      })
    }
  } catch (e) {
    if (e instanceof ApolloError) {
      logger.error(`[WebhookHandler] Create/Update order failed. ${e.message}`, e)

      throw Error(`Create/Update order failed. ${e.message}`)
    }
  }
}
