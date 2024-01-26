import * as Types from '../types';

import { gql } from '@apollo/client';
import { UserPartsFragmentDoc } from '../fragments/UserParts.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SignInMutationVariables = Types.Exact<{
  input: Types.SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'User', _id: string, subActive: boolean, email: string, role: Types.UserRoles, isPasswordSet: boolean, name: { __typename?: 'Name', first?: string | null, last?: string | null } } | null };

export type SignInViaTokenMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type SignInViaTokenMutation = { __typename?: 'Mutation', tokenSignIn?: { __typename?: 'User', _id: string, subActive: boolean, email: string, role: Types.UserRoles, isPasswordSet: boolean, name: { __typename?: 'Name', first?: string | null, last?: string | null } } | null };

export type SignInViaOldTokenMutationVariables = Types.Exact<{
  tokenId: Types.Scalars['String']['input'];
}>;


export type SignInViaOldTokenMutation = { __typename?: 'Mutation', user?: { __typename?: 'User', _id: string, subActive: boolean, email: string, role: Types.UserRoles, isPasswordSet: boolean, name: { __typename?: 'Name', first?: string | null, last?: string | null } } | null };


export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    ...UserParts
  }
}
    ${UserPartsFragmentDoc}`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignInViaTokenDocument = gql`
    mutation SignInViaToken($token: String!) {
  tokenSignIn(token: $token) {
    ...UserParts
  }
}
    ${UserPartsFragmentDoc}`;
export type SignInViaTokenMutationFn = Apollo.MutationFunction<SignInViaTokenMutation, SignInViaTokenMutationVariables>;

/**
 * __useSignInViaTokenMutation__
 *
 * To run a mutation, you first call `useSignInViaTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInViaTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInViaTokenMutation, { data, loading, error }] = useSignInViaTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSignInViaTokenMutation(baseOptions?: Apollo.MutationHookOptions<SignInViaTokenMutation, SignInViaTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInViaTokenMutation, SignInViaTokenMutationVariables>(SignInViaTokenDocument, options);
      }
export type SignInViaTokenMutationHookResult = ReturnType<typeof useSignInViaTokenMutation>;
export type SignInViaTokenMutationResult = Apollo.MutationResult<SignInViaTokenMutation>;
export type SignInViaTokenMutationOptions = Apollo.BaseMutationOptions<SignInViaTokenMutation, SignInViaTokenMutationVariables>;
export const SignInViaOldTokenDocument = gql`
    mutation SignInViaOldToken($tokenId: String!) {
  user: signInUsingOldToken(tokenId: $tokenId) {
    ...UserParts
  }
}
    ${UserPartsFragmentDoc}`;
export type SignInViaOldTokenMutationFn = Apollo.MutationFunction<SignInViaOldTokenMutation, SignInViaOldTokenMutationVariables>;

/**
 * __useSignInViaOldTokenMutation__
 *
 * To run a mutation, you first call `useSignInViaOldTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInViaOldTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInViaOldTokenMutation, { data, loading, error }] = useSignInViaOldTokenMutation({
 *   variables: {
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useSignInViaOldTokenMutation(baseOptions?: Apollo.MutationHookOptions<SignInViaOldTokenMutation, SignInViaOldTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInViaOldTokenMutation, SignInViaOldTokenMutationVariables>(SignInViaOldTokenDocument, options);
      }
export type SignInViaOldTokenMutationHookResult = ReturnType<typeof useSignInViaOldTokenMutation>;
export type SignInViaOldTokenMutationResult = Apollo.MutationResult<SignInViaOldTokenMutation>;
export type SignInViaOldTokenMutationOptions = Apollo.BaseMutationOptions<SignInViaOldTokenMutation, SignInViaOldTokenMutationVariables>;