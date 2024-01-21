import * as Types from '../types';

import { gql } from '@apollo/client';
import { InstitutionPartsFragmentDoc } from './InstitutionParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateInstituionMutationVariables = Types.Exact<{
  input: Types.CreateInstitutionInput;
}>;


export type CreateInstituionMutation = { __typename?: 'Mutation', institution: { __typename?: 'Institution', _id: string, name: string } };

export type UpdateInstitutionMutationVariables = Types.Exact<{
  input: Types.UpdateInstitutionInput;
}>;


export type UpdateInstitutionMutation = { __typename?: 'Mutation', institution?: { __typename?: 'Institution', _id: string, created?: any | null, updated?: any | null, name: string, aliases: Array<string>, domains: Array<string>, urlLink?: string | null, category?: string | null, subscriber_display_name?: string | null, show_on_subscribers_page?: boolean | null, restrictMatchByName?: boolean | null, notes?: string | null, subscription: { __typename?: 'InstitutionSubscription', status?: Types.StatusType | null, last_checked?: string | null, order?: string | null }, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, notes?: string | null, isMainContact?: boolean | null }> | null, image?: { __typename?: 'Image', filename?: string | null, geometry?: { __typename?: 'Geometry', width: number, height: number } | null } | null, locations: Array<{ __typename?: 'Location', _id: string, created?: any | null, updated?: any | null, title: string, comment?: string | null, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, plan_interval?: Types.OrderInterval | null, currency?: Types.OrderCurrency | null, type?: Types.OrderType | null, created: any, updated: any, lastEditedBy?: string | null, createdBy?: string | null, status?: Types.OrderStatus | null, amount?: number | null, require_login?: Types.RequireLogin | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null, notes?: string | null, customInstitutionName?: string | null }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null }> }>, accessSettings: { __typename?: 'AccessSettings', displayTrafficGraph: boolean } } | null };

export type UpdateInstitutionContactsMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  contacts: Array<Types.ContactPersonInput> | Types.ContactPersonInput;
}>;


export type UpdateInstitutionContactsMutation = { __typename?: 'Mutation', institution?: { __typename?: 'Institution', _id: string, created?: any | null, updated?: any | null, name: string, aliases: Array<string>, domains: Array<string>, urlLink?: string | null, category?: string | null, subscriber_display_name?: string | null, show_on_subscribers_page?: boolean | null, restrictMatchByName?: boolean | null, notes?: string | null, subscription: { __typename?: 'InstitutionSubscription', status?: Types.StatusType | null, last_checked?: string | null, order?: string | null }, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, notes?: string | null, isMainContact?: boolean | null }> | null, image?: { __typename?: 'Image', filename?: string | null, geometry?: { __typename?: 'Geometry', width: number, height: number } | null } | null, locations: Array<{ __typename?: 'Location', _id: string, created?: any | null, updated?: any | null, title: string, comment?: string | null, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, plan_interval?: Types.OrderInterval | null, currency?: Types.OrderCurrency | null, type?: Types.OrderType | null, created: any, updated: any, lastEditedBy?: string | null, createdBy?: string | null, status?: Types.OrderStatus | null, amount?: number | null, require_login?: Types.RequireLogin | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null, notes?: string | null, customInstitutionName?: string | null }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null }> }>, accessSettings: { __typename?: 'AccessSettings', displayTrafficGraph: boolean } } | null };


export const CreateInstituionDocument = gql`
    mutation CreateInstituion($input: CreateInstitutionInput!) {
  institution: createInstitution(input: $input) {
    _id
    name
  }
}
    `;
export type CreateInstituionMutationFn = Apollo.MutationFunction<CreateInstituionMutation, CreateInstituionMutationVariables>;

/**
 * __useCreateInstituionMutation__
 *
 * To run a mutation, you first call `useCreateInstituionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInstituionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInstituionMutation, { data, loading, error }] = useCreateInstituionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInstituionMutation(baseOptions?: Apollo.MutationHookOptions<CreateInstituionMutation, CreateInstituionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInstituionMutation, CreateInstituionMutationVariables>(CreateInstituionDocument, options);
      }
export type CreateInstituionMutationHookResult = ReturnType<typeof useCreateInstituionMutation>;
export type CreateInstituionMutationResult = Apollo.MutationResult<CreateInstituionMutation>;
export type CreateInstituionMutationOptions = Apollo.BaseMutationOptions<CreateInstituionMutation, CreateInstituionMutationVariables>;
export const UpdateInstitutionDocument = gql`
    mutation UpdateInstitution($input: UpdateInstitutionInput!) {
  institution: updateInstitution(input: $input) {
    ...InstitutionParts
  }
}
    ${InstitutionPartsFragmentDoc}`;
export type UpdateInstitutionMutationFn = Apollo.MutationFunction<UpdateInstitutionMutation, UpdateInstitutionMutationVariables>;

/**
 * __useUpdateInstitutionMutation__
 *
 * To run a mutation, you first call `useUpdateInstitutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInstitutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInstitutionMutation, { data, loading, error }] = useUpdateInstitutionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInstitutionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInstitutionMutation, UpdateInstitutionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInstitutionMutation, UpdateInstitutionMutationVariables>(UpdateInstitutionDocument, options);
      }
export type UpdateInstitutionMutationHookResult = ReturnType<typeof useUpdateInstitutionMutation>;
export type UpdateInstitutionMutationResult = Apollo.MutationResult<UpdateInstitutionMutation>;
export type UpdateInstitutionMutationOptions = Apollo.BaseMutationOptions<UpdateInstitutionMutation, UpdateInstitutionMutationVariables>;
export const UpdateInstitutionContactsDocument = gql`
    mutation UpdateInstitutionContacts($id: String!, $contacts: [ContactPersonInput!]!) {
  institution: updateInstitutionContacts(id: $id, contacts: $contacts) {
    ...InstitutionParts
  }
}
    ${InstitutionPartsFragmentDoc}`;
export type UpdateInstitutionContactsMutationFn = Apollo.MutationFunction<UpdateInstitutionContactsMutation, UpdateInstitutionContactsMutationVariables>;

/**
 * __useUpdateInstitutionContactsMutation__
 *
 * To run a mutation, you first call `useUpdateInstitutionContactsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInstitutionContactsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInstitutionContactsMutation, { data, loading, error }] = useUpdateInstitutionContactsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      contacts: // value for 'contacts'
 *   },
 * });
 */
export function useUpdateInstitutionContactsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInstitutionContactsMutation, UpdateInstitutionContactsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInstitutionContactsMutation, UpdateInstitutionContactsMutationVariables>(UpdateInstitutionContactsDocument, options);
      }
export type UpdateInstitutionContactsMutationHookResult = ReturnType<typeof useUpdateInstitutionContactsMutation>;
export type UpdateInstitutionContactsMutationResult = Apollo.MutationResult<UpdateInstitutionContactsMutation>;
export type UpdateInstitutionContactsMutationOptions = Apollo.BaseMutationOptions<UpdateInstitutionContactsMutation, UpdateInstitutionContactsMutationVariables>;