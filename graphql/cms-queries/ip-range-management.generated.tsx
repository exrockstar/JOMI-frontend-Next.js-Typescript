import * as Types from '../types';

import { gql } from '@apollo/client';
import { IpRangePartsFragmentDoc } from './IpRangeParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateIpRangeMutationVariables = Types.Exact<{
  input: Types.IpRangeInput;
}>;


export type CreateIpRangeMutation = { __typename?: 'Mutation', ip_range?: { __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null } | null };

export type UpdateIpRangeMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  input: Types.IpRangeInput;
}>;


export type UpdateIpRangeMutation = { __typename?: 'Mutation', ip_range?: { __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null } | null };

export type DeleteIpRangeMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteIpRangeMutation = { __typename?: 'Mutation', ip_range: { __typename?: 'IpRange', _id: string } };


export const CreateIpRangeDocument = gql`
    mutation CreateIpRange($input: IpRangeInput!) {
  ip_range: createIpRange(input: $input) {
    ...IpRangeParts
  }
}
    ${IpRangePartsFragmentDoc}`;
export type CreateIpRangeMutationFn = Apollo.MutationFunction<CreateIpRangeMutation, CreateIpRangeMutationVariables>;

/**
 * __useCreateIpRangeMutation__
 *
 * To run a mutation, you first call `useCreateIpRangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIpRangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIpRangeMutation, { data, loading, error }] = useCreateIpRangeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIpRangeMutation(baseOptions?: Apollo.MutationHookOptions<CreateIpRangeMutation, CreateIpRangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIpRangeMutation, CreateIpRangeMutationVariables>(CreateIpRangeDocument, options);
      }
export type CreateIpRangeMutationHookResult = ReturnType<typeof useCreateIpRangeMutation>;
export type CreateIpRangeMutationResult = Apollo.MutationResult<CreateIpRangeMutation>;
export type CreateIpRangeMutationOptions = Apollo.BaseMutationOptions<CreateIpRangeMutation, CreateIpRangeMutationVariables>;
export const UpdateIpRangeDocument = gql`
    mutation UpdateIpRange($id: String!, $input: IpRangeInput!) {
  ip_range: updateIpRange(id: $id, input: $input) {
    ...IpRangeParts
  }
}
    ${IpRangePartsFragmentDoc}`;
export type UpdateIpRangeMutationFn = Apollo.MutationFunction<UpdateIpRangeMutation, UpdateIpRangeMutationVariables>;

/**
 * __useUpdateIpRangeMutation__
 *
 * To run a mutation, you first call `useUpdateIpRangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIpRangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIpRangeMutation, { data, loading, error }] = useUpdateIpRangeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIpRangeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIpRangeMutation, UpdateIpRangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIpRangeMutation, UpdateIpRangeMutationVariables>(UpdateIpRangeDocument, options);
      }
export type UpdateIpRangeMutationHookResult = ReturnType<typeof useUpdateIpRangeMutation>;
export type UpdateIpRangeMutationResult = Apollo.MutationResult<UpdateIpRangeMutation>;
export type UpdateIpRangeMutationOptions = Apollo.BaseMutationOptions<UpdateIpRangeMutation, UpdateIpRangeMutationVariables>;
export const DeleteIpRangeDocument = gql`
    mutation DeleteIpRange($id: String!) {
  ip_range: deleteIpRange(id: $id) {
    _id
  }
}
    `;
export type DeleteIpRangeMutationFn = Apollo.MutationFunction<DeleteIpRangeMutation, DeleteIpRangeMutationVariables>;

/**
 * __useDeleteIpRangeMutation__
 *
 * To run a mutation, you first call `useDeleteIpRangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIpRangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIpRangeMutation, { data, loading, error }] = useDeleteIpRangeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteIpRangeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIpRangeMutation, DeleteIpRangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIpRangeMutation, DeleteIpRangeMutationVariables>(DeleteIpRangeDocument, options);
      }
export type DeleteIpRangeMutationHookResult = ReturnType<typeof useDeleteIpRangeMutation>;
export type DeleteIpRangeMutationResult = Apollo.MutationResult<DeleteIpRangeMutation>;
export type DeleteIpRangeMutationOptions = Apollo.BaseMutationOptions<DeleteIpRangeMutation, DeleteIpRangeMutationVariables>;