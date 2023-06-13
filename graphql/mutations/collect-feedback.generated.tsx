import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TrackFeedbackMutationVariables = Types.Exact<{
  input: Types.TrackFeedbackInput;
}>;


export type TrackFeedbackMutation = { __typename?: 'Mutation', trackFeedack: { __typename?: 'Feedback', _id: string } };

export type GetFeedbackQuestionsQueryVariables = Types.Exact<{
  anon_link_id: Types.Scalars['String'];
}>;


export type GetFeedbackQuestionsQuery = { __typename?: 'Query', question?: { __typename?: 'FeedbackQuestion', _id: string, question: string, legends?: Array<string> | null | undefined, type: string, choices?: Array<{ __typename?: 'Choice', value: number, description: string }> | null | undefined } | null | undefined };


export const TrackFeedbackDocument = gql`
    mutation TrackFeedback($input: TrackFeedbackInput!) {
  trackFeedack(input: $input) {
    _id
  }
}
    `;
export type TrackFeedbackMutationFn = Apollo.MutationFunction<TrackFeedbackMutation, TrackFeedbackMutationVariables>;

/**
 * __useTrackFeedbackMutation__
 *
 * To run a mutation, you first call `useTrackFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackFeedbackMutation, { data, loading, error }] = useTrackFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<TrackFeedbackMutation, TrackFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackFeedbackMutation, TrackFeedbackMutationVariables>(TrackFeedbackDocument, options);
      }
export type TrackFeedbackMutationHookResult = ReturnType<typeof useTrackFeedbackMutation>;
export type TrackFeedbackMutationResult = Apollo.MutationResult<TrackFeedbackMutation>;
export type TrackFeedbackMutationOptions = Apollo.BaseMutationOptions<TrackFeedbackMutation, TrackFeedbackMutationVariables>;
export const GetFeedbackQuestionsDocument = gql`
    query GetFeedbackQuestions($anon_link_id: String!) {
  question: getFeedbackQuestionsForUser(anon_link_id: $anon_link_id) {
    _id
    question
    legends
    type
    choices {
      value
      description
    }
  }
}
    `;

/**
 * __useGetFeedbackQuestionsQuery__
 *
 * To run a query within a React component, call `useGetFeedbackQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedbackQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedbackQuestionsQuery({
 *   variables: {
 *      anon_link_id: // value for 'anon_link_id'
 *   },
 * });
 */
export function useGetFeedbackQuestionsQuery(baseOptions: Apollo.QueryHookOptions<GetFeedbackQuestionsQuery, GetFeedbackQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeedbackQuestionsQuery, GetFeedbackQuestionsQueryVariables>(GetFeedbackQuestionsDocument, options);
      }
export function useGetFeedbackQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedbackQuestionsQuery, GetFeedbackQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeedbackQuestionsQuery, GetFeedbackQuestionsQueryVariables>(GetFeedbackQuestionsDocument, options);
        }
export type GetFeedbackQuestionsQueryHookResult = ReturnType<typeof useGetFeedbackQuestionsQuery>;
export type GetFeedbackQuestionsLazyQueryHookResult = ReturnType<typeof useGetFeedbackQuestionsLazyQuery>;
export type GetFeedbackQuestionsQueryResult = Apollo.QueryResult<GetFeedbackQuestionsQuery, GetFeedbackQuestionsQueryVariables>;