import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConferencePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ConferencePageQuery = { __typename?: 'Query', confSampleCases: Array<{ __typename?: 'Article', _id: string, title: string, slug?: string | null, publication_id?: string | null, image?: { __typename?: 'Image', filename?: string | null } | null, categories: Array<{ __typename?: 'Category', color: string, slug: string, displayName: string, _id: string }>, authors: Array<{ __typename?: 'Author', display_name?: string | null, slug?: string | null, image?: { __typename?: 'Image', filename?: string | null } | null }>, hospital?: { __typename?: 'Hospital', name: string } | null }>, latestArticles: Array<{ __typename?: 'Article', _id: string, title: string, slug?: string | null, publication_id?: string | null, image?: { __typename?: 'Image', filename?: string | null } | null, categories: Array<{ __typename?: 'Category', color: string, slug: string, displayName: string, _id: string }>, authors: Array<{ __typename?: 'Author', display_name?: string | null, slug?: string | null, image?: { __typename?: 'Image', filename?: string | null } | null }>, hospital?: { __typename?: 'Hospital', name: string } | null }> };


export const ConferencePageDocument = gql`
    query ConferencePage {
  confSampleCases {
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
 * __useConferencePageQuery__
 *
 * To run a query within a React component, call `useConferencePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useConferencePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConferencePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useConferencePageQuery(baseOptions?: Apollo.QueryHookOptions<ConferencePageQuery, ConferencePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConferencePageQuery, ConferencePageQueryVariables>(ConferencePageDocument, options);
      }
export function useConferencePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConferencePageQuery, ConferencePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConferencePageQuery, ConferencePageQueryVariables>(ConferencePageDocument, options);
        }
export type ConferencePageQueryHookResult = ReturnType<typeof useConferencePageQuery>;
export type ConferencePageLazyQueryHookResult = ReturnType<typeof useConferencePageLazyQuery>;
export type ConferencePageQueryResult = Apollo.QueryResult<ConferencePageQuery, ConferencePageQueryVariables>;