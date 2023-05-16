import * as Types from '../types';

import { gql } from '@apollo/client';
export type PricePartsFragment = { __typename?: 'StripePrice', _id: string, priceId: string, product: string, countryCodes?: Array<Types.CountryEnum> | null | undefined, countryCode?: Types.CountryEnum | null | undefined, nickname: string, interval?: Types.OrderInterval | null | undefined, unit_amount: number, currency: string };

export const PricePartsFragmentDoc = gql`
    fragment PriceParts on StripePrice {
  _id
  priceId
  product
  countryCodes
  countryCode
  nickname
  interval
  unit_amount
  currency
}
    `;