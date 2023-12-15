import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type FrontPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FrontPageQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleOutput', totalCount: number }, latestArticles: Array<{ __typename?: 'Article', _id: string, title: string, slug?: string | null | undefined, publication_id?: string | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined } | null | undefined, categories: Array<{ __typename?: 'Category', color: string, slug: string, displayName: string, _id: string }>, authors: Array<{ __typename?: 'Author', display_name?: string | null | undefined, slug?: string | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined } | null | undefined }>, hospital?: { __typename?: 'Hospital', name: string } | null | undefined }> };

export type GetPricingSectionDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPricingSectionDataQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string } | null | undefined, getTrialSettingsForCountry: { __typename?: 'TrialSettings', trialDuration: number }, getPricingSectionData?: Array<{ __typename?: 'StripePrice', _id: string, enabled?: boolean | null | undefined, nickname: string, priceId?: string | null | undefined, product: string, interval?: Types.OrderInterval | null | undefined, currency: string, unit_amount: number, productName?: string | null | undefined }> | null | undefined };


export const FrontPageDocument = gql`
    query FrontPage {
  articles {
    totalCount
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
export const GetPricingSectionDataDocument = gql`
    query GetPricingSectionData {
  user {
    _id
  }
  getTrialSettingsForCountry {
    trialDuration
  }
  getPricingSectionData {
    _id
    enabled
    nickname
    priceId
    product
    interval
    currency
    unit_amount
    productName
  }
}
    `;

/**
 * __useGetPricingSectionDataQuery__
 *
 * To run a query within a React component, call `useGetPricingSectionDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPricingSectionDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPricingSectionDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPricingSectionDataQuery(baseOptions?: Apollo.QueryHookOptions<GetPricingSectionDataQuery, GetPricingSectionDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPricingSectionDataQuery, GetPricingSectionDataQueryVariables>(GetPricingSectionDataDocument, options);
      }
export function useGetPricingSectionDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPricingSectionDataQuery, GetPricingSectionDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPricingSectionDataQuery, GetPricingSectionDataQueryVariables>(GetPricingSectionDataDocument, options);
        }
export type GetPricingSectionDataQueryHookResult = ReturnType<typeof useGetPricingSectionDataQuery>;
export type GetPricingSectionDataLazyQueryHookResult = ReturnType<typeof useGetPricingSectionDataLazyQuery>;
export type GetPricingSectionDataQueryResult = Apollo.QueryResult<GetPricingSectionDataQuery, GetPricingSectionDataQueryVariables>;