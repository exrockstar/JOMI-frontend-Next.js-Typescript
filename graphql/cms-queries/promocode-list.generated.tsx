import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllPromoCodesQueryVariables = Types.Exact<{
  input: Types.PromoCodeListInput;
}>;


export type GetAllPromoCodesQuery = { __typename?: 'Query', getAllPromoCodes?: { __typename?: 'PromoCodeListOutput', count: number, dbQueryString: string, promocodes: Array<{ __typename?: 'PromoCode', _id: string, created: any, createdAt: any, bulkUsedCodes: Array<string>, bulkUnusedCodes: Array<string>, numberUnused?: number | null, notes?: string | null, interval?: Types.OrderInterval | null, type: Types.PromoCodeType, days?: number | null, expiration: any, price?: number | null, isSubscription: boolean, updated: any, title: string, times_redeemed?: number | null, institution?: { __typename?: 'Institution', _id: string, name: string } | null }> } | null };

export type GetPromoCodeDetailQueryVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;


export type GetPromoCodeDetailQuery = { __typename?: 'Query', getPromoDetail?: { __typename?: 'PromoCode', _id: string, created: any, createdAt: any, bulkUsedCodes: Array<string>, bulkUnusedCodes: Array<string>, numberUnused?: number | null, notes?: string | null, interval?: Types.OrderInterval | null, type: Types.PromoCodeType, days?: number | null, expiration: any, price?: number | null, isSubscription: boolean, updated: any, title: string, times_redeemed?: number | null } | null };

export type AddPromoCodeMutationVariables = Types.Exact<{
  input: Types.InsertPromoCodeInput;
}>;


export type AddPromoCodeMutation = { __typename?: 'Mutation', addPromoCode?: boolean | null };

export type EditPromoCodeMutationVariables = Types.Exact<{
  input: Types.UpdatePromoCodeInput;
}>;


export type EditPromoCodeMutation = { __typename?: 'Mutation', editPromoCode: boolean };

export type DeletePromoCodeMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;


export type DeletePromoCodeMutation = { __typename?: 'Mutation', deletePromoCode: boolean };


export const GetAllPromoCodesDocument = gql`
    query GetAllPromoCodes($input: PromoCodeListInput!) {
  getAllPromoCodes(input: $input) {
    promocodes {
      _id
      created
      createdAt
      bulkUsedCodes
      bulkUnusedCodes
      numberUnused
      notes
      interval
      type
      days
      expiration
      price
      isSubscription
      updated
      title
      times_redeemed
      institution {
        _id
        name
      }
    }
    count
    dbQueryString
  }
}
    `;

/**
 * __useGetAllPromoCodesQuery__
 *
 * To run a query within a React component, call `useGetAllPromoCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPromoCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPromoCodesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllPromoCodesQuery(baseOptions: Apollo.QueryHookOptions<GetAllPromoCodesQuery, GetAllPromoCodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPromoCodesQuery, GetAllPromoCodesQueryVariables>(GetAllPromoCodesDocument, options);
      }
export function useGetAllPromoCodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPromoCodesQuery, GetAllPromoCodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPromoCodesQuery, GetAllPromoCodesQueryVariables>(GetAllPromoCodesDocument, options);
        }
export type GetAllPromoCodesQueryHookResult = ReturnType<typeof useGetAllPromoCodesQuery>;
export type GetAllPromoCodesLazyQueryHookResult = ReturnType<typeof useGetAllPromoCodesLazyQuery>;
export type GetAllPromoCodesQueryResult = Apollo.QueryResult<GetAllPromoCodesQuery, GetAllPromoCodesQueryVariables>;
export const GetPromoCodeDetailDocument = gql`
    query GetPromoCodeDetail($code: String!) {
  getPromoDetail(code: $code) {
    _id
    created
    createdAt
    bulkUsedCodes
    bulkUnusedCodes
    numberUnused
    notes
    interval
    type
    days
    expiration
    price
    isSubscription
    updated
    title
    times_redeemed
  }
}
    `;

/**
 * __useGetPromoCodeDetailQuery__
 *
 * To run a query within a React component, call `useGetPromoCodeDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPromoCodeDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPromoCodeDetailQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetPromoCodeDetailQuery(baseOptions: Apollo.QueryHookOptions<GetPromoCodeDetailQuery, GetPromoCodeDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPromoCodeDetailQuery, GetPromoCodeDetailQueryVariables>(GetPromoCodeDetailDocument, options);
      }
export function useGetPromoCodeDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPromoCodeDetailQuery, GetPromoCodeDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPromoCodeDetailQuery, GetPromoCodeDetailQueryVariables>(GetPromoCodeDetailDocument, options);
        }
export type GetPromoCodeDetailQueryHookResult = ReturnType<typeof useGetPromoCodeDetailQuery>;
export type GetPromoCodeDetailLazyQueryHookResult = ReturnType<typeof useGetPromoCodeDetailLazyQuery>;
export type GetPromoCodeDetailQueryResult = Apollo.QueryResult<GetPromoCodeDetailQuery, GetPromoCodeDetailQueryVariables>;
export const AddPromoCodeDocument = gql`
    mutation AddPromoCode($input: InsertPromoCodeInput!) {
  addPromoCode(input: $input)
}
    `;
export type AddPromoCodeMutationFn = Apollo.MutationFunction<AddPromoCodeMutation, AddPromoCodeMutationVariables>;

/**
 * __useAddPromoCodeMutation__
 *
 * To run a mutation, you first call `useAddPromoCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPromoCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPromoCodeMutation, { data, loading, error }] = useAddPromoCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPromoCodeMutation(baseOptions?: Apollo.MutationHookOptions<AddPromoCodeMutation, AddPromoCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPromoCodeMutation, AddPromoCodeMutationVariables>(AddPromoCodeDocument, options);
      }
export type AddPromoCodeMutationHookResult = ReturnType<typeof useAddPromoCodeMutation>;
export type AddPromoCodeMutationResult = Apollo.MutationResult<AddPromoCodeMutation>;
export type AddPromoCodeMutationOptions = Apollo.BaseMutationOptions<AddPromoCodeMutation, AddPromoCodeMutationVariables>;
export const EditPromoCodeDocument = gql`
    mutation EditPromoCode($input: UpdatePromoCodeInput!) {
  editPromoCode(input: $input)
}
    `;
export type EditPromoCodeMutationFn = Apollo.MutationFunction<EditPromoCodeMutation, EditPromoCodeMutationVariables>;

/**
 * __useEditPromoCodeMutation__
 *
 * To run a mutation, you first call `useEditPromoCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPromoCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPromoCodeMutation, { data, loading, error }] = useEditPromoCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditPromoCodeMutation(baseOptions?: Apollo.MutationHookOptions<EditPromoCodeMutation, EditPromoCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPromoCodeMutation, EditPromoCodeMutationVariables>(EditPromoCodeDocument, options);
      }
export type EditPromoCodeMutationHookResult = ReturnType<typeof useEditPromoCodeMutation>;
export type EditPromoCodeMutationResult = Apollo.MutationResult<EditPromoCodeMutation>;
export type EditPromoCodeMutationOptions = Apollo.BaseMutationOptions<EditPromoCodeMutation, EditPromoCodeMutationVariables>;
export const DeletePromoCodeDocument = gql`
    mutation DeletePromoCode($code: String!) {
  deletePromoCode(code: $code)
}
    `;
export type DeletePromoCodeMutationFn = Apollo.MutationFunction<DeletePromoCodeMutation, DeletePromoCodeMutationVariables>;

/**
 * __useDeletePromoCodeMutation__
 *
 * To run a mutation, you first call `useDeletePromoCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePromoCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePromoCodeMutation, { data, loading, error }] = useDeletePromoCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useDeletePromoCodeMutation(baseOptions?: Apollo.MutationHookOptions<DeletePromoCodeMutation, DeletePromoCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePromoCodeMutation, DeletePromoCodeMutationVariables>(DeletePromoCodeDocument, options);
      }
export type DeletePromoCodeMutationHookResult = ReturnType<typeof useDeletePromoCodeMutation>;
export type DeletePromoCodeMutationResult = Apollo.MutationResult<DeletePromoCodeMutation>;
export type DeletePromoCodeMutationOptions = Apollo.BaseMutationOptions<DeletePromoCodeMutation, DeletePromoCodeMutationVariables>;