import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UserProfilePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserProfilePageQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, display_name?: string | null | undefined, email: string, instEmailVerified?: boolean | null | undefined, institution?: string | null | undefined, institution_name?: string | null | undefined, institutionalEmail?: string | null | undefined, interests?: Array<string> | null | undefined, isPasswordSet: boolean, phone?: string | null | undefined, specialty?: string | null | undefined, subActive: boolean, user_type?: string | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined } } | null | undefined };


export const UserProfilePageDocument = gql`
    query UserProfilePage {
  user {
    _id
    name {
      first
      last
    }
    display_name
    email
    instEmailVerified
    institution
    institution_name
    institutionalEmail
    interests
    isPasswordSet
    phone
    specialty
    subActive
    user_type
  }
}
    `;

/**
 * __useUserProfilePageQuery__
 *
 * To run a query within a React component, call `useUserProfilePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfilePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfilePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProfilePageQuery(baseOptions?: Apollo.QueryHookOptions<UserProfilePageQuery, UserProfilePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfilePageQuery, UserProfilePageQueryVariables>(UserProfilePageDocument, options);
      }
export function useUserProfilePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfilePageQuery, UserProfilePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfilePageQuery, UserProfilePageQueryVariables>(UserProfilePageDocument, options);
        }
export type UserProfilePageQueryHookResult = ReturnType<typeof useUserProfilePageQuery>;
export type UserProfilePageLazyQueryHookResult = ReturnType<typeof useUserProfilePageLazyQuery>;
export type UserProfilePageQueryResult = Apollo.QueryResult<UserProfilePageQuery, UserProfilePageQueryVariables>;