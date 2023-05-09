import Stripe from 'stripe'
import { buffer } from 'micro'
import Cors from 'micro-cors'
import { logger } from 'logger/logger'
import { handleInvoicePaymentSucceeded } from 'backend/stripe/invoice.payment_succeeded'
import { handleCustomerSubscriptonDeleted } from 'backend/stripe/customer.subscription.deleted'
import { handleCheckoutSessionCompleted } from 'backend/stripe/checkout.session.completed'
import { handleCouponUpdated } from 'backend/stripe/coupon.updated'

//@ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false
  }
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD']
})

//TODO Refactor specific handlers if this file gets too big.
const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const signature = req.headers['stripe-signature']

    let event
    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        signature,
        webhookSecret
      )
    } catch (err) {
      // On error, log and return the error message.
      logger.error(
        `[WebhookHandler] Failed to constructed event: ${err.message}`
      )
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    //TODO: refactor each object to its own handlers
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        logger.debug(paymentIntent)
        logger.info(
          `[WebhookHandler] PaymentIntent succeeded. status: ${paymentIntent.status}`,
          {
            userId: paymentIntent.customer,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency
          }
        )
        break
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        logger.error(
          `[WebhookHandler]  ❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
        )
        break
      }
      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge
        logger.info(
          `[WebhookHandler] Charge succeded. Charge id: ${charge.id}`,
          {
            userId: charge.customer,
            amount: charge.amount,
            currency: charge.currency
          }
        )
        break
      }
      case 'checkout.session.completed': {
        try {
          const session = event.data.object as Stripe.Checkout.Session
          await handleCheckoutSessionCompleted(session)
        } catch (e) {
          res.status(500).json({
            message: e.message
          })
          res.end()
          return
        }
        break
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        try {
          await handleInvoicePaymentSucceeded(invoice)
        } catch (e) {
          res.status(500).json({
            message: `Invoice Subscription Error: ${e.message}`
          })
          res.end()
          return
        }
        break
      }
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        logger.info('[WebhookHandler] Customer Subscription Updated.', {
          id: subscription.id,
          current_period_end: subscription.current_period_end,
          cancel_at_period_end: subscription.cancel_at_period_end,
          days_until_due: subscription.days_until_due,
          default_payment_method: subscription.default_payment_method,
          userId: subscription.customer
        })
        break
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        logger.info('[WebhookHandler] Customer Subscription Updated.', {
          id: subscription.id,
          current_period_end: subscription.current_period_end,
          cancel_at_period_end: subscription.cancel_at_period_end,
          days_until_due: subscription.days_until_due,
          default_payment_method: subscription.default_payment_method,
          userId: subscription.customer
        })
        break
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        try {
          await handleCustomerSubscriptonDeleted(subscription)
        } catch (e) {
          res.status(500).json({
            message: `Customer Subscription Deleted Error: ${e.message}`
          })
          res.end()
          return
        }
        break
      }
      // case 'coupon.updated': {
      //   const coupon = event.data.object as Stripe.Coupon
      //   try {
      //     await handleCouponUpdated(coupon)
      //   } catch (e) {
      //     res.status(500).json({
      //       message: `Internal Server Error: ${e.message}`
      //     })
      //     res.end()
      //     return
      //   }
      //   break
      // }
      default: {
        break
      }
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default cors(webhookHandler)
