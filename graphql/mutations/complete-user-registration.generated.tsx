import * as Types from '../types';

import { gql } from '@apollo/client';
import { UserProfilePartsFragmentDoc } from '../fragments/UserProfileParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CompleteRegistrationMutationVariables = Types.Exact<{
  input: Types.ExtendedRegistrationInput;
}>;


export type CompleteRegistrationMutation = { __typename?: 'Mutation', completeUserRegistration: { __typename?: 'ExtendedRegistrationOutput', matchedWithInstitution: boolean, updatedUser: { __typename?: 'User', _id: string, display_name?: string | null | undefined, email: string, institution?: string | null | undefined, institution_name?: string | null | undefined, institutionalEmail?: string | null | undefined, role: Types.UserRoles, specialty?: string | null | undefined, subActive: boolean, created: any, user_type?: string | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined } | null | undefined }, updatedAccess: { __typename?: 'AccessType', accessType?: Types.AccessTypeEnum | null | undefined, institution_name?: string | null | undefined, shouldRequestInstVerification?: string | null | undefined, viaTemporaryIp?: boolean | null | undefined, expiry?: any | null | undefined } } };


export const CompleteRegistrationDocument = gql`
    mutation CompleteRegistration($input: ExtendedRegistrationInput!) {
  completeUserRegistration(input: $input) {
    updatedUser {
      ...UserProfileParts
    }
    updatedAccess {
      accessType
      institution_name
      shouldRequestInstVerification
      viaTemporaryIp
      expiry
    }
    matchedWithInstitution
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