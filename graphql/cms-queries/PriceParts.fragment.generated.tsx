import * as Types from '../types';

import { gql } from '@apollo/client';
export type PricePartsFragment = { __typename?: 'StripePrice', _id: string, priceId?: string | null | undefined, product: string, interval?: Types.OrderInterval | null | undefined, unit_amount: number };

export const PricePartsFragmentDoc = gql`
    fragment PriceParts on StripePrice {
  _id
  priceId
  product
  interval
  unit_amount
}
    `;