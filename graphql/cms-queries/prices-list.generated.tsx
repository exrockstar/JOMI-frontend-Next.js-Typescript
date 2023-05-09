import * as Types from '../types';

import { gql } from '@apollo/client';
import { PricePartsFragmentDoc } from './PriceParts.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type PricesListQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.PriceFilterInput>;
}>;


export type PricesListQuery = { __typename?: 'Query', prices: Array<{ __typename?: 'StripePrice', _id: string, priceId: string, product: string, countryCodes?: Array<Types.CountryEnum> | null | undefined, countryCode?: Types.CountryEnum | null | undefined, nickname: string, interval: Types.OrderInterval, unit_amount: number, currency: string }> };

export type GetDefaultPricesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetDefaultPricesQuery = { __typename?: 'Query', prices: Array<{ __typename?: 'StripePrice', product: string, _id: string }> };


export const PricesListDocument = gql`
    query PricesList($input: PriceFilterInput) {
  prices(input: $input) {
    ...PriceParts
  }
}
    ${PricePartsFragmentDoc}`;

/**
 * __usePricesListQuery__
 *
 * To run a query within a React component, call `usePricesListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePricesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePricesListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePricesListQuery(baseOptions?: Apollo.QueryHookOptions<PricesListQuery, PricesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PricesListQuery, PricesListQueryVariables>(PricesListDocument, options);
      }
export function usePricesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PricesListQuery, PricesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PricesListQuery, PricesListQueryVariables>(PricesListDocument, options);
        }
export type PricesListQueryHookResult = ReturnType<typeof usePricesListQuery>;
export type PricesListLazyQueryHookResult = ReturnType<typeof usePricesListLazyQuery>;
export type PricesListQueryResult = Apollo.QueryResult<PricesListQuery, PricesListQueryVariables>;
export const GetDefaultPricesDocument = gql`
    query GetDefaultPrices {
  prices: getDefaultPrices {
    product
    _id
  }
}
    `;

/**
 * __useGetDefaultPricesQuery__
 *
 * To run a query within a React component, call `useGetDefaultPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDefaultPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDefaultPricesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDefaultPricesQuery(baseOptions?: Apollo.QueryHookOptions<GetDefaultPricesQuery, GetDefaultPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDefaultPricesQuery, GetDefaultPricesQueryVariables>(GetDefaultPricesDocument, options);
      }
export function useGetDefaultPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDefaultPricesQuery, GetDefaultPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDefaultPricesQuery, GetDefaultPricesQueryVariables>(GetDefaultPricesDocument, options);
        }
export type GetDefaultPricesQueryHookResult = ReturnType<typeof useGetDefaultPricesQuery>;
export type GetDefaultPricesLazyQueryHookResult = ReturnType<typeof useGetDefaultPricesLazyQuery>;
export type GetDefaultPricesQueryResult = Apollo.QueryResult<GetDefaultPricesQuery, GetDefaultPricesQueryVariables>;