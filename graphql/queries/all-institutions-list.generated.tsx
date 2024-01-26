import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllInstitutionsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllInstitutionsListQuery = { __typename?: 'Query', allInstitutionsList: Array<string> };


export const AllInstitutionsListDocument = gql`
    query AllInstitutionsList {
  allInstitutionsList
}
    `;

/**
 * __useAllInstitutionsListQuery__
 *
 * To run a query within a React component, call `useAllInstitutionsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllInstitutionsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllInstitutionsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllInstitutionsListQuery(baseOptions?: Apollo.QueryHookOptions<AllInstitutionsListQuery, AllInstitutionsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllInstitutionsListQuery, AllInstitutionsListQueryVariables>(AllInstitutionsListDocument, options);
      }
export function useAllInstitutionsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllInstitutionsListQuery, AllInstitutionsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllInstitutionsListQuery, AllInstitutionsListQueryVariables>(AllInstitutionsListDocument, options);
        }
export type AllInstitutionsListQueryHookResult = ReturnType<typeof useAllInstitutionsListQuery>;
export type AllInstitutionsListLazyQueryHookResult = ReturnType<typeof useAllInstitutionsListLazyQuery>;
export type AllInstitutionsListQueryResult = Apollo.QueryResult<AllInstitutionsListQuery, AllInstitutionsListQueryVariables>;