import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ArticlesForRssQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ArticlesForRssQuery = { __typename?: 'Query', articlesForRss: Array<{ __typename?: 'Article', _id: string, title: string, publication_id?: string | null | undefined, tags: Array<string>, slug?: string | null | undefined, vid_length?: string | null | undefined, wistia_id?: string | null | undefined, published?: any | null | undefined, updated: any, enabled_languages?: Array<string> | null | undefined, categories: Array<{ __typename?: 'Category', _id: string, displayName: string }>, content: { __typename?: 'Content', abstract?: string | null | undefined }, assets: Array<{ __typename?: 'Assets', url: string, width: number, height: number, fileSize: number, contentType: string, type: string }>, wistia?: { __typename?: 'Wistia', duration?: number | null | undefined, thumbnail?: { __typename?: 'Thumbnail', url: string, width: number, height: number } | null | undefined } | null | undefined, stats?: { __typename?: 'ArticleStats', averagePercentWatched: number, pageLoads: number, percentOfVisitorsClickingPlay: number, plays: number, visitors: number, views?: number | null | undefined } | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined } | null | undefined }> };


export const ArticlesForRssDocument = gql`
    query ArticlesForRss {
  articlesForRss {
    _id
    title
    publication_id
    categories {
      _id
      displayName
    }
    tags
    content {
      abstract
    }
    assets {
      url
      width
      height
      fileSize
      contentType
      type
    }
    slug
    vid_length
    wistia_id
    published
    wistia {
      thumbnail {
        url
        width
        height
      }
      duration
    }
    stats {
      averagePercentWatched
      pageLoads
      percentOfVisitorsClickingPlay
      plays
      visitors
      views
    }
    updated
    image {
      filename
    }
    enabled_languages
  }
}
    `;

/**
 * __useArticlesForRssQuery__
 *
 * To run a query within a React component, call `useArticlesForRssQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesForRssQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesForRssQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlesForRssQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesForRssQuery, ArticlesForRssQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesForRssQuery, ArticlesForRssQueryVariables>(ArticlesForRssDocument, options);
      }
export function useArticlesForRssLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesForRssQuery, ArticlesForRssQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesForRssQuery, ArticlesForRssQueryVariables>(ArticlesForRssDocument, options);
        }
export type ArticlesForRssQueryHookResult = ReturnType<typeof useArticlesForRssQuery>;
export type ArticlesForRssLazyQueryHookResult = ReturnType<typeof useArticlesForRssLazyQuery>;
export type ArticlesForRssQueryResult = Apollo.QueryResult<ArticlesForRssQuery, ArticlesForRssQueryVariables>;