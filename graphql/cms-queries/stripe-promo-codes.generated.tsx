import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetStripePromoCodesQueryVariables = Types.Exact<{
  input: Types.StripePromoCodeListInput;
}>;


export type GetStripePromoCodesQuery = { __typename?: 'Query', getStripePromoCodes: { __typename?: 'StripePromoCodeListOutput', totalCount: number, items: Array<{ __typename?: 'StripePromoCode', _id: string, amount_off?: number | null, percent_off?: number | null, duration?: Types.PromoCodeDuration | null, duration_in_months?: number | null, name?: string | null, applies_to?: Array<string> | null, redeem_by?: any | null, code: string, couponId: string, created: any, max_redemptions?: number | null, times_redeemed: number, valid: boolean, active?: boolean | null }> } };

export type GetStripePromoCodeQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetStripePromoCodeQuery = { __typename?: 'Query', getStripePromoCode: { __typename?: 'StripePromoCode', _id: string, amount_off?: number | null, percent_off?: number | null, duration?: Types.PromoCodeDuration | null, duration_in_months?: number | null, name?: string | null, applies_to?: Array<string> | null, redeem_by?: any | null, code: string, couponId: string, created: any, max_redemptions?: number | null, times_redeemed: number, valid: boolean, active?: boolean | null, createdBy?: { __typename?: 'User', _id: string, display_name?: string | null } | null } };

export type GetStripePromoCodeByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;


export type GetStripePromoCodeByCodeQuery = { __typename?: 'Query', getStripePromoCodeByCode: { __typename?: 'StripePromoCode', _id: string, amount_off?: number | null, percent_off?: number | null, duration?: Types.PromoCodeDuration | null, duration_in_months?: number | null, name?: string | null, applies_to?: Array<string> | null, redeem_by?: any | null, code: string, couponId: string, created: any, max_redemptions?: number | null, times_redeemed: number, valid: boolean, active?: boolean | null, createdBy?: { __typename?: 'User', _id: string, display_name?: string | null } | null } };

export type PromoCodeRedeemListQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  input: Types.RedeemListInput;
}>;


export type PromoCodeRedeemListQuery = { __typename?: 'Query', orders: { __typename?: 'RedeemListOutput', totalCount: number, items: Array<{ __typename?: 'Payment', _id: string, userId: string, created: any, amount: number, invoiceId: string, user?: { __typename?: 'User', email: string } | null, order?: { __typename?: 'Order', _id: string, description?: string | null } | null }> } };

export type CreateStripeCodeMutationVariables = Types.Exact<{
  input: Types.CreatePromoCodeInput;
}>;


export type CreateStripeCodeMutation = { __typename?: 'Mutation', createStripePromoCode: { __typename?: 'StripePromoCode', _id: string, couponId: string, valid: boolean, code: string, name?: string | null } };

export type UpdateStripeCodeMutationVariables = Types.Exact<{
  input: Types.UpdateStripeCodeInput;
}>;


export type UpdateStripeCodeMutation = { __typename?: 'Mutation', updateStripePromoCode: { __typename?: 'StripePromoCode', _id: string, couponId: string, valid: boolean, code: string, name?: string | null } };

export type DeleteStripePromoCodeMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteStripePromoCodeMutation = { __typename?: 'Mutation', deleteStripePromocode: boolean };


export const GetStripePromoCodesDocument = gql`
    query GetStripePromoCodes($input: StripePromoCodeListInput!) {
  getStripePromoCodes(input: $input) {
    items {
      _id
      amount_off
      percent_off
      duration
      duration_in_months
      name
      applies_to
      redeem_by
      code
      couponId
      created
      max_redemptions
      times_redeemed
      valid
      active
    }
    totalCount
  }
}
    `;

/**
 * __useGetStripePromoCodesQuery__
 *
 * To run a query within a React component, call `useGetStripePromoCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStripePromoCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStripePromoCodesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetStripePromoCodesQuery(baseOptions: Apollo.QueryHookOptions<GetStripePromoCodesQuery, GetStripePromoCodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStripePromoCodesQuery, GetStripePromoCodesQueryVariables>(GetStripePromoCodesDocument, options);
      }
export function useGetStripePromoCodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStripePromoCodesQuery, GetStripePromoCodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStripePromoCodesQuery, GetStripePromoCodesQueryVariables>(GetStripePromoCodesDocument, options);
        }
export type GetStripePromoCodesQueryHookResult = ReturnType<typeof useGetStripePromoCodesQuery>;
export type GetStripePromoCodesLazyQueryHookResult = ReturnType<typeof useGetStripePromoCodesLazyQuery>;
export type GetStripePromoCodesQueryResult = Apollo.QueryResult<GetStripePromoCodesQuery, GetStripePromoCodesQueryVariables>;
export const GetStripePromoCodeDocument = gql`
    query GetStripePromoCode($id: String!) {
  getStripePromoCode(id: $id) {
    _id
    amount_off
    percent_off
    duration
    duration_in_months
    name
    applies_to
    redeem_by
    code
    couponId
    created
    max_redemptions
    times_redeemed
    valid
    active
    createdBy {
      _id
      display_name
    }
  }
}
    `;

/**
 * __useGetStripePromoCodeQuery__
 *
 * To run a query within a React component, call `useGetStripePromoCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStripePromoCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStripePromoCodeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetStripePromoCodeQuery(baseOptions: Apollo.QueryHookOptions<GetStripePromoCodeQuery, GetStripePromoCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStripePromoCodeQuery, GetStripePromoCodeQueryVariables>(GetStripePromoCodeDocument, options);
      }
export function useGetStripePromoCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStripePromoCodeQuery, GetStripePromoCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStripePromoCodeQuery, GetStripePromoCodeQueryVariables>(GetStripePromoCodeDocument, options);
        }
export type GetStripePromoCodeQueryHookResult = ReturnType<typeof useGetStripePromoCodeQuery>;
export type GetStripePromoCodeLazyQueryHookResult = ReturnType<typeof useGetStripePromoCodeLazyQuery>;
export type GetStripePromoCodeQueryResult = Apollo.QueryResult<GetStripePromoCodeQuery, GetStripePromoCodeQueryVariables>;
export const GetStripePromoCodeByCodeDocument = gql`
    query GetStripePromoCodeByCode($code: String!) {
  getStripePromoCodeByCode(code: $code) {
    _id
    amount_off
    percent_off
    duration
    duration_in_months
    name
    applies_to
    redeem_by
    code
    couponId
    created
    max_redemptions
    times_redeemed
    valid
    active
    createdBy {
      _id
      display_name
    }
  }
}
    `;

/**
 * __useGetStripePromoCodeByCodeQuery__
 *
 * To run a query within a React component, call `useGetStripePromoCodeByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStripePromoCodeByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStripePromoCodeByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetStripePromoCodeByCodeQuery(baseOptions: Apollo.QueryHookOptions<GetStripePromoCodeByCodeQuery, GetStripePromoCodeByCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStripePromoCodeByCodeQuery, GetStripePromoCodeByCodeQueryVariables>(GetStripePromoCodeByCodeDocument, options);
      }
export function useGetStripePromoCodeByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStripePromoCodeByCodeQuery, GetStripePromoCodeByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStripePromoCodeByCodeQuery, GetStripePromoCodeByCodeQueryVariables>(GetStripePromoCodeByCodeDocument, options);
        }
export type GetStripePromoCodeByCodeQueryHookResult = ReturnType<typeof useGetStripePromoCodeByCodeQuery>;
export type GetStripePromoCodeByCodeLazyQueryHookResult = ReturnType<typeof useGetStripePromoCodeByCodeLazyQuery>;
export type GetStripePromoCodeByCodeQueryResult = Apollo.QueryResult<GetStripePromoCodeByCodeQuery, GetStripePromoCodeByCodeQueryVariables>;
export const PromoCodeRedeemListDocument = gql`
    query PromoCodeRedeemList($id: String!, $input: RedeemListInput!) {
  orders: getStripePromocodeRedeems(id: $id, input: $input) {
    items {
      _id
      userId
      user {
        email
      }
      created
      amount
      order {
        _id
        description
      }
      invoiceId
    }
    totalCount
  }
}
    `;

/**
 * __usePromoCodeRedeemListQuery__
 *
 * To run a query within a React component, call `usePromoCodeRedeemListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePromoCodeRedeemListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePromoCodeRedeemListQuery({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePromoCodeRedeemListQuery(baseOptions: Apollo.QueryHookOptions<PromoCodeRedeemListQuery, PromoCodeRedeemListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PromoCodeRedeemListQuery, PromoCodeRedeemListQueryVariables>(PromoCodeRedeemListDocument, options);
      }
export function usePromoCodeRedeemListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PromoCodeRedeemListQuery, PromoCodeRedeemListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PromoCodeRedeemListQuery, PromoCodeRedeemListQueryVariables>(PromoCodeRedeemListDocument, options);
        }
export type PromoCodeRedeemListQueryHookResult = ReturnType<typeof usePromoCodeRedeemListQuery>;
export type PromoCodeRedeemListLazyQueryHookResult = ReturnType<typeof usePromoCodeRedeemListLazyQuery>;
export type PromoCodeRedeemListQueryResult = Apollo.QueryResult<PromoCodeRedeemListQuery, PromoCodeRedeemListQueryVariables>;
export const CreateStripeCodeDocument = gql`
    mutation CreateStripeCode($input: CreatePromoCodeInput!) {
  createStripePromoCode(input: $input) {
    _id
    couponId
    valid
    code
    name
  }
}
    `;
export type CreateStripeCodeMutationFn = Apollo.MutationFunction<CreateStripeCodeMutation, CreateStripeCodeMutationVariables>;

/**
 * __useCreateStripeCodeMutation__
 *
 * To run a mutation, you first call `useCreateStripeCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripeCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripeCodeMutation, { data, loading, error }] = useCreateStripeCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStripeCodeMutation(baseOptions?: Apollo.MutationHookOptions<CreateStripeCodeMutation, CreateStripeCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStripeCodeMutation, CreateStripeCodeMutationVariables>(CreateStripeCodeDocument, options);
      }
export type CreateStripeCodeMutationHookResult = ReturnType<typeof useCreateStripeCodeMutation>;
export type CreateStripeCodeMutationResult = Apollo.MutationResult<CreateStripeCodeMutation>;
export type CreateStripeCodeMutationOptions = Apollo.BaseMutationOptions<CreateStripeCodeMutation, CreateStripeCodeMutationVariables>;
export const UpdateStripeCodeDocument = gql`
    mutation UpdateStripeCode($input: UpdateStripeCodeInput!) {
  updateStripePromoCode(input: $input) {
    _id
    couponId
    valid
    code
    name
  }
}
    `;
export type UpdateStripeCodeMutationFn = Apollo.MutationFunction<UpdateStripeCodeMutation, UpdateStripeCodeMutationVariables>;

/**
 * __useUpdateStripeCodeMutation__
 *
 * To run a mutation, you first call `useUpdateStripeCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStripeCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStripeCodeMutation, { data, loading, error }] = useUpdateStripeCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStripeCodeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStripeCodeMutation, UpdateStripeCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStripeCodeMutation, UpdateStripeCodeMutationVariables>(UpdateStripeCodeDocument, options);
      }
export type UpdateStripeCodeMutationHookResult = ReturnType<typeof useUpdateStripeCodeMutation>;
export type UpdateStripeCodeMutationResult = Apollo.MutationResult<UpdateStripeCodeMutation>;
export type UpdateStripeCodeMutationOptions = Apollo.BaseMutationOptions<UpdateStripeCodeMutation, UpdateStripeCodeMutationVariables>;
export const DeleteStripePromoCodeDocument = gql`
    mutation DeleteStripePromoCode($id: String!) {
  deleteStripePromocode(id: $id)
}
    `;
export type DeleteStripePromoCodeMutationFn = Apollo.MutationFunction<DeleteStripePromoCodeMutation, DeleteStripePromoCodeMutationVariables>;

/**
 * __useDeleteStripePromoCodeMutation__
 *
 * To run a mutation, you first call `useDeleteStripePromoCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStripePromoCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStripePromoCodeMutation, { data, loading, error }] = useDeleteStripePromoCodeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStripePromoCodeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStripePromoCodeMutation, DeleteStripePromoCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStripePromoCodeMutation, DeleteStripePromoCodeMutationVariables>(DeleteStripePromoCodeDocument, options);
      }
export type DeleteStripePromoCodeMutationHookResult = ReturnType<typeof useDeleteStripePromoCodeMutation>;
export type DeleteStripePromoCodeMutationResult = Apollo.MutationResult<DeleteStripePromoCodeMutation>;
export type DeleteStripePromoCodeMutationOptions = Apollo.BaseMutationOptions<DeleteStripePromoCodeMutation, DeleteStripePromoCodeMutationVariables>;