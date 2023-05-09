import { logger } from 'logger/logger'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

/**
 * @deprecated
 * @param req
 * @param res
 */
export default async function handler(req, res) {
  const { priceId, stripeId } = req.body

  if (req.method === 'POST') {
    try {
      const { priceId, stripeId } = req.body
      const session = await stripe.billingPortal.sessions.create({
        customer: stripeId,
        return_url: `${req.headers.origin}/account/subscription`
      })

      logger.info(
        `[Portal Session] Created portal session for user ${stripeId}`,
        {
          userId: stripeId
        }
      )
      res.redirect(303, session.url)
    } catch (err) {
      logger.error(
        `[Portal Session] Failed to create portal session for user. ${err.message}`,
        {
          userId: stripeId
        }
      )
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
