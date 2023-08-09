import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetFeedbackListQueryVariables = Types.Exact<{
  input: Types.FeedbackListInput;
}>;


export type GetFeedbackListQuery = { __typename?: 'Query', output: { __typename?: 'FeedbackListOutput', count: number, items: Array<{ __typename?: 'Feedback', _id: string, type: string, questionId: string, value: any, comment?: string | null | undefined, anon_link_id?: string | null | undefined, createdAt: any, updatedAt?: any | null | undefined, question?: { __typename?: 'FeedbackQuestion', question: string, choices?: Array<{ __typename?: 'Choice', value: number }> | null | undefined } | null | undefined, user?: { __typename?: 'User', email: string, user_type?: string | null | undefined, _id: string } | null | undefined, _institution?: { __typename?: 'Institution', _id: string, name: string } | null | undefined }> } };


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