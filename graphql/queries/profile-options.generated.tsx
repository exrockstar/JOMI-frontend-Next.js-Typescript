import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ProfileOptionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProfileOptionsQuery = { __typename?: 'Query', profileOptions: { __typename?: 'ProfileOptions', userTypes: Array<{ __typename?: 'UserType', _id: string, type: string }>, specialties: Array<{ __typename?: 'Specialty', _id: string, name: string }> } };


export const ProfileOptionsDocument = gql`
    query ProfileOptions {
  profileOptions {
    userTypes {
      _id
      type
    }
    specialties {
      _id
      name
    }
  }
}
    `;

/**
 * __useProfileOptionsQuery__
 *
 * To run a query within a React component, call `useProfileOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileOptionsQuery(baseOptions?: Apollo.QueryHookOptions<ProfileOptionsQuery, ProfileOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileOptionsQuery, ProfileOptionsQueryVariables>(ProfileOptionsDocument, options);
      }
export function useProfileOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileOptionsQuery, ProfileOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileOptionsQuery, ProfileOptionsQueryVariables>(ProfileOptionsDocument, options);
        }
export type ProfileOptionsQueryHookResult = ReturnType<typeof useProfileOptionsQuery>;
export type ProfileOptionsLazyQueryHookResult = ReturnType<typeof useProfileOptionsLazyQuery>;
export type ProfileOptionsQueryResult = Apollo.QueryResult<ProfileOptionsQuery, ProfileOptionsQueryVariables>;