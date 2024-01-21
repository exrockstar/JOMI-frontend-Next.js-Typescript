import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserTypesAndSpecialtiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserTypesAndSpecialtiesQuery = { __typename?: 'Query', userTypes?: Array<{ __typename?: 'UserType', type: string, _id: any }> | null, specialties?: Array<{ __typename?: 'Specialty', name: string, _id: string }> | null };


export const UserTypesAndSpecialtiesDocument = gql`
    query UserTypesAndSpecialties {
  userTypes {
    type
    _id
  }
  specialties {
    name
    _id
  }
}
    `;

/**
 * __useUserTypesAndSpecialtiesQuery__
 *
 * To run a query within a React component, call `useUserTypesAndSpecialtiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTypesAndSpecialtiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTypesAndSpecialtiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserTypesAndSpecialtiesQuery(baseOptions?: Apollo.QueryHookOptions<UserTypesAndSpecialtiesQuery, UserTypesAndSpecialtiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTypesAndSpecialtiesQuery, UserTypesAndSpecialtiesQueryVariables>(UserTypesAndSpecialtiesDocument, options);
      }
export function useUserTypesAndSpecialtiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTypesAndSpecialtiesQuery, UserTypesAndSpecialtiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTypesAndSpecialtiesQuery, UserTypesAndSpecialtiesQueryVariables>(UserTypesAndSpecialtiesDocument, options);
        }
export type UserTypesAndSpecialtiesQueryHookResult = ReturnType<typeof useUserTypesAndSpecialtiesQuery>;
export type UserTypesAndSpecialtiesLazyQueryHookResult = ReturnType<typeof useUserTypesAndSpecialtiesLazyQuery>;
export type UserTypesAndSpecialtiesQueryResult = Apollo.QueryResult<UserTypesAndSpecialtiesQuery, UserTypesAndSpecialtiesQueryVariables>;