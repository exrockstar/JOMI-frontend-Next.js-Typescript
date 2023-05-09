import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetCombinedPromoCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String'];
}>;


export type GetCombinedPromoCodeQuery = { __typename?: 'Query', output: { __typename?: 'CombinedCodeOutput', promoCode?: { __typename?: 'PromoCode', _id: string, title: string, days?: number | null | undefined, price?: number | null | undefined, isSubscription: boolean, stripe?: { __typename?: 'StripePromo', price: string } | null | undefined } | null | undefined, stripeCode?: { __typename?: 'StripePromoCode', _id: string, name?: string | null | undefined, code: string, valid: boolean, couponId: string, duration?: Types.PromoCodeDuration | null | undefined, duration_in_months?: number | null | undefined, amount_off?: number | null | undefined, percent_off?: number | null | undefined } | null | undefined } };

export type HandleFreePromoCodeMutationVariables = Types.Exact<{
  code: Types.Scalars['String'];
}>;


export type HandleFreePromoCodeMutation = { __typename?: 'Mutation', handleFreePromoCode: boolean };


export const GetCombinedPromoCodeDocument = gql`
    query GetCombinedPromoCode($code: String!) {
  output: getCombinedPromoCode(code: $code) {
    promoCode {
      _id
      title
      days
      price
      isSubscription
      stripe {
        price
      }
    }
    stripeCode {
      _id
      name
      code
      valid
      couponId
      duration
      duration_in_months
      amount_off
      percent_off
    }
  }
}
    `;

/**
 * __useGetCombinedPromoCodeQuery__
 *
 * To run a query within a React component, call `useGetCombinedPromoCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCombinedPromoCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCombinedPromoCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetCombinedPromoCodeQuery(baseOptions: Apollo.QueryHookOptions<GetCombinedPromoCodeQuery, GetCombinedPromoCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCombinedPromoCodeQuery, GetCombinedPromoCodeQueryVariables>(GetCombinedPromoCodeDocument, options);
      }
export function useGetCombinedPromoCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCombinedPromoCodeQuery, GetCombinedPromoCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCombinedPromoCodeQuery, GetCombinedPromoCodeQueryVariables>(GetCombinedPromoCodeDocument, options);
        }
export type GetCombinedPromoCodeQueryHookResult = ReturnType<typeof useGetCombinedPromoCodeQuery>;
export type GetCombinedPromoCodeLazyQueryHookResult = ReturnType<typeof useGetCombinedPromoCodeLazyQuery>;
export type GetCombinedPromoCodeQueryResult = Apollo.QueryResult<GetCombinedPromoCodeQuery, GetCombinedPromoCodeQueryVariables>;
export const HandleFreePromoCodeDocument = gql`
    mutation HandleFreePromoCode($code: String!) {
  handleFreePromoCode(code: $code)
}
    `;
export type HandleFreePromoCodeMutationFn = Apollo.MutationFunction<HandleFreePromoCodeMutation, HandleFreePromoCodeMutationVariables>;

/**
 * __useHandleFreePromoCodeMutation__
 *
 * To run a mutation, you first call `useHandleFreePromoCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleFreePromoCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleFreePromoCodeMutation, { data, loading, error }] = useHandleFreePromoCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useHandleFreePromoCodeMutation(baseOptions?: Apollo.MutationHookOptions<HandleFreePromoCodeMutation, HandleFreePromoCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleFreePromoCodeMutation, HandleFreePromoCodeMutationVariables>(HandleFreePromoCodeDocument, options);
      }
export type HandleFreePromoCodeMutationHookResult = ReturnType<typeof useHandleFreePromoCodeMutation>;
export type HandleFreePromoCodeMutationResult = Apollo.MutationResult<HandleFreePromoCodeMutation>;
export type HandleFreePromoCodeMutationOptions = Apollo.BaseMutationOptions<HandleFreePromoCodeMutation, HandleFreePromoCodeMutationVariables>;