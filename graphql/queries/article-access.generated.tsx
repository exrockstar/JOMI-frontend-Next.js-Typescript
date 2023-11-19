import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ArticleAccessQueryVariables = Types.Exact<{
  publication_id: Types.Scalars['String'];
}>;


export type ArticleAccessQuery = { __typename?: 'Query', getIsRequestInstSubButtonPaperOn: boolean, getTypesWithAccess: Array<Types.AccessTypeEnum>, article?: { __typename?: 'Article', _id: string, title: string, publication_id?: string | null | undefined, showRentArticle: boolean, rentDuration: number, showPurchaseArticle: boolean, status: string, articleAccessType: { __typename?: 'AccessType', accessType?: Types.AccessTypeEnum | null | undefined, institution_name?: string | null | undefined, institution_id?: string | null | undefined, shouldRequestInstVerification?: string | null | undefined, viaTemporaryIp?: boolean | null | undefined, isTrial?: boolean | null | undefined, subscriptionExpiresAt?: any | null | undefined, expiry?: any | null | undefined, requireLogin?: boolean | null | undefined, customInstitutionName?: string | null | undefined } } | null | undefined, getPurchaseAndRentPrices: Array<{ __typename?: 'StripePrice', _id: string, product: string, priceId: string, unit_amount: number, countryCode?: Types.CountryEnum | null | undefined }>, user?: { __typename?: 'User', isTrialsFeatureEnabled: boolean, trialDuration?: number | null | undefined, trialsAllowed: boolean } | null | undefined };

export type ShowFeedbackModalQueryVariables = Types.Exact<{
  anon_link_id: Types.Scalars['String'];
}>;


export type ShowFeedbackModalQuery = { __typename?: 'Query', feedbackAccesses: Array<Types.AccessTypeEnum>, result: { __typename?: 'ShowFeedbackModalOutput', show: boolean, showNextAt: number } };


export const ArticleAccessDocument = gql`
    query ArticleAccess($publication_id: String!) {
  article: articleBySlug(publication_id: $publication_id) {
    articleAccessType {
      accessType
      institution_name
      institution_id
      shouldRequestInstVerification
      viaTemporaryIp
      isTrial
      subscriptionExpiresAt
      expiry
      requireLogin
      customInstitutionName
    }
    _id
    title
    publication_id
    showRentArticle
    rentDuration
    showPurchaseArticle
    status
  }
  getPurchaseAndRentPrices {
    _id
    product
    priceId
    unit_amount
    countryCode
  }
  user {
    isTrialsFeatureEnabled
    trialDuration
    trialsAllowed
  }
  getIsRequestInstSubButtonPaperOn
  getTypesWithAccess
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
export const ShowFeedbackModalDocument = gql`
    query ShowFeedbackModal($anon_link_id: String!) {
  result: showFeedbackModal(anon_link_id: $anon_link_id) {
    show
    showNextAt
  }
  feedbackAccesses: getFeedbackModalAccessTypes
}
    `;

/**
 * __useShowFeedbackModalQuery__
 *
 * To run a query within a React component, call `useShowFeedbackModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowFeedbackModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowFeedbackModalQuery({
 *   variables: {
 *      anon_link_id: // value for 'anon_link_id'
 *   },
 * });
 */
export function useShowFeedbackModalQuery(baseOptions: Apollo.QueryHookOptions<ShowFeedbackModalQuery, ShowFeedbackModalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowFeedbackModalQuery, ShowFeedbackModalQueryVariables>(ShowFeedbackModalDocument, options);
      }
export function useShowFeedbackModalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowFeedbackModalQuery, ShowFeedbackModalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowFeedbackModalQuery, ShowFeedbackModalQueryVariables>(ShowFeedbackModalDocument, options);
        }
export type ShowFeedbackModalQueryHookResult = ReturnType<typeof useShowFeedbackModalQuery>;
export type ShowFeedbackModalLazyQueryHookResult = ReturnType<typeof useShowFeedbackModalLazyQuery>;
export type ShowFeedbackModalQueryResult = Apollo.QueryResult<ShowFeedbackModalQuery, ShowFeedbackModalQueryVariables>;