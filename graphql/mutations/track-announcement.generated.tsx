import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TrackAnnouncementMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type TrackAnnouncementMutation = { __typename?: 'Mutation', trackAnnouncement: boolean };


export const TrackAnnouncementDocument = gql`
    mutation TrackAnnouncement($_id: String!) {
  trackAnnouncement(_id: $_id)
}
    `;
export type TrackAnnouncementMutationFn = Apollo.MutationFunction<TrackAnnouncementMutation, TrackAnnouncementMutationVariables>;

/**
 * __useTrackAnnouncementMutation__
 *
 * To run a mutation, you first call `useTrackAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackAnnouncementMutation, { data, loading, error }] = useTrackAnnouncementMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useTrackAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<TrackAnnouncementMutation, TrackAnnouncementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackAnnouncementMutation, TrackAnnouncementMutationVariables>(TrackAnnouncementDocument, options);
      }
export type TrackAnnouncementMutationHookResult = ReturnType<typeof useTrackAnnouncementMutation>;
export type TrackAnnouncementMutationResult = Apollo.MutationResult<TrackAnnouncementMutation>;
export type TrackAnnouncementMutationOptions = Apollo.BaseMutationOptions<TrackAnnouncementMutation, TrackAnnouncementMutationVariables>;