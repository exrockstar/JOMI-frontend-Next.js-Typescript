import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ArticleAuthorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ArticleAuthorsQuery = { __typename?: 'Query', output: { __typename?: 'ArticleOutput', articles: Array<{ __typename?: 'Article', authors: Array<{ __typename?: 'Author', slug?: string | null | undefined, _id: string }> }> } };


export const ArticleAuthorsDocument = gql`
    query ArticleAuthors {
  output: articles {
    articles {
      authors {
        slug
        _id
      }
    }
  }
}
    `;

/**
 * __useArticleAuthorsQuery__
 *
 * To run a query within a React component, call `useArticleAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleAuthorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticleAuthorsQuery(baseOptions?: Apollo.QueryHookOptions<ArticleAuthorsQuery, ArticleAuthorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleAuthorsQuery, ArticleAuthorsQueryVariables>(ArticleAuthorsDocument, options);
      }
export function useArticleAuthorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleAuthorsQuery, ArticleAuthorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleAuthorsQuery, ArticleAuthorsQueryVariables>(ArticleAuthorsDocument, options);
        }
export type ArticleAuthorsQueryHookResult = ReturnType<typeof useArticleAuthorsQuery>;
export type ArticleAuthorsLazyQueryHookResult = ReturnType<typeof useArticleAuthorsLazyQuery>;
export type ArticleAuthorsQueryResult = Apollo.QueryResult<ArticleAuthorsQuery, ArticleAuthorsQueryVariables>;