import * as Types from '../types';

import { gql } from '@apollo/client';
import { ArticleListPartsFragmentDoc } from '../fragments/ArticleListParts.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AuthorPageQueryVariables = Types.Exact<{
  input: Types.ArticleInput;
}>;


export type AuthorPageQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', _id: string, short: string, displayName: string, color: string, slug: string, desc: string, name: string }> | null, articleOutput: { __typename?: 'ArticleOutput', totalCount: number, articles: Array<{ __typename?: 'Article', _id: string, title: string, status: string, publication_id?: string | null, descriptionSEO?: string | null, visibility: Types.VisibilityEnum, vid_length?: string | null, created: any, slug?: string | null, production_id?: string | null, published?: any | null, updated: any, preprint_date?: any | null, tags: Array<string>, comment_count: number, isPurchaseArticleFeatureOn?: boolean | null, isRentArticleFeatureOn?: boolean | null, authors: Array<{ __typename?: 'Author', _id: string, display_name?: string | null, role?: string | null, slug?: string | null }>, categories: Array<{ __typename?: 'Category', _id: string, short: string, displayName: string, color: string, slug: string }>, hospital?: { __typename?: 'Hospital', name: string } | null, image?: { __typename?: 'Image', filename?: string | null, geometry?: { __typename?: 'Geometry', width: number, height: number } | null } | null, restrictions?: { __typename?: 'Restriction', article: Types.ArticleRestrictionEnum } | null, wistia?: { __typename?: 'Wistia', duration?: number | null } | null }> } };


export const AuthorPageDocument = gql`
    query AuthorPage($input: ArticleInput!) {
  categories {
    _id
    short
    displayName
    color
    slug
    desc
    name
  }
  articleOutput: articles(input: $input) {
    articles {
      ...ArticleListParts
    }
    totalCount
  }
}
    ${ArticleListPartsFragmentDoc}`;

/**
 * __useAuthorPageQuery__
 *
 * To run a query within a React component, call `useAuthorPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthorPageQuery(baseOptions: Apollo.QueryHookOptions<AuthorPageQuery, AuthorPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthorPageQuery, AuthorPageQueryVariables>(AuthorPageDocument, options);
      }
export function useAuthorPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorPageQuery, AuthorPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthorPageQuery, AuthorPageQueryVariables>(AuthorPageDocument, options);
        }
export type AuthorPageQueryHookResult = ReturnType<typeof useAuthorPageQuery>;
export type AuthorPageLazyQueryHookResult = ReturnType<typeof useAuthorPageLazyQuery>;
export type AuthorPageQueryResult = Apollo.QueryResult<AuthorPageQuery, AuthorPageQueryVariables>;