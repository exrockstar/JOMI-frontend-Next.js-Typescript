import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type FeaturedInstitutionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FeaturedInstitutionsQuery = { __typename?: 'Query', featured_institutions: Array<{ __typename?: 'Institution', _id: string, name: string, subscriber_display_name?: string | null | undefined, urlLink?: string | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined, geometry?: { __typename?: 'Geometry', height: number, width: number } | null | undefined } | null | undefined }> };


export const FeaturedInstitutionsDocument = gql`
    query FeaturedInstitutions {
  featured_institutions {
    _id
    name
    subscriber_display_name
    urlLink
    image {
      filename
      geometry {
        height
        width
      }
    }
  }
}
    `;

/**
 * __useFeaturedInstitutionsQuery__
 *
 * To run a query within a React component, call `useFeaturedInstitutionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedInstitutionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedInstitutionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeaturedInstitutionsQuery(baseOptions?: Apollo.QueryHookOptions<FeaturedInstitutionsQuery, FeaturedInstitutionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeaturedInstitutionsQuery, FeaturedInstitutionsQueryVariables>(FeaturedInstitutionsDocument, options);
      }
export function useFeaturedInstitutionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeaturedInstitutionsQuery, FeaturedInstitutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeaturedInstitutionsQuery, FeaturedInstitutionsQueryVariables>(FeaturedInstitutionsDocument, options);
        }
export type FeaturedInstitutionsQueryHookResult = ReturnType<typeof useFeaturedInstitutionsQuery>;
export type FeaturedInstitutionsLazyQueryHookResult = ReturnType<typeof useFeaturedInstitutionsLazyQuery>;
export type FeaturedInstitutionsQueryResult = Apollo.QueryResult<FeaturedInstitutionsQuery, FeaturedInstitutionsQueryVariables>;