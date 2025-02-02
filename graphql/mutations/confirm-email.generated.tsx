import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConfirmEmailMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', token?: string | null };

export type ResendConfirmEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type ResendConfirmEmailMutation = { __typename?: 'Mutation', sendEmailConfirmation?: boolean | null };


export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!) {
  token: confirmEmail(token: $token)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const ResendConfirmEmailDocument = gql`
    mutation ResendConfirmEmail($email: String!) {
  sendEmailConfirmation(email: $email)
}
    `;
export type ResendConfirmEmailMutationFn = Apollo.MutationFunction<ResendConfirmEmailMutation, ResendConfirmEmailMutationVariables>;

/**
 * __useResendConfirmEmailMutation__
 *
 * To run a mutation, you first call `useResendConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendConfirmEmailMutation, { data, loading, error }] = useResendConfirmEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ResendConfirmEmailMutation, ResendConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendConfirmEmailMutation, ResendConfirmEmailMutationVariables>(ResendConfirmEmailDocument, options);
      }
export type ResendConfirmEmailMutationHookResult = ReturnType<typeof useResendConfirmEmailMutation>;
export type ResendConfirmEmailMutationResult = Apollo.MutationResult<ResendConfirmEmailMutation>;
export type ResendConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ResendConfirmEmailMutation, ResendConfirmEmailMutationVariables>;