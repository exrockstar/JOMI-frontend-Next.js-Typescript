import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetFeedbackListQueryVariables = Types.Exact<{
  input: Types.FeedbackListInput;
}>;


export type GetFeedbackListQuery = { __typename?: 'Query', output: { __typename?: 'FeedbackListOutput', count: number, items: Array<{ __typename?: 'Feedback', _id: string, type: string, questionId: string, value: any, comment?: string | null | undefined, anon_link_id?: string | null | undefined, createdAt: any, updatedAt?: any | null | undefined, question?: { __typename?: 'FeedbackQuestion', question: string, choices?: Array<{ __typename?: 'Choice', value: number }> | null | undefined } | null | undefined, user?: { __typename?: 'User', email: string, user_type?: string | null | undefined, _id: string } | null | undefined, _institution?: { __typename?: 'Institution', _id: string, name: string } | null | undefined }> } };

export type GetFeedbackSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetFeedbackSettingsQuery = { __typename?: 'Query', settings: { __typename?: 'FeedbackSettings', updatedAt: any, updatedBy: string, selectedAccessTypes: Array<Types.AccessTypeEnum> } };

export type UpdateFeedbackSettingsMutationVariables = Types.Exact<{
  input: Types.FeedbackSettingsInput;
}>;


export type UpdateFeedbackSettingsMutation = { __typename?: 'Mutation', settings: { __typename?: 'FeedbackSettings', updatedAt: any, updatedBy: string, selectedAccessTypes: Array<Types.AccessTypeEnum> } };


export const GetFeedbackListDocument = gql`
    query GetFeedbackList($input: FeedbackListInput!) {
  output: getFeedbackList(input: $input) {
    items {
      _id
      type
      questionId
      question {
        question
        choices {
          value
        }
      }
      value
      comment
      user {
        email
        user_type
        _id
      }
      _institution {
        _id
        name
      }
      anon_link_id
      createdAt
      updatedAt
    }
    count
  }
}
    `;

/**
 * __useGetFeedbackListQuery__
 *
 * To run a query within a React component, call `useGetFeedbackListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedbackListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedbackListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFeedbackListQuery(baseOptions: Apollo.QueryHookOptions<GetFeedbackListQuery, GetFeedbackListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeedbackListQuery, GetFeedbackListQueryVariables>(GetFeedbackListDocument, options);
      }
export function useGetFeedbackListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedbackListQuery, GetFeedbackListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeedbackListQuery, GetFeedbackListQueryVariables>(GetFeedbackListDocument, options);
        }
export type GetFeedbackListQueryHookResult = ReturnType<typeof useGetFeedbackListQuery>;
export type GetFeedbackListLazyQueryHookResult = ReturnType<typeof useGetFeedbackListLazyQuery>;
export type GetFeedbackListQueryResult = Apollo.QueryResult<GetFeedbackListQuery, GetFeedbackListQueryVariables>;
export const GetFeedbackSettingsDocument = gql`
    query GetFeedbackSettings {
  settings: getFeedbackSettings {
    updatedAt
    updatedBy
    selectedAccessTypes
  }
}
    `;

/**
 * __useGetFeedbackSettingsQuery__
 *
 * To run a query within a React component, call `useGetFeedbackSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedbackSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedbackSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeedbackSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GetFeedbackSettingsQuery, GetFeedbackSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeedbackSettingsQuery, GetFeedbackSettingsQueryVariables>(GetFeedbackSettingsDocument, options);
      }
export function useGetFeedbackSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedbackSettingsQuery, GetFeedbackSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeedbackSettingsQuery, GetFeedbackSettingsQueryVariables>(GetFeedbackSettingsDocument, options);
        }
export type GetFeedbackSettingsQueryHookResult = ReturnType<typeof useGetFeedbackSettingsQuery>;
export type GetFeedbackSettingsLazyQueryHookResult = ReturnType<typeof useGetFeedbackSettingsLazyQuery>;
export type GetFeedbackSettingsQueryResult = Apollo.QueryResult<GetFeedbackSettingsQuery, GetFeedbackSettingsQueryVariables>;
export const UpdateFeedbackSettingsDocument = gql`
    mutation UpdateFeedbackSettings($input: FeedbackSettingsInput!) {
  settings: updateFeedbackSettings(input: $input) {
    updatedAt
    updatedBy
    selectedAccessTypes
  }
}
    `;
export type UpdateFeedbackSettingsMutationFn = Apollo.MutationFunction<UpdateFeedbackSettingsMutation, UpdateFeedbackSettingsMutationVariables>;

/**
 * __useUpdateFeedbackSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateFeedbackSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeedbackSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeedbackSettingsMutation, { data, loading, error }] = useUpdateFeedbackSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFeedbackSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFeedbackSettingsMutation, UpdateFeedbackSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFeedbackSettingsMutation, UpdateFeedbackSettingsMutationVariables>(UpdateFeedbackSettingsDocument, options);
      }
export type UpdateFeedbackSettingsMutationHookResult = ReturnType<typeof useUpdateFeedbackSettingsMutation>;
export type UpdateFeedbackSettingsMutationResult = Apollo.MutationResult<UpdateFeedbackSettingsMutation>;
export type UpdateFeedbackSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateFeedbackSettingsMutation, UpdateFeedbackSettingsMutationVariables>;