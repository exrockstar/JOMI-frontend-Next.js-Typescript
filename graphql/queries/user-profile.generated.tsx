import * as Types from '../types';

import { gql } from '@apollo/client';
import { UserProfilePartsFragmentDoc } from '../fragments/UserProfileParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UserProfileQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, display_name?: string | null | undefined, email: string, institution?: string | null | undefined, institution_name?: string | null | undefined, institutionalEmail?: string | null | undefined, role: Types.UserRoles, specialty?: string | null | undefined, subActive: boolean, created: any, user_type?: string | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined } | null | undefined, accessType: { __typename?: 'AccessType', accessType?: Types.AccessTypeEnum | null | undefined, institution_name?: string | null | undefined, shouldRequestInstVerification?: string | null | undefined, viaTemporaryIp?: boolean | null | undefined, expiry?: any | null | undefined, subscriptionExpiresAt?: any | null | undefined, requireLogin?: boolean | null | undefined, institution_id?: string | null | undefined, customInstitutionName?: string | null | undefined } } | null | undefined, geolocation?: { __typename?: 'Geolocation', countryCode?: string | null | undefined } | null | undefined };


export const UserProfileDocument = gql`
    query UserProfile {
  user {
    ...UserProfileParts
  }
  geolocation {
    countryCode
  }
}
    ${UserProfilePartsFragmentDoc}`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;