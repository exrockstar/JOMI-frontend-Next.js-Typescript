import * as Types from '../types';

import { gql } from '@apollo/client';
import { UserPartsFragmentDoc } from '../fragments/UserParts.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpsertSocialUserMutationVariables = Types.Exact<{
  input: Types.SocialAuthInput;
}>;


export type UpsertSocialUserMutation = { __typename?: 'Mutation', upsertSocialUser: { __typename?: 'User', _id: string, subActive: boolean, email: string, role: Types.UserRoles, isPasswordSet: boolean, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined } } };


export const UpsertSocialUserDocument = gql`
    mutation UpsertSocialUser($input: SocialAuthInput!) {
  upsertSocialUser(input: $input) {
    ...UserParts
  }
}
    ${UserPartsFragmentDoc}`;
export type UpsertSocialUserMutationFn = Apollo.MutationFunction<UpsertSocialUserMutation, UpsertSocialUserMutationVariables>;

/**
 * __useUpsertSocialUserMutation__
 *
 * To run a mutation, you first call `useUpsertSocialUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertSocialUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertSocialUserMutation, { data, loading, error }] = useUpsertSocialUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertSocialUserMutation(baseOptions?: Apollo.MutationHookOptions<UpsertSocialUserMutation, UpsertSocialUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertSocialUserMutation, UpsertSocialUserMutationVariables>(UpsertSocialUserDocument, options);
      }
export type UpsertSocialUserMutationHookResult = ReturnType<typeof useUpsertSocialUserMutation>;
export type UpsertSocialUserMutationResult = Apollo.MutationResult<UpsertSocialUserMutation>;
export type UpsertSocialUserMutationOptions = Apollo.BaseMutationOptions<UpsertSocialUserMutation, UpsertSocialUserMutationVariables>;