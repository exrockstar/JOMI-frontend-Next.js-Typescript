import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateAllInstStatsMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UpdateAllInstStatsMutation = { __typename?: 'Mutation', updateAllInstStats: string };


export const UpdateAllInstStatsDocument = gql`
    mutation UpdateAllInstStats {
  updateAllInstStats
}
    `;
export type UpdateAllInstStatsMutationFn = Apollo.MutationFunction<UpdateAllInstStatsMutation, UpdateAllInstStatsMutationVariables>;

/**
 * __useUpdateAllInstStatsMutation__
 *
 * To run a mutation, you first call `useUpdateAllInstStatsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAllInstStatsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAllInstStatsMutation, { data, loading, error }] = useUpdateAllInstStatsMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateAllInstStatsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAllInstStatsMutation, UpdateAllInstStatsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAllInstStatsMutation, UpdateAllInstStatsMutationVariables>(UpdateAllInstStatsDocument, options);
      }
export type UpdateAllInstStatsMutationHookResult = ReturnType<typeof useUpdateAllInstStatsMutation>;
export type UpdateAllInstStatsMutationResult = Apollo.MutationResult<UpdateAllInstStatsMutation>;
export type UpdateAllInstStatsMutationOptions = Apollo.BaseMutationOptions<UpdateAllInstStatsMutation, UpdateAllInstStatsMutationVariables>;