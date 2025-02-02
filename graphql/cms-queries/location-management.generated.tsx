import * as Types from '../types';

import { gql } from '@apollo/client';
import { LocationPartsFragmentDoc } from './LocationParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateLocationMutationVariables = Types.Exact<{
  input: Types.LocationInput;
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation?: { __typename?: 'Location', _id: string, created?: any | null, updated?: any | null, title: string, comment?: string | null, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, plan_interval?: Types.OrderInterval | null, currency?: Types.OrderCurrency | null, type?: Types.OrderType | null, created: any, updated: any, lastEditedBy?: string | null, createdBy?: string | null, status?: Types.OrderStatus | null, amount?: number | null, require_login?: Types.RequireLogin | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null, notes?: string | null, customInstitutionName?: string | null }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null }> } | null };

export type UpdateLocationMutationVariables = Types.Exact<{
  input: Types.LocationInput;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation?: { __typename?: 'Location', _id: string, created?: any | null, updated?: any | null, title: string, comment?: string | null, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, plan_interval?: Types.OrderInterval | null, currency?: Types.OrderCurrency | null, type?: Types.OrderType | null, created: any, updated: any, lastEditedBy?: string | null, createdBy?: string | null, status?: Types.OrderStatus | null, amount?: number | null, require_login?: Types.RequireLogin | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null, notes?: string | null, customInstitutionName?: string | null }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null }> } | null };

export type DeleteLocationMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteLocationMutation = { __typename?: 'Mutation', deleteLocation?: { __typename?: 'Location', _id: string, created?: any | null, updated?: any | null, title: string, comment?: string | null, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, plan_interval?: Types.OrderInterval | null, currency?: Types.OrderCurrency | null, type?: Types.OrderType | null, created: any, updated: any, lastEditedBy?: string | null, createdBy?: string | null, status?: Types.OrderStatus | null, amount?: number | null, require_login?: Types.RequireLogin | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null, notes?: string | null, customInstitutionName?: string | null }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null }> } | null };


export const CreateLocationDocument = gql`
    mutation CreateLocation($input: LocationInput!) {
  createLocation(input: $input) {
    ...LocationParts
  }
}
    ${LocationPartsFragmentDoc}`;
export type CreateLocationMutationFn = Apollo.MutationFunction<CreateLocationMutation, CreateLocationMutationVariables>;

/**
 * __useCreateLocationMutation__
 *
 * To run a mutation, you first call `useCreateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLocationMutation, { data, loading, error }] = useCreateLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLocationMutation(baseOptions?: Apollo.MutationHookOptions<CreateLocationMutation, CreateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLocationMutation, CreateLocationMutationVariables>(CreateLocationDocument, options);
      }
export type CreateLocationMutationHookResult = ReturnType<typeof useCreateLocationMutation>;
export type CreateLocationMutationResult = Apollo.MutationResult<CreateLocationMutation>;
export type CreateLocationMutationOptions = Apollo.BaseMutationOptions<CreateLocationMutation, CreateLocationMutationVariables>;
export const UpdateLocationDocument = gql`
    mutation UpdateLocation($input: LocationInput!) {
  updateLocation(input: $input) {
    ...LocationParts
  }
}
    ${LocationPartsFragmentDoc}`;
export type UpdateLocationMutationFn = Apollo.MutationFunction<UpdateLocationMutation, UpdateLocationMutationVariables>;

/**
 * __useUpdateLocationMutation__
 *
 * To run a mutation, you first call `useUpdateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocationMutation, { data, loading, error }] = useUpdateLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLocationMutation, UpdateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument, options);
      }
export type UpdateLocationMutationHookResult = ReturnType<typeof useUpdateLocationMutation>;
export type UpdateLocationMutationResult = Apollo.MutationResult<UpdateLocationMutation>;
export type UpdateLocationMutationOptions = Apollo.BaseMutationOptions<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const DeleteLocationDocument = gql`
    mutation DeleteLocation($id: String!) {
  deleteLocation(id: $id) {
    ...LocationParts
  }
}
    ${LocationPartsFragmentDoc}`;
export type DeleteLocationMutationFn = Apollo.MutationFunction<DeleteLocationMutation, DeleteLocationMutationVariables>;

/**
 * __useDeleteLocationMutation__
 *
 * To run a mutation, you first call `useDeleteLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLocationMutation, { data, loading, error }] = useDeleteLocationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLocationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLocationMutation, DeleteLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLocationMutation, DeleteLocationMutationVariables>(DeleteLocationDocument, options);
      }
export type DeleteLocationMutationHookResult = ReturnType<typeof useDeleteLocationMutation>;
export type DeleteLocationMutationResult = Apollo.MutationResult<DeleteLocationMutation>;
export type DeleteLocationMutationOptions = Apollo.BaseMutationOptions<DeleteLocationMutation, DeleteLocationMutationVariables>;