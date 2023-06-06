import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TrackFeedbackMutationVariables = Types.Exact<{
  input: Types.TrackFeedbackInput;
}>;


export type TrackFeedbackMutation = { __typename?: 'Mutation', trackFeedack: { __typename?: 'Feedback', _id: string } };


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