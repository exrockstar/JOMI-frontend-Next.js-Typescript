import * as Types from '../types';

import { gql } from '@apollo/client';
export type PricePartsFragment = { __typename?: 'StripePrice', _id: string, priceId?: string | null, product: string, interval?: Types.OrderInterval | null, unit_amount: number };

export const PricePartsFragmentDoc = gql`
    fragment PriceParts on StripePrice {
  _id
  priceId
  product
  interval
  unit_amount
}
    `;