import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ArticlesForSlugQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ArticlesForSlugQuery = { __typename?: 'Query', articlesForSlug: Array<{ __typename?: 'ArticleForSlug', title: string, slug: string, publication_id?: string | null | undefined }> };


export const ArticlesForSlugDocument = gql`
    query ArticlesForSlug {
  articlesForSlug {
    title
    slug
    publication_id
  }
}
    `;

/**
 * __useArticlesForSlugQuery__
 *
 * To run a query within a React component, call `useArticlesForSlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesForSlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesForSlugQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlesForSlugQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesForSlugQuery, ArticlesForSlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesForSlugQuery, ArticlesForSlugQueryVariables>(ArticlesForSlugDocument, options);
      }
export function useArticlesForSlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesForSlugQuery, ArticlesForSlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesForSlugQuery, ArticlesForSlugQueryVariables>(ArticlesForSlugDocument, options);
        }
export type ArticlesForSlugQueryHookResult = ReturnType<typeof useArticlesForSlugQuery>;
export type ArticlesForSlugLazyQueryHookResult = ReturnType<typeof useArticlesForSlugLazyQuery>;
export type ArticlesForSlugQueryResult = Apollo.QueryResult<ArticlesForSlugQuery, ArticlesForSlugQueryVariables>;