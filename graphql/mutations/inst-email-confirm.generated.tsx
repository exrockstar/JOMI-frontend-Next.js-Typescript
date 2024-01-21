import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendInstitutionEmailConfirmationMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type SendInstitutionEmailConfirmationMutation = { __typename?: 'Mutation', sendInstEmailConfirmation?: boolean | null };

export type ConfirmInstitutionEmailMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type ConfirmInstitutionEmailMutation = { __typename?: 'Mutation', token?: string | null };


export const SendInstitutionEmailConfirmationDocument = gql`
    mutation SendInstitutionEmailConfirmation($email: String!) {
  sendInstEmailConfirmation(email: $email)
}
    `;
export type SendInstitutionEmailConfirmationMutationFn = Apollo.MutationFunction<SendInstitutionEmailConfirmationMutation, SendInstitutionEmailConfirmationMutationVariables>;

/**
 * __useSendInstitutionEmailConfirmationMutation__
 *
 * To run a mutation, you first call `useSendInstitutionEmailConfirmationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendInstitutionEmailConfirmationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendInstitutionEmailConfirmationMutation, { data, loading, error }] = useSendInstitutionEmailConfirmationMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendInstitutionEmailConfirmationMutation(baseOptions?: Apollo.MutationHookOptions<SendInstitutionEmailConfirmationMutation, SendInstitutionEmailConfirmationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendInstitutionEmailConfirmationMutation, SendInstitutionEmailConfirmationMutationVariables>(SendInstitutionEmailConfirmationDocument, options);
      }
export type SendInstitutionEmailConfirmationMutationHookResult = ReturnType<typeof useSendInstitutionEmailConfirmationMutation>;
export type SendInstitutionEmailConfirmationMutationResult = Apollo.MutationResult<SendInstitutionEmailConfirmationMutation>;
export type SendInstitutionEmailConfirmationMutationOptions = Apollo.BaseMutationOptions<SendInstitutionEmailConfirmationMutation, SendInstitutionEmailConfirmationMutationVariables>;
export const ConfirmInstitutionEmailDocument = gql`
    mutation ConfirmInstitutionEmail($token: String!) {
  token: confirmInstEmail(token: $token)
}
    `;
export type ConfirmInstitutionEmailMutationFn = Apollo.MutationFunction<ConfirmInstitutionEmailMutation, ConfirmInstitutionEmailMutationVariables>;

/**
 * __useConfirmInstitutionEmailMutation__
 *
 * To run a mutation, you first call `useConfirmInstitutionEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmInstitutionEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmInstitutionEmailMutation, { data, loading, error }] = useConfirmInstitutionEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmInstitutionEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmInstitutionEmailMutation, ConfirmInstitutionEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmInstitutionEmailMutation, ConfirmInstitutionEmailMutationVariables>(ConfirmInstitutionEmailDocument, options);
      }
export type ConfirmInstitutionEmailMutationHookResult = ReturnType<typeof useConfirmInstitutionEmailMutation>;
export type ConfirmInstitutionEmailMutationResult = Apollo.MutationResult<ConfirmInstitutionEmailMutation>;
export type ConfirmInstitutionEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmInstitutionEmailMutation, ConfirmInstitutionEmailMutationVariables>;