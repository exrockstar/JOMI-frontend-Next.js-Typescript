import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type RequestSubscriptionMutationVariables = Types.Exact<{
  input: Types.SubscriptionInput;
}>;


export type RequestSubscriptionMutation = { __typename?: 'Mutation', requestSubscription: boolean };


export const RequestSubscriptionDocument = gql`
    mutation RequestSubscription($input: SubscriptionInput!) {
  requestSubscription(input: $input)
}
    `;
export type RequestSubscriptionMutationFn = Apollo.MutationFunction<RequestSubscriptionMutation, RequestSubscriptionMutationVariables>;

/**
 * __useRequestSubscriptionMutation__
 *
 * To run a mutation, you first call `useRequestSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestSubscriptionMutation, { data, loading, error }] = useRequestSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<RequestSubscriptionMutation, RequestSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestSubscriptionMutation, RequestSubscriptionMutationVariables>(RequestSubscriptionDocument, options);
      }
export type RequestSubscriptionMutationHookResult = ReturnType<typeof useRequestSubscriptionMutation>;
export type RequestSubscriptionMutationResult = Apollo.MutationResult<RequestSubscriptionMutation>;
export type RequestSubscriptionMutationOptions = Apollo.BaseMutationOptions<RequestSubscriptionMutation, RequestSubscriptionMutationVariables>;