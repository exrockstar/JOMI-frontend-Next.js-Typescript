import { getApolloUserClient } from 'apis/apollo-admin-client'
import Cookies from 'cookies'
import {
  GetPriceByProductIdDocument,
  GetPriceByProductIdQuery,
  GetPriceByProductIdQueryVariables
} from 'graphql/mutations/purchase-article.generated'
import {
  UserPricesDocument,
  UserPricesQuery,
  UserPricesQueryVariables
} from 'graphql/queries/user-prices.generated'
import { logger } from 'logger/logger'
import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import Stripe from 'stripe'
logger.info(process.env.STRIPE_SECRET_KEY)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  maxNetworkRetries: 2
})

export default async function handler(req: NextApiRequest, res) {
  const { userId, description, articleId, from, type, coupon } = req.body
  console.log('coupon', coupon)
  if (req.method === 'POST') {
    try {
      const secret = process.env.SECRET
      const token = await getToken({
        req: req,
        secret: secret
      })

      if (!token) {
        const signupUrl = new URL(
          '/signup',
          req.headers.origin ?? 'http://localhost:3000'
        )

        signupUrl.searchParams.append('from', from)

        res.redirect(303, signupUrl.toString()).end()
        return
      }

      const cookies = new Cookies(req, res)
      const client = getApolloUserClient(req.headers, cookies)
      const userData = await client.query<UserPricesQuery>({
        query: UserPricesDocument,
        context: {
          headers: {
            authorization: `Bearer ${token.token}`
          }
        }
      })
      console.log(JSON.stringify(userData))
      const purchaseOrRentPrice = await client.query<
        GetPriceByProductIdQuery,
        GetPriceByProductIdQueryVariables
      >({
        query: GetPriceByProductIdDocument,
        variables: {
          product_id:
            type === 'purchase-article'
              ? 'product_purchase_article'
              : 'product_rent_article'
        },
        context: {
          headers: {
            authorization: `Bearer ${token.token}`
          }
        }
      })
      const params: Stripe.Checkout.SessionCreateParams = {
        customer: userData?.data?.user.stripeData?.stripeId,
        line_items: [
          {
            price: purchaseOrRentPrice.data?.getPriceByProductId?.priceId,
            quantity: 1,
            description
          }
        ],

        mode: 'payment',
        success_url: from,
        cancel_url: from,
        metadata: {
          description,
          type: type,
          articleId: articleId
        }
      }

      if (coupon) {
        params.discounts = [
          {
            coupon: coupon
          }
        ]
        params.metadata.couponId = coupon
      }
      const session = await stripe.checkout.sessions.create(params)

      logger.info(`[Checkout Session] Created checkout session for user.`, {
        userId: userId
      })

      res.redirect(303, session.url).end()
    } catch (err) {
      const message = `[Checkout Session] Failed to create checkout session for user. ${err.message}`

      const encodedMessage = encodeURIComponent(err.message)
      const _url = new URL(from)
      _url.searchParams.append('error', encodedMessage)
      logger.error(message, {
        userId: userId,
        _url
      })
      res.redirect(303, _url.toString()).end()
      return
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
