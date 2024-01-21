import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArticlesCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ArticlesCountQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleOutput', totalCount: number } };


export const ArticlesCountDocument = gql`
    query ArticlesCount {
  articles {
    totalCount
  }
}
    `;

/**
 * __useArticlesCountQuery__
 *
 * To run a query within a React component, call `useArticlesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlesCountQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesCountQuery, ArticlesCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesCountQuery, ArticlesCountQueryVariables>(ArticlesCountDocument, options);
      }
export function useArticlesCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesCountQuery, ArticlesCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesCountQuery, ArticlesCountQueryVariables>(ArticlesCountDocument, options);
        }
export type ArticlesCountQueryHookResult = ReturnType<typeof useArticlesCountQuery>;
export type ArticlesCountLazyQueryHookResult = ReturnType<typeof useArticlesCountLazyQuery>;
export type ArticlesCountQueryResult = Apollo.QueryResult<ArticlesCountQuery, ArticlesCountQueryVariables>;