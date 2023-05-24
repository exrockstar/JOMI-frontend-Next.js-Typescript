import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TrackAnnouncementsMutationVariables = Types.Exact<{
  _ids: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type TrackAnnouncementsMutation = { __typename?: 'Mutation', trackAnnouncements: boolean };


export const TrackAnnouncementsDocument = gql`
    mutation TrackAnnouncements($_ids: [String!]!) {
  trackAnnouncements(_ids: $_ids)
}
    `;
export type TrackAnnouncementsMutationFn = Apollo.MutationFunction<TrackAnnouncementsMutation, TrackAnnouncementsMutationVariables>;

/**
 * __useTrackAnnouncementsMutation__
 *
 * To run a mutation, you first call `useTrackAnnouncementsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackAnnouncementsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackAnnouncementsMutation, { data, loading, error }] = useTrackAnnouncementsMutation({
 *   variables: {
 *      _ids: // value for '_ids'
 *   },
 * });
 */
export function useTrackAnnouncementsMutation(baseOptions?: Apollo.MutationHookOptions<TrackAnnouncementsMutation, TrackAnnouncementsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackAnnouncementsMutation, TrackAnnouncementsMutationVariables>(TrackAnnouncementsDocument, options);
      }
export type TrackAnnouncementsMutationHookResult = ReturnType<typeof useTrackAnnouncementsMutation>;
export type TrackAnnouncementsMutationResult = Apollo.MutationResult<TrackAnnouncementsMutation>;
export type TrackAnnouncementsMutationOptions = Apollo.BaseMutationOptions<TrackAnnouncementsMutation, TrackAnnouncementsMutationVariables>;