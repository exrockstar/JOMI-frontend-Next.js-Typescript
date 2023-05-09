import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ArticleAccessQueryVariables = Types.Exact<{
  publication_id: Types.Scalars['String'];
}>;


export type ArticleAccessQuery = { __typename?: 'Query', article?: { __typename?: 'Article', articleAccessType: { __typename?: 'AccessType', accessType?: Types.AccessTypeEnum | null | undefined, institution_name?: string | null | undefined, shouldRequestInstVerification?: string | null | undefined, viaTemporaryIp?: boolean | null | undefined, isTrial?: boolean | null | undefined, subscriptionExpiresAt?: any | null | undefined, expiry?: any | null | undefined, requireLogin?: boolean | null | undefined } } | null | undefined };


export const ArticleAccessDocument = gql`
    query ArticleAccess($publication_id: String!) {
  article: articleBySlug(publication_id: $publication_id) {
    articleAccessType {
      accessType
      institution_name
      shouldRequestInstVerification
      viaTemporaryIp
      isTrial
      subscriptionExpiresAt
      expiry
      requireLogin
    }
  }
}
    `;

/**
 * __useArticleAccessQuery__
 *
 * To run a query within a React component, call `useArticleAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleAccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleAccessQuery({
 *   variables: {
 *      publication_id: // value for 'publication_id'
 *   },
 * });
 */
export function useArticleAccessQuery(baseOptions: Apollo.QueryHookOptions<ArticleAccessQuery, ArticleAccessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleAccessQuery, ArticleAccessQueryVariables>(ArticleAccessDocument, options);
      }
export function useArticleAccessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleAccessQuery, ArticleAccessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleAccessQuery, ArticleAccessQueryVariables>(ArticleAccessDocument, options);
        }
export type ArticleAccessQueryHookResult = ReturnType<typeof useArticleAccessQuery>;
export type ArticleAccessLazyQueryHookResult = ReturnType<typeof useArticleAccessLazyQuery>;
export type ArticleAccessQueryResult = Apollo.QueryResult<ArticleAccessQuery, ArticleAccessQueryVariables>;