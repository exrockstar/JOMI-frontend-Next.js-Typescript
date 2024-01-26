import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveTemporaryAccessByIdMutationVariables = Types.Exact<{
  _id: Types.Scalars['String']['input'];
}>;


export type RemoveTemporaryAccessByIdMutation = { __typename?: 'Mutation', result: boolean };


export const RemoveTemporaryAccessByIdDocument = gql`
    mutation RemoveTemporaryAccessById($_id: String!) {
  result: removeTemporaryAccessById(_id: $_id)
}
    `;
export type RemoveTemporaryAccessByIdMutationFn = Apollo.MutationFunction<RemoveTemporaryAccessByIdMutation, RemoveTemporaryAccessByIdMutationVariables>;

/**
 * __useRemoveTemporaryAccessByIdMutation__
 *
 * To run a mutation, you first call `useRemoveTemporaryAccessByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTemporaryAccessByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTemporaryAccessByIdMutation, { data, loading, error }] = useRemoveTemporaryAccessByIdMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useRemoveTemporaryAccessByIdMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTemporaryAccessByIdMutation, RemoveTemporaryAccessByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTemporaryAccessByIdMutation, RemoveTemporaryAccessByIdMutationVariables>(RemoveTemporaryAccessByIdDocument, options);
      }
export type RemoveTemporaryAccessByIdMutationHookResult = ReturnType<typeof useRemoveTemporaryAccessByIdMutation>;
export type RemoveTemporaryAccessByIdMutationResult = Apollo.MutationResult<RemoveTemporaryAccessByIdMutation>;
export type RemoveTemporaryAccessByIdMutationOptions = Apollo.BaseMutationOptions<RemoveTemporaryAccessByIdMutation, RemoveTemporaryAccessByIdMutationVariables>;