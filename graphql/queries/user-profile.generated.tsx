import * as Types from '../types';

import { gql } from '@apollo/client';
import { UserProfilePartsFragmentDoc } from '../fragments/UserProfileParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserProfileQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, display_name?: string | null, email: string, institution?: string | null, institution_name?: string | null, institutionalEmail?: string | null, role: Types.UserRoles, specialty?: string | null, subActive: boolean, created: any, user_type?: string | null, name: { __typename?: 'Name', first?: string | null, last?: string | null }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null } | null, accessType: { __typename?: 'AccessType', accessType?: Types.AccessTypeEnum | null, institution_name?: string | null, shouldRequestInstVerification?: string | null, viaTemporaryIp?: boolean | null, expiry?: any | null, subscriptionExpiresAt?: any | null, requireLogin?: boolean | null, institution_id?: string | null, customInstitutionName?: string | null } } | null, geolocation?: { __typename?: 'Geolocation', countryCode?: string | null } | null };


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