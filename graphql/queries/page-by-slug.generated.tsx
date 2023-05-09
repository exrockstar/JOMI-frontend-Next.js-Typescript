import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type PageBySlugQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type PageBySlugQuery = { __typename?: 'Query', pageBySlug?: { __typename?: 'Page', _id: string, status: Types.PageStatus, scripts?: Array<string> | null | undefined, sidebar?: string | null | undefined, created: any, updated: any, title: string, slug: string, content?: string | null | undefined, meta_desc?: string | null | undefined } | null | undefined };


export const PageBySlugDocument = gql`
    query PageBySlug($slug: String!) {
  pageBySlug(slug: $slug) {
    _id
    status
    scripts
    sidebar
    created
    updated
    title
    slug
    content
    meta_desc
  }
}
    `;

/**
 * __usePageBySlugQuery__
 *
 * To run a query within a React component, call `usePageBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function usePageBySlugQuery(baseOptions: Apollo.QueryHookOptions<PageBySlugQuery, PageBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageBySlugQuery, PageBySlugQueryVariables>(PageBySlugDocument, options);
      }
export function usePageBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageBySlugQuery, PageBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageBySlugQuery, PageBySlugQueryVariables>(PageBySlugDocument, options);
        }
export type PageBySlugQueryHookResult = ReturnType<typeof usePageBySlugQuery>;
export type PageBySlugLazyQueryHookResult = ReturnType<typeof usePageBySlugLazyQuery>;
export type PageBySlugQueryResult = Apollo.QueryResult<PageBySlugQuery, PageBySlugQueryVariables>;