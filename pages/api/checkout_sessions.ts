import { getApolloAdminClient } from 'apis/apollo-admin-client'
import {
  GetStripePromoCodeByCodeDocument,
  GetStripePromoCodeByCodeQuery,
  GetStripePromoCodeByCodeQueryVariables
} from 'graphql/cms-queries/stripe-promo-codes.generated'
import { snakeCase } from 'lodash'
import { logger } from 'logger/logger'
import Stripe from 'stripe'

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  maxNetworkRetries: 2
})

export default async function handler(req, res) {
  const {
    priceId,
    stripeId,
    mode,
    description,
    amount,
    promocode,
    productId,
    interval,
    duration
  } = req.body
  let metadata: Stripe.MetadataParam = {}
  if (req.method === 'POST') {
    try {
      let line_items: Stripe.Checkout.SessionCreateParams['line_items']
      let subscription_data: Stripe.Checkout.SessionCreateParams.SubscriptionData
      if (mode === 'subscription') {
        if (!productId) {
          // By Jasser: for v4 promocodes. It Doesn't have productId so we just create an artibitrary product_data
          line_items = [
            {
              description,
              quantity: 1,
              price_data: {
                recurring: {
                  interval: interval
                },
                unit_amount: amount,
                product_data: {
                  name: `CODE: ${description}`
                },
                currency: 'USD'
              }
            }
          ]

          subscription_data = {
            metadata: {
              description: `CODE: ${description}`
            }
          }
        } else {
          line_items = [
            {
              description,
              quantity: 1,
              price_data: {
                recurring: {
                  interval: interval
                },
                unit_amount: amount,
                product: productId,
                currency: 'USD'
              }
            }
          ]
          subscription_data = {
            metadata: {
              description: description
            }
          }
        }
      } else {
        //for timed promcodes
        line_items = [
          {
            quantity: 1,
            description,
            amount: amount,
            currency: 'USD',
            name: description
          }
        ]
        metadata = {
          handleTimedCodes: 'Yes',
          promocode,
          interval,
          duration,
          description: `CODE: ${description}`
        }
      }
      const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = []
      if (promocode && productId && interval) {
        const product = `${snakeCase(productId)}_${interval}`
        const client = getApolloAdminClient(true)
        const { data } = await client.query<
          GetStripePromoCodeByCodeQuery,
          GetStripePromoCodeByCodeQueryVariables
        >({
          query: GetStripePromoCodeByCodeDocument,
          variables: {
            code: promocode
          }
        })
        const output = data.getStripePromoCodeByCode
        if (!output.valid) {
          throw new Error('This code has expired or is invalid.')
        }

        if (!output.applies_to.length || output.applies_to.includes(product)) {
          discounts.push({
            coupon: output.couponId
          })
        } else {
          throw new Error(
            `This code cannot be applied to the selected subscription.`
          )
        }
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        customer: stripeId,
        line_items,
        mode: mode,
        discounts,
        success_url: `${req.headers.origin}/account/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/account/subscription/?canceled=true`,
        subscription_data,
        metadata: {
          priceId: priceId,
          description: description,
          ...metadata
        }
      })

      logger.info(`[Checkout Session] Created checkout session for user.`, {
        userId: stripeId
      })

      res.redirect(303, session.url).end()
    } catch (err) {
      let message = err.message
      switch (err.code) {
        case 'coupon_expired':
          message = 'This code has expired or is invalid.'
          break
        case 'coupon_applies_to_nothing':
          message = `This code cannot be applied to the selected subscription.`
          break
        default:
          break
      }

      logger.error(
        `[Checkout Session] Failed to create checkout session for user. ${err.message}`,
        {
          userId: stripeId,
          message
        }
      )

      res
        .redirect(
          303,
          `${
            req.headers.origin
          }/account/subscription/?error=${encodeURIComponent(message)}`
        )
        .end()
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
