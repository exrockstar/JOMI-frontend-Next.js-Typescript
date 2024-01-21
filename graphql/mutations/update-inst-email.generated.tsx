import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateInstEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type UpdateInstEmailMutation = { __typename?: 'Mutation', updateInstEmail: boolean };


export const UpdateInstEmailDocument = gql`
    mutation UpdateInstEmail($email: String!) {
  updateInstEmail(email: $email)
}
    `;
export type UpdateInstEmailMutationFn = Apollo.MutationFunction<UpdateInstEmailMutation, UpdateInstEmailMutationVariables>;

/**
 * __useUpdateInstEmailMutation__
 *
 * To run a mutation, you first call `useUpdateInstEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInstEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInstEmailMutation, { data, loading, error }] = useUpdateInstEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateInstEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInstEmailMutation, UpdateInstEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInstEmailMutation, UpdateInstEmailMutationVariables>(UpdateInstEmailDocument, options);
      }
export type UpdateInstEmailMutationHookResult = ReturnType<typeof useUpdateInstEmailMutation>;
export type UpdateInstEmailMutationResult = Apollo.MutationResult<UpdateInstEmailMutation>;
export type UpdateInstEmailMutationOptions = Apollo.BaseMutationOptions<UpdateInstEmailMutation, UpdateInstEmailMutationVariables>;