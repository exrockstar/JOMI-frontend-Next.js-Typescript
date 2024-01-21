import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserPricesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserPricesQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, user_type?: string | null, subActive: boolean, isTrialsFeatureEnabled: boolean, trialDuration?: number | null, trialsAllowed: boolean, activeOrder?: { __typename?: 'Order', _id: string, start?: any | null, end?: any | null, description?: string | null, isCanceled?: boolean | null, plan_interval?: Types.OrderInterval | null, type?: Types.OrderType | null, amount?: number | null, promoCode?: string | null, currency?: Types.OrderCurrency | null, error_code?: string | null, erroredAt?: any | null, discount?: { __typename?: 'StripePromoCode', code: string, name?: string | null, duration?: Types.PromoCodeDuration | null, duration_in_months?: number | null, amount_off?: number | null, percent_off?: number | null } | null } | null, stripeData: { __typename?: 'UserStripeData', stripeId: string, prices: Array<{ __typename?: 'StripePrice', product: string, currency: string, nickname: string, unit_amount: number, unit_decimal?: string | null, interval?: Types.OrderInterval | null, id?: string | null }> } } | null };

export type GetPaymentStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPaymentStatusQuery = { __typename?: 'Query', paymentStatus?: string | null };


export const UserPricesDocument = gql`
    query UserPrices {
  user {
    _id
    user_type
    subActive
    isTrialsFeatureEnabled
    trialDuration
    trialsAllowed
    activeOrder {
      _id
      start
      end
      description
      isCanceled
      plan_interval
      type
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
      error_code
      erroredAt
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
export const GetPaymentStatusDocument = gql`
    query GetPaymentStatus {
  paymentStatus: getPaymentIntentStatus
}
    `;

/**
 * __useGetPaymentStatusQuery__
 *
 * To run a query within a React component, call `useGetPaymentStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPaymentStatusQuery(baseOptions?: Apollo.QueryHookOptions<GetPaymentStatusQuery, GetPaymentStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentStatusQuery, GetPaymentStatusQueryVariables>(GetPaymentStatusDocument, options);
      }
export function useGetPaymentStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentStatusQuery, GetPaymentStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentStatusQuery, GetPaymentStatusQueryVariables>(GetPaymentStatusDocument, options);
        }
export type GetPaymentStatusQueryHookResult = ReturnType<typeof useGetPaymentStatusQuery>;
export type GetPaymentStatusLazyQueryHookResult = ReturnType<typeof useGetPaymentStatusLazyQuery>;
export type GetPaymentStatusQueryResult = Apollo.QueryResult<GetPaymentStatusQuery, GetPaymentStatusQueryVariables>;