import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type FrontPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FrontPageQuery = { __typename?: 'Query', latestArticles: Array<{ __typename?: 'Article', _id: string, title: string, slug: string, publication_id?: string | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined } | null | undefined, categories: Array<{ __typename?: 'Category', color: string, slug: string, displayName: string, _id: string }>, authors: Array<{ __typename?: 'Author', display_name?: string | null | undefined, slug?: string | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined } | null | undefined }>, hospital?: { __typename?: 'Hospital', name: string } | null | undefined }> };


export const FrontPageDocument = gql`
    query FrontPage {
  latestArticles {
    _id
    title
    slug
    publication_id
    image {
      filename
    }
    categories {
      color
      slug
      displayName
      _id
    }
    authors {
      image {
        filename
      }
      display_name
      slug
    }
    hospital {
      name
    }
  }
}
    `;

/**
 * __useFrontPageQuery__
 *
 * To run a query within a React component, call `useFrontPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFrontPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFrontPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useFrontPageQuery(baseOptions?: Apollo.QueryHookOptions<FrontPageQuery, FrontPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FrontPageQuery, FrontPageQueryVariables>(FrontPageDocument, options);
      }
export function useFrontPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FrontPageQuery, FrontPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FrontPageQuery, FrontPageQueryVariables>(FrontPageDocument, options);
        }
export type FrontPageQueryHookResult = ReturnType<typeof useFrontPageQuery>;
export type FrontPageLazyQueryHookResult = ReturnType<typeof useFrontPageLazyQuery>;
export type FrontPageQueryResult = Apollo.QueryResult<FrontPageQuery, FrontPageQueryVariables>;