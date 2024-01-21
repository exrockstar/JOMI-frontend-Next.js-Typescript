import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArticlesBySlugQueryVariables = Types.Exact<{
  publication_id: Types.Scalars['String']['input'];
  locale?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ArticlesBySlugQuery = { __typename?: 'Query', articleBySlug?: { __typename?: 'Article', _id: string, title: string, status: string, isFree: boolean, comment_status?: string | null, comment_count: number, isPasswordProtected: boolean, visibility: Types.VisibilityEnum, previousWistiaIDS?: Array<string | null> | null, tags: Array<string>, category_priority_sort?: number | null, all_priority_sort?: number | null, created: any, updated: any, preprint_date?: any | null, edit_last?: string | null, published?: any | null, production_id?: string | null, display_last?: string | null, publication_id?: string | null, slug?: string | null, vid_length?: string | null, wistia_id?: string | null, authors_attr_html?: string | null, descriptionSEO?: string | null, has_complete_abstract?: boolean | null, DOIStatus?: string | null, enabled_languages?: Array<string> | null, disableProcedureTab: boolean, disableMainTab: boolean, disableTranscriptTab: boolean, authors: Array<{ __typename?: 'Author', _id: string, role?: string | null, display_name?: string | null, slug?: string | null, name?: { __typename?: 'Name', last?: string | null, first?: string | null, middle?: string | null } | null, image?: { __typename?: 'Image', filename?: string | null, path?: number | null } | null }>, categories: Array<{ __typename?: 'Category', _id: string, name: string, short: string, displayName: string, color: string, slug: string, desc: string }>, content: { __typename?: 'Content', transcription?: string | null, article?: string | null, abstract?: string | null, outline?: string | null, citations?: string | null, cite_this_article?: string | null, toc: Array<{ __typename?: 'ContentItem', number: number, _id: string, text: string, id: string, subheaders: Array<{ __typename?: 'SubItem', number: number, text: string, id: string }> }>, otoc: Array<{ __typename?: 'ContentItem', _id: string, number: number, text: string, id: string, subheaders: Array<{ __typename?: 'SubItem', number: number, text: string, id: string }> }> }, assets: Array<{ __typename?: 'Assets', url: string, width: number, height: number, fileSize: number, contentType: string, type: string }>, chapters: Array<{ __typename?: 'Chapter', number: number, title: string, time: number, subchapters?: Array<{ __typename?: 'SubChapter', number: number, parent: number, title: string, time: number }> | null }>, hospital?: { __typename?: 'Hospital', name: string } | null, image?: { __typename?: 'Image', format?: string | null, filename?: string | null, length?: number | null, geometry?: { __typename?: 'Geometry', width: number, height: number } | null } | null, wistia?: { __typename?: 'Wistia', internal_id?: string | null, name?: string | null, duration?: number | null, progress?: string | null, status?: string | null, uploaded?: string | null, updated?: string | null, description?: string | null, thumbnail?: { __typename?: 'Thumbnail', url: string, width: number, height: number } | null, project?: { __typename?: 'Project', id: string, name: string, hashed_id: string } | null } | null, stats?: { __typename?: 'ArticleStats', views?: number | null } | null } | null };

export type ArticleByIdQueryVariables = Types.Exact<{
  article_id: Types.Scalars['String']['input'];
}>;


export type ArticleByIdQuery = { __typename?: 'Query', articleById?: { __typename?: 'Article', _id: string, updated: any, slug?: string | null, title: string, published?: any | null, preprint_date?: any | null, publication_id?: string | null, content: { __typename?: 'Content', cite_this_article?: string | null }, authors: Array<{ __typename?: 'Author', display_name?: string | null, name?: { __typename?: 'Name', last?: string | null, first?: string | null, middle?: string | null } | null }> } | null };


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
      views
    }
    enabled_languages
    disableProcedureTab
    disableMainTab
    disableTranscriptTab
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