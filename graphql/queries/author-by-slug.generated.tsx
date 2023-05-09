import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AuthorBySlugQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type AuthorBySlugQuery = { __typename?: 'Query', authorBySlug?: { __typename?: 'Author', _id: string, display_name?: string | null | undefined, slug?: string | null | undefined, role?: string | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined, geometry?: { __typename?: 'Geometry', height: number, width: number } | null | undefined } | null | undefined } | null | undefined };


export const AuthorBySlugDocument = gql`
    query AuthorBySlug($slug: String!) {
  authorBySlug(slug: $slug) {
    _id
    display_name
    slug
    role
    image {
      geometry {
        height
        width
      }
      filename
    }
  }
}
    `;

/**
 * __useAuthorBySlugQuery__
 *
 * To run a query within a React component, call `useAuthorBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAuthorBySlugQuery(baseOptions: Apollo.QueryHookOptions<AuthorBySlugQuery, AuthorBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthorBySlugQuery, AuthorBySlugQueryVariables>(AuthorBySlugDocument, options);
      }
export function useAuthorBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorBySlugQuery, AuthorBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthorBySlugQuery, AuthorBySlugQueryVariables>(AuthorBySlugDocument, options);
        }
export type AuthorBySlugQueryHookResult = ReturnType<typeof useAuthorBySlugQuery>;
export type AuthorBySlugLazyQueryHookResult = ReturnType<typeof useAuthorBySlugLazyQuery>;
export type AuthorBySlugQueryResult = Apollo.QueryResult<AuthorBySlugQuery, AuthorBySlugQueryVariables>;