import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type InstitutionSubsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type InstitutionSubsQuery = { __typename?: 'Query', institution_subs: Array<{ __typename?: 'Institution', _id: string, category?: string | null | undefined, name: string, displayName?: string | null | undefined }> };


export const InstitutionSubsDocument = gql`
    query InstitutionSubs {
  institution_subs {
    _id
    category
    name
    displayName: subscriber_display_name
  }
}
    `;

/**
 * __useInstitutionSubsQuery__
 *
 * To run a query within a React component, call `useInstitutionSubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionSubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionSubsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInstitutionSubsQuery(baseOptions?: Apollo.QueryHookOptions<InstitutionSubsQuery, InstitutionSubsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstitutionSubsQuery, InstitutionSubsQueryVariables>(InstitutionSubsDocument, options);
      }
export function useInstitutionSubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstitutionSubsQuery, InstitutionSubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstitutionSubsQuery, InstitutionSubsQueryVariables>(InstitutionSubsDocument, options);
        }
export type InstitutionSubsQueryHookResult = ReturnType<typeof useInstitutionSubsQuery>;
export type InstitutionSubsLazyQueryHookResult = ReturnType<typeof useInstitutionSubsLazyQuery>;
export type InstitutionSubsQueryResult = Apollo.QueryResult<InstitutionSubsQuery, InstitutionSubsQueryVariables>;