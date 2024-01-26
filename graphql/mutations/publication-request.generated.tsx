import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PublicationRequestMutationVariables = Types.Exact<{
  input: Types.PublicationRequestInput;
}>;


export type PublicationRequestMutation = { __typename?: 'Mutation', createPublicationRequest: boolean };


export const PublicationRequestDocument = gql`
    mutation PublicationRequest($input: PublicationRequestInput!) {
  createPublicationRequest(input: $input)
}
    `;
export type PublicationRequestMutationFn = Apollo.MutationFunction<PublicationRequestMutation, PublicationRequestMutationVariables>;

/**
 * __usePublicationRequestMutation__
 *
 * To run a mutation, you first call `usePublicationRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublicationRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publicationRequestMutation, { data, loading, error }] = usePublicationRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePublicationRequestMutation(baseOptions?: Apollo.MutationHookOptions<PublicationRequestMutation, PublicationRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublicationRequestMutation, PublicationRequestMutationVariables>(PublicationRequestDocument, options);
      }
export type PublicationRequestMutationHookResult = ReturnType<typeof usePublicationRequestMutation>;
export type PublicationRequestMutationResult = Apollo.MutationResult<PublicationRequestMutation>;
export type PublicationRequestMutationOptions = Apollo.BaseMutationOptions<PublicationRequestMutation, PublicationRequestMutationVariables>;