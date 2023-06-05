import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTrialsSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTrialsSettingsQuery = { __typename?: 'Query', settings: { __typename?: 'TrialSettings', isTrialFeatureOn: boolean, trialDuration: number, enabledCountries: Array<string> } };

export type UpdateTrialSettingsMutationVariables = Types.Exact<{
  input: Types.TrialSettingsInput;
}>;


export type UpdateTrialSettingsMutation = { __typename?: 'Mutation', settings: { __typename?: 'TrialSettings', isTrialFeatureOn: boolean, trialDuration: number, enabledCountries: Array<string> } };

export type AddTrialOrderForUserMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type AddTrialOrderForUserMutation = { __typename?: 'Mutation', addTrialOrderForUser: boolean };


export const GetTrialsSettingsDocument = gql`
    query GetTrialsSettings {
  settings: getTrialSettings {
    isTrialFeatureOn
    trialDuration
    enabledCountries
  }
}
    `;

/**
 * __useGetTrialsSettingsQuery__
 *
 * To run a query within a React component, call `useGetTrialsSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrialsSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrialsSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTrialsSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GetTrialsSettingsQuery, GetTrialsSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrialsSettingsQuery, GetTrialsSettingsQueryVariables>(GetTrialsSettingsDocument, options);
      }
export function useGetTrialsSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrialsSettingsQuery, GetTrialsSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrialsSettingsQuery, GetTrialsSettingsQueryVariables>(GetTrialsSettingsDocument, options);
        }
export type GetTrialsSettingsQueryHookResult = ReturnType<typeof useGetTrialsSettingsQuery>;
export type GetTrialsSettingsLazyQueryHookResult = ReturnType<typeof useGetTrialsSettingsLazyQuery>;
export type GetTrialsSettingsQueryResult = Apollo.QueryResult<GetTrialsSettingsQuery, GetTrialsSettingsQueryVariables>;
export const UpdateTrialSettingsDocument = gql`
    mutation UpdateTrialSettings($input: TrialSettingsInput!) {
  settings: updateTrialSettings(input: $input) {
    isTrialFeatureOn
    trialDuration
    enabledCountries
  }
}
    `;
export type UpdateTrialSettingsMutationFn = Apollo.MutationFunction<UpdateTrialSettingsMutation, UpdateTrialSettingsMutationVariables>;

/**
 * __useUpdateTrialSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateTrialSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTrialSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTrialSettingsMutation, { data, loading, error }] = useUpdateTrialSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTrialSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTrialSettingsMutation, UpdateTrialSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTrialSettingsMutation, UpdateTrialSettingsMutationVariables>(UpdateTrialSettingsDocument, options);
      }
export type UpdateTrialSettingsMutationHookResult = ReturnType<typeof useUpdateTrialSettingsMutation>;
export type UpdateTrialSettingsMutationResult = Apollo.MutationResult<UpdateTrialSettingsMutation>;
export type UpdateTrialSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateTrialSettingsMutation, UpdateTrialSettingsMutationVariables>;
export const AddTrialOrderForUserDocument = gql`
    mutation AddTrialOrderForUser {
  addTrialOrderForUser
}
    `;
export type AddTrialOrderForUserMutationFn = Apollo.MutationFunction<AddTrialOrderForUserMutation, AddTrialOrderForUserMutationVariables>;

/**
 * __useAddTrialOrderForUserMutation__
 *
 * To run a mutation, you first call `useAddTrialOrderForUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTrialOrderForUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTrialOrderForUserMutation, { data, loading, error }] = useAddTrialOrderForUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddTrialOrderForUserMutation(baseOptions?: Apollo.MutationHookOptions<AddTrialOrderForUserMutation, AddTrialOrderForUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTrialOrderForUserMutation, AddTrialOrderForUserMutationVariables>(AddTrialOrderForUserDocument, options);
      }
export type AddTrialOrderForUserMutationHookResult = ReturnType<typeof useAddTrialOrderForUserMutation>;
export type AddTrialOrderForUserMutationResult = Apollo.MutationResult<AddTrialOrderForUserMutation>;
export type AddTrialOrderForUserMutationOptions = Apollo.BaseMutationOptions<AddTrialOrderForUserMutation, AddTrialOrderForUserMutationVariables>;