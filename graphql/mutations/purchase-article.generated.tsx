import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type PurchaseArticleMutationVariables = Types.Exact<{
  input: Types.ArticlePurchaseInput;
}>;


export type PurchaseArticleMutation = { __typename?: 'Mutation', addPurchaseArticleOrder: boolean };

export type GetPurchasedArticlesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPurchasedArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Order', _id: string, description?: string | null | undefined, amount?: number | null | undefined, created: any, currency?: Types.OrderCurrency | null | undefined, type?: Types.OrderType | null | undefined, end?: any | null | undefined, article?: { __typename?: 'Article', slug?: string | null | undefined, publication_id?: string | null | undefined, title: string } | null | undefined }> };

export type GetPurchasedArticlesByUserIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetPurchasedArticlesByUserIdQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Order', _id: string, description?: string | null | undefined, amount?: number | null | undefined, created: any, type?: Types.OrderType | null | undefined, end?: any | null | undefined, article?: { __typename?: 'Article', slug?: string | null | undefined, publication_id?: string | null | undefined, title: string } | null | undefined }> };

export type GetPriceByProductIdQueryVariables = Types.Exact<{
  product_id: Types.Scalars['String'];
}>;


export type GetPriceByProductIdQuery = { __typename?: 'Query', getPriceByProductId: { __typename?: 'StripePrice', _id: string, product: string, priceId: string, unit_amount: number, countryCode?: Types.CountryEnum | null | undefined } };


export const PurchaseArticleDocument = gql`
    mutation PurchaseArticle($input: ArticlePurchaseInput!) {
  addPurchaseArticleOrder(input: $input)
}
    `;
export type PurchaseArticleMutationFn = Apollo.MutationFunction<PurchaseArticleMutation, PurchaseArticleMutationVariables>;

/**
 * __usePurchaseArticleMutation__
 *
 * To run a mutation, you first call `usePurchaseArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePurchaseArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [purchaseArticleMutation, { data, loading, error }] = usePurchaseArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePurchaseArticleMutation(baseOptions?: Apollo.MutationHookOptions<PurchaseArticleMutation, PurchaseArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PurchaseArticleMutation, PurchaseArticleMutationVariables>(PurchaseArticleDocument, options);
      }
export type PurchaseArticleMutationHookResult = ReturnType<typeof usePurchaseArticleMutation>;
export type PurchaseArticleMutationResult = Apollo.MutationResult<PurchaseArticleMutation>;
export type PurchaseArticleMutationOptions = Apollo.BaseMutationOptions<PurchaseArticleMutation, PurchaseArticleMutationVariables>;
export const GetPurchasedArticlesDocument = gql`
    query GetPurchasedArticles {
  articles: getPurchasedArticles {
    _id
    description
    amount
    created
    currency
    article {
      slug
      publication_id
      title
    }
    type
    end
  }
}
    `;

/**
 * __useGetPurchasedArticlesQuery__
 *
 * To run a query within a React component, call `useGetPurchasedArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchasedArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchasedArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPurchasedArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetPurchasedArticlesQuery, GetPurchasedArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchasedArticlesQuery, GetPurchasedArticlesQueryVariables>(GetPurchasedArticlesDocument, options);
      }
export function useGetPurchasedArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchasedArticlesQuery, GetPurchasedArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchasedArticlesQuery, GetPurchasedArticlesQueryVariables>(GetPurchasedArticlesDocument, options);
        }
export type GetPurchasedArticlesQueryHookResult = ReturnType<typeof useGetPurchasedArticlesQuery>;
export type GetPurchasedArticlesLazyQueryHookResult = ReturnType<typeof useGetPurchasedArticlesLazyQuery>;
export type GetPurchasedArticlesQueryResult = Apollo.QueryResult<GetPurchasedArticlesQuery, GetPurchasedArticlesQueryVariables>;
export const GetPurchasedArticlesByUserIdDocument = gql`
    query GetPurchasedArticlesByUserId($id: String!) {
  articles: getPurchasedArticlesByUserId(id: $id) {
    _id
    description
    amount
    created
    article {
      slug
      publication_id
      title
    }
    type
    end
  }
}
    `;

/**
 * __useGetPurchasedArticlesByUserIdQuery__
 *
 * To run a query within a React component, call `useGetPurchasedArticlesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchasedArticlesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchasedArticlesByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPurchasedArticlesByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetPurchasedArticlesByUserIdQuery, GetPurchasedArticlesByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchasedArticlesByUserIdQuery, GetPurchasedArticlesByUserIdQueryVariables>(GetPurchasedArticlesByUserIdDocument, options);
      }
export function useGetPurchasedArticlesByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchasedArticlesByUserIdQuery, GetPurchasedArticlesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchasedArticlesByUserIdQuery, GetPurchasedArticlesByUserIdQueryVariables>(GetPurchasedArticlesByUserIdDocument, options);
        }
export type GetPurchasedArticlesByUserIdQueryHookResult = ReturnType<typeof useGetPurchasedArticlesByUserIdQuery>;
export type GetPurchasedArticlesByUserIdLazyQueryHookResult = ReturnType<typeof useGetPurchasedArticlesByUserIdLazyQuery>;
export type GetPurchasedArticlesByUserIdQueryResult = Apollo.QueryResult<GetPurchasedArticlesByUserIdQuery, GetPurchasedArticlesByUserIdQueryVariables>;
export const GetPriceByProductIdDocument = gql`
    query GetPriceByProductId($product_id: String!) {
  getPriceByProductId(product_id: $product_id) {
    _id
    product
    priceId
    unit_amount
    countryCode
  }
}
    `;

/**
 * __useGetPriceByProductIdQuery__
 *
 * To run a query within a React component, call `useGetPriceByProductIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriceByProductIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriceByProductIdQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useGetPriceByProductIdQuery(baseOptions: Apollo.QueryHookOptions<GetPriceByProductIdQuery, GetPriceByProductIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPriceByProductIdQuery, GetPriceByProductIdQueryVariables>(GetPriceByProductIdDocument, options);
      }
export function useGetPriceByProductIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPriceByProductIdQuery, GetPriceByProductIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPriceByProductIdQuery, GetPriceByProductIdQueryVariables>(GetPriceByProductIdDocument, options);
        }
export type GetPriceByProductIdQueryHookResult = ReturnType<typeof useGetPriceByProductIdQuery>;
export type GetPriceByProductIdLazyQueryHookResult = ReturnType<typeof useGetPriceByProductIdLazyQuery>;
export type GetPriceByProductIdQueryResult = Apollo.QueryResult<GetPriceByProductIdQuery, GetPriceByProductIdQueryVariables>;