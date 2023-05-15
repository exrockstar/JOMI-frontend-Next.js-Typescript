import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UserPricesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserPricesQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, user_type?: string | null | undefined, subActive: boolean, activeOrder?: { __typename?: 'Order', _id: string, start?: any | null | undefined, end?: any | null | undefined, description?: string | null | undefined, isCanceled?: boolean | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, isTrialPeriod: boolean, amount?: number | null | undefined, promoCode?: string | null | undefined, currency?: Types.OrderCurrency | null | undefined, discount?: { __typename?: 'StripePromoCode', code: string, name?: string | null | undefined, duration?: Types.PromoCodeDuration | null | undefined, duration_in_months?: number | null | undefined, amount_off?: number | null | undefined, percent_off?: number | null | undefined } | null | undefined } | null | undefined, stripeData: { __typename?: 'UserStripeData', stripeId: string, isTrialsFeatureEnabled: boolean, trialDuration: number, trial_order_count: number, prices: Array<{ __typename?: 'StripePrice', product: string, currency: string, nickname: string, unit_amount: number, unit_decimal?: string | null | undefined, interval?: Types.OrderInterval | null | undefined, id: string }> } } | null | undefined };


export const UserPricesDocument = gql`
    query UserPrices {
  user {
    _id
    user_type
    subActive
    activeOrder {
      _id
      start
      end
      description
      isCanceled
      plan_interval
      isTrialPeriod
      amount
      promoCode
      currency
      discount {
        code
        name
        duration
        duration_in_months
        amount_off
        percent_off
      }
    }
    stripeData {
      stripeId
      prices {
        id: priceId
        product
        currency
        nickname
        unit_amount
        unit_decimal
        interval
      }
      isTrialsFeatureEnabled
      trialDuration
      trial_order_count
    }
  }
}
    `;

/**
 * __useUserPricesQuery__
 *
 * To run a query within a React component, call `useUserPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPricesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserPricesQuery(baseOptions?: Apollo.QueryHookOptions<UserPricesQuery, UserPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserPricesQuery, UserPricesQueryVariables>(UserPricesDocument, options);
      }
export function useUserPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPricesQuery, UserPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserPricesQuery, UserPricesQueryVariables>(UserPricesDocument, options);
        }
export type UserPricesQueryHookResult = ReturnType<typeof useUserPricesQuery>;
export type UserPricesLazyQueryHookResult = ReturnType<typeof useUserPricesLazyQuery>;
export type UserPricesQueryResult = Apollo.QueryResult<UserPricesQuery, UserPricesQueryVariables>;