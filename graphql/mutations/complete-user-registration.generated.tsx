import * as Types from '../types';

import { gql } from '@apollo/client';
import { UserProfilePartsFragmentDoc } from '../fragments/UserProfileParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompleteRegistrationMutationVariables = Types.Exact<{
  input: Types.ExtendedRegistrationInput;
}>;


export type CompleteRegistrationMutation = { __typename?: 'Mutation', completeUserRegistration: { __typename?: 'ExtendedRegistrationOutput', updatedUser: { __typename?: 'User', _id: string, display_name?: string | null, email: string, institution?: string | null, institution_name?: string | null, institutionalEmail?: string | null, role: Types.UserRoles, specialty?: string | null, subActive: boolean, created: any, user_type?: string | null, name: { __typename?: 'Name', first?: string | null, last?: string | null }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null } | null, accessType: { __typename?: 'AccessType', accessType?: Types.AccessTypeEnum | null, institution_name?: string | null, shouldRequestInstVerification?: string | null, viaTemporaryIp?: boolean | null, expiry?: any | null, subscriptionExpiresAt?: any | null, requireLogin?: boolean | null, institution_id?: string | null, customInstitutionName?: string | null } }, updatedAccess: { __typename?: 'AccessType', institution_id?: string | null, accessType?: Types.AccessTypeEnum | null, institution_name?: string | null, shouldRequestInstVerification?: string | null, viaTemporaryIp?: boolean | null, expiry?: any | null } } };


export const CompleteRegistrationDocument = gql`
    mutation CompleteRegistration($input: ExtendedRegistrationInput!) {
  completeUserRegistration(input: $input) {
    updatedUser {
      ...UserProfileParts
    }
    updatedAccess {
      institution_id
      accessType
      institution_name
      shouldRequestInstVerification
      viaTemporaryIp
      expiry
    }
  }
}
    ${UserProfilePartsFragmentDoc}`;
export type CompleteRegistrationMutationFn = Apollo.MutationFunction<CompleteRegistrationMutation, CompleteRegistrationMutationVariables>;

/**
 * __useCompleteRegistrationMutation__
 *
 * To run a mutation, you first call `useCompleteRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeRegistrationMutation, { data, loading, error }] = useCompleteRegistrationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompleteRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<CompleteRegistrationMutation, CompleteRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteRegistrationMutation, CompleteRegistrationMutationVariables>(CompleteRegistrationDocument, options);
      }
export type CompleteRegistrationMutationHookResult = ReturnType<typeof useCompleteRegistrationMutation>;
export type CompleteRegistrationMutationResult = Apollo.MutationResult<CompleteRegistrationMutation>;
export type CompleteRegistrationMutationOptions = Apollo.BaseMutationOptions<CompleteRegistrationMutation, CompleteRegistrationMutationVariables>;