import { PromoCode, PromoCodeType } from 'graphql/types'

export type PriceMetadata = {
  Subscription: boolean
  Type: PromoCodeType
  Interval: PromoCode['interval']
  Code: string
  Days: PromoCode['days']
  'Original Code': PromoCode['_id']
  Title: PromoCode['title']
}
