import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ArticlesBySlugQueryVariables = Types.Exact<{
  publication_id: Types.Scalars['String'];
  locale?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type ArticlesBySlugQuery = { __typename?: 'Query', articleBySlug?: { __typename?: 'Article', _id: string, title: string, status: string, isFree: boolean, comment_status?: string | null | undefined, comment_count: number, isPasswordProtected: boolean, visibility: Types.VisibilityEnum, previousWistiaIDS?: Array<string | null | undefined> | null | undefined, tags: Array<string>, category_priority_sort?: number | null | undefined, all_priority_sort?: number | null | undefined, created: any, updated: any, preprint_date?: any | null | undefined, edit_last?: string | null | undefined, published?: any | null | undefined, production_id?: string | null | undefined, display_last?: string | null | undefined, publication_id?: string | null | undefined, slug: string, vid_length?: string | null | undefined, wistia_id?: string | null | undefined, authors_attr_html?: string | null | undefined, descriptionSEO?: string | null | undefined, has_complete_abstract?: boolean | null | undefined, DOIStatus?: string | null | undefined, enabled_languages?: Array<string> | null | undefined, authors: Array<{ __typename?: 'Author', _id: string, role?: string | null | undefined, display_name?: string | null | undefined, slug?: string | null | undefined, name?: { __typename?: 'Name', last?: string | null | undefined, first?: string | null | undefined, middle?: string | null | undefined } | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined, path?: number | null | undefined } | null | undefined }>, categories: Array<{ __typename?: 'Category', _id: string, name: string, short: string, displayName: string, color: string, slug: string, desc: string }>, content: { __typename?: 'Content', transcription?: string | null | undefined, article?: string | null | undefined, abstract?: string | null | undefined, outline?: string | null | undefined, citations?: string | null | undefined, cite_this_article?: string | null | undefined, toc: Array<{ __typename?: 'ContentItem', number: number, _id: string, text: string, id: string, subheaders: Array<{ __typename?: 'SubItem', number: number, text: string, id: string }> }>, otoc: Array<{ __typename?: 'ContentItem', _id: string, number: number, text: string, id: string, subheaders: Array<{ __typename?: 'SubItem', number: number, text: string, id: string }> }> }, assets: Array<{ __typename?: 'Assets', url: string, width: number, height: number, fileSize: number, contentType: string, type: string }>, chapters: Array<{ __typename?: 'Chapter', number: number, title: string, time: number, subchapters?: Array<{ __typename?: 'SubChapter', number: number, parent: number, title: string, time: number }> | null | undefined }>, hospital?: { __typename?: 'Hospital', name: string } | null | undefined, image?: { __typename?: 'Image', format?: string | null | undefined, filename?: string | null | undefined, length?: number | null | undefined, geometry?: { __typename?: 'Geometry', width: number, height: number } | null | undefined } | null | undefined, wistia?: { __typename?: 'Wistia', internal_id?: string | null | undefined, name?: string | null | undefined, duration?: number | null | undefined, progress?: string | null | undefined, status?: string | null | undefined, uploaded?: string | null | undefined, updated?: string | null | undefined, description?: string | null | undefined, thumbnail?: { __typename?: 'Thumbnail', url: string, width: number, height: number } | null | undefined, project?: { __typename?: 'Project', id: string, name: string, hashed_id: string } | null | undefined } | null | undefined, stats?: { __typename?: 'ArticleStats', averagePercentWatched: number, pageLoads: number, percentOfVisitorsClickingPlay: number, plays: number, visitors: number } | null | undefined } | null | undefined };

export type ArticleByIdQueryVariables = Types.Exact<{
  article_id: Types.Scalars['String'];
}>;


export type ArticleByIdQuery = { __typename?: 'Query', articleById?: { __typename?: 'Article', _id: string, updated: any, slug: string, title: string, published?: any | null | undefined, preprint_date?: any | null | undefined, publication_id?: string | null | undefined, content: { __typename?: 'Content', cite_this_article?: string | null | undefined }, authors: Array<{ __typename?: 'Author', display_name?: string | null | undefined, name?: { __typename?: 'Name', last?: string | null | undefined, first?: string | null | undefined, middle?: string | null | undefined } | null | undefined }> } | null | undefined };


export const ArticlesBySlugDocument = gql`
    query ArticlesBySlug($publication_id: String!, $locale: String) {
  articleBySlug(publication_id: $publication_id, locale: $locale) {
    _id
    title
    status
    isFree
    comment_status
    comment_count
    isPasswordProtected
    authors {
      _id
      name {
        last
        first
        middle
      }
      role
      display_name
      slug
      image {
        filename
        path
      }
    }
    visibility
    previousWistiaIDS
    categories {
      _id
      name
      short
      displayName
      color
      slug
      desc
    }
    tags
    content {
      toc {
        number
        _id
        text
        id
        subheaders {
          number
          text
          id
        }
      }
      otoc {
        _id
        number
        text
        id
        subheaders {
          number
          text
          id
        }
      }
      transcription
      article
      abstract
      outline
      citations
      cite_this_article
    }
    category_priority_sort
    all_priority_sort
    created
    updated
    assets {
      url
      width
      height
      fileSize
      contentType
      type
    }
    chapters {
      number
      title
      time
      subchapters {
        number
        parent
        title
        time
      }
    }
    hospital {
      name
    }
    preprint_date
    edit_last
    published
    production_id
    display_last
    publication_id
    slug
    image {
      geometry {
        width
        height
      }
      format
      filename
      length
    }
    vid_length
    wistia_id
    authors_attr_html
    descriptionSEO
    has_complete_abstract
    DOIStatus
    wistia {
      internal_id
      name
      duration
      progress
      status
      uploaded
      updated
      description
      thumbnail {
        url
        width
        height
      }
      project {
        id
        name
        hashed_id
      }
    }
    stats {
      averagePercentWatched
      pageLoads
      percentOfVisitorsClickingPlay
      plays
      visitors
    }
    enabled_languages
  }
}
    `;

/**
 * __useArticlesBySlugQuery__
 *
 * To run a query within a React component, call `useArticlesBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesBySlugQuery({
 *   variables: {
 *      publication_id: // value for 'publication_id'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useArticlesBySlugQuery(baseOptions: Apollo.QueryHookOptions<ArticlesBySlugQuery, ArticlesBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesBySlugQuery, ArticlesBySlugQueryVariables>(ArticlesBySlugDocument, options);
      }
export function useArticlesBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesBySlugQuery, ArticlesBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesBySlugQuery, ArticlesBySlugQueryVariables>(ArticlesBySlugDocument, options);
        }
export type ArticlesBySlugQueryHookResult = ReturnType<typeof useArticlesBySlugQuery>;
export type ArticlesBySlugLazyQueryHookResult = ReturnType<typeof useArticlesBySlugLazyQuery>;
export type ArticlesBySlugQueryResult = Apollo.QueryResult<ArticlesBySlugQuery, ArticlesBySlugQueryVariables>;
export const ArticleByIdDocument = gql`
    query ArticleById($article_id: String!) {
  articleById(article_id: $article_id) {
    _id
    updated
    slug
    title
    content {
      cite_this_article
    }
    authors {
      display_name
      name {
        last
        first
        middle
      }
    }
    published
    preprint_date
    publication_id
  }
}
    `;

/**
 * __useArticleByIdQuery__
 *
 * To run a query within a React component, call `useArticleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleByIdQuery({
 *   variables: {
 *      article_id: // value for 'article_id'
 *   },
 * });
 */
export function useArticleByIdQuery(baseOptions: Apollo.QueryHookOptions<ArticleByIdQuery, ArticleByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleByIdQuery, ArticleByIdQueryVariables>(ArticleByIdDocument, options);
      }
export function useArticleByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleByIdQuery, ArticleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleByIdQuery, ArticleByIdQueryVariables>(ArticleByIdDocument, options);
        }
export type ArticleByIdQueryHookResult = ReturnType<typeof useArticleByIdQuery>;
export type ArticleByIdLazyQueryHookResult = ReturnType<typeof useArticleByIdLazyQuery>;
export type ArticleByIdQueryResult = Apollo.QueryResult<ArticleByIdQuery, ArticleByIdQueryVariables>;