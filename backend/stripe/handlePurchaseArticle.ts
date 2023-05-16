import { ApolloError } from '@apollo/client'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import dayjs from 'dayjs'
import {
  AddOrUpdateOrderMutation,
  AddOrUpdateOrderMutationVariables,
  AddOrUpdateOrderDocument
} from 'graphql/mutations/order.generated'
import {
  PurchaseArticleDocument,
  PurchaseArticleMutation,
  PurchaseArticleMutationFn,
  PurchaseArticleMutationVariables
} from 'graphql/mutations/purchase-article.generated'
import {
  ArticlePurchaseInput,
  OrderInput,
  OrderType,
  PromoCode,
  PromoCodeType
} from 'graphql/types'
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
export async function handlePurchaseArticle(session: Stripe.Checkout.Session) {
  try {
    const metadata = session.metadata
    const input: ArticlePurchaseInput = {
      amount: session.amount_total / 100,
      user_id: session.customer as string,
      stripeCoupon: metadata.couponId,
      description: metadata.description,
      articleId: metadata.articleId,
      type: metadata.type as OrderType
    }

    const client = getApolloAdminClient()
    await client.mutate<
      PurchaseArticleMutation,
      PurchaseArticleMutationVariables
    >({
      variables: { input },
      mutation: PurchaseArticleDocument
    })
  } catch (e) {
    logger.error(e)
    throw e
  }
}
