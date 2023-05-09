import * as Types from '../types';

import { gql } from '@apollo/client';
import { ArticleListPartsFragmentDoc } from '../fragments/ArticleListParts.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ArticlesQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.ArticleInput>;
}>;


export type ArticlesQuery = { __typename?: 'Query', articleOutput: { __typename?: 'ArticleOutput', totalCount: number, articles: Array<{ __typename?: 'Article', _id: string, title: string, status: string, publication_id?: string | null | undefined, descriptionSEO?: string | null | undefined, visibility: Types.VisibilityEnum, vid_length?: string | null | undefined, created: any, slug: string, production_id?: string | null | undefined, published?: any | null | undefined, updated: any, preprint_date?: any | null | undefined, tags: Array<string>, comment_count: number, authors: Array<{ __typename?: 'Author', _id: string, display_name?: string | null | undefined, role?: string | null | undefined, slug?: string | null | undefined }>, categories: Array<{ __typename?: 'Category', _id: string, short: string, displayName: string, color: string, slug: string }>, hospital?: { __typename?: 'Hospital', name: string } | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined, geometry?: { __typename?: 'Geometry', width: number, height: number } | null | undefined } | null | undefined, restrictions?: { __typename?: 'Restriction', article: Types.ArticleRestrictionEnum } | null | undefined, wistia?: { __typename?: 'Wistia', duration?: number | null | undefined } | null | undefined }> } };


export const ArticlesDocument = gql`
    query Articles($input: ArticleInput) {
  articleOutput: articles(input: $input) {
    articles {
      ...ArticleListParts
    }
    totalCount
  }
}
    ${ArticleListPartsFragmentDoc}`;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;