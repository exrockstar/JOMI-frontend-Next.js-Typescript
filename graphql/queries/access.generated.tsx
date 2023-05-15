import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type InstitutionsAccessListQueryVariables = Types.Exact<{
  input: Types.InstitutionInput;
}>;


export type InstitutionsAccessListQuery = { __typename?: 'Query', output: { __typename?: 'InstitutionOutput', count: number, institutions: Array<{ __typename?: 'Institution', _id: string, name: string, user_count: number, total_article_count: number, pending_requests?: number | null | undefined, sent_requests: number, created?: any | null | undefined, subscription: { __typename?: 'InstitutionSubscription', status?: Types.StatusType | null | undefined } }> } };

export type AccessEventsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.AccessFilterInput>;
}>;


export type AccessEventsQuery = { __typename?: 'Query', output: { __typename?: 'AccessEventsOutput', count: number, events: Array<{ __typename?: 'Access', activity: Types.ActivityType, user_id?: string | null | undefined, article_title?: string | null | undefined, article_publication_id?: string | null | undefined, created: any, ip_address_str?: string | null | undefined, time_watched?: number | null | undefined, referredFrom?: string | null | undefined, referrerPath?: string | null | undefined, user?: { __typename?: 'User', display_name?: string | null | undefined, email: string, referer?: string | null | undefined, referrerPath?: string | null | undefined } | null | undefined, geolocation?: { __typename?: 'GeoLocation', countryCode?: string | null | undefined, regionName?: string | null | undefined } | null | undefined, institution?: { __typename?: 'Institution', name: string } | null | undefined }> } };

export type InstutionAccessOverviewQueryVariables = Types.Exact<{
  input: Types.InstitutionAccessInput;
}>;


export type InstutionAccessOverviewQuery = { __typename?: 'Query', institutionAccessStats: { __typename?: 'InstitutionAccessStats', users: number, activeUsers: number, totalLogins: number, totalArticleViews: number, anonymousArticleViews: number, articleViewsByUser: number }, institutionUserTypesStats: Array<{ __typename?: 'InstitutionUserTypeStat', user_type: string, count: number }> };

export type InstitutionTrafficOverTimeQueryVariables = Types.Exact<{
  input: Types.InstitutionAccessInput;
  groupBy: Types.Scalars['String'];
}>;


export type InstitutionTrafficOverTimeQuery = { __typename?: 'Query', institutionTrafficOverTime: Array<{ __typename?: 'InstitutionAccessTraffic', _id: string, count: number }> };

export type ArticleActivityStatsQueryVariables = Types.Exact<{
  input: Types.AccessFilterInput;
}>;


export type ArticleActivityStatsQuery = { __typename?: 'Query', articleAccessStats: { __typename?: 'InstitutionArticleStatsOutput', totalCount: number, items: Array<{ __typename?: 'InstitutionArticleStats', _id: string, articleViews: number, uniqueViews: number, article?: { __typename?: 'Article', title: string, publication_id?: string | null | undefined, slug?: string | null | undefined, status: string } | null | undefined }> } };

export type InstArticleEventLogsQueryVariables = Types.Exact<{
  input: Types.AccessFilterInput;
}>;


export type InstArticleEventLogsQuery = { __typename?: 'Query', output: { __typename?: 'AccessEventsOutput', count: number, events: Array<{ __typename?: 'Access', activity: Types.ActivityType, user_id?: string | null | undefined, article_title?: string | null | undefined, article_publication_id?: string | null | undefined, created: any, ip_address_str?: string | null | undefined, time_watched?: number | null | undefined, user?: { __typename?: 'User', display_name?: string | null | undefined, email: string } | null | undefined, geolocation?: { __typename?: 'GeoLocation', countryCode?: string | null | undefined, regionName?: string | null | undefined } | null | undefined, institution?: { __typename?: 'Institution', name: string } | null | undefined }> } };

export type GenCounterReportQueryVariables = Types.Exact<{
  input: Types.CounterInput;
}>;


export type GenCounterReportQuery = { __typename?: 'Query', genCounterReport: string };


export const InstitutionsAccessListDocument = gql`
    query InstitutionsAccessList($input: InstitutionInput!) {
  output: institutions(input: $input) {
    institutions {
      _id
      name
      user_count
      total_article_count
      pending_requests
      sent_requests
      created
      subscription {
        status
      }
    }
    count
  }
}
    `;

/**
 * __useInstitutionsAccessListQuery__
 *
 * To run a query within a React component, call `useInstitutionsAccessListQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionsAccessListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionsAccessListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInstitutionsAccessListQuery(baseOptions: Apollo.QueryHookOptions<InstitutionsAccessListQuery, InstitutionsAccessListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstitutionsAccessListQuery, InstitutionsAccessListQueryVariables>(InstitutionsAccessListDocument, options);
      }
export function useInstitutionsAccessListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstitutionsAccessListQuery, InstitutionsAccessListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstitutionsAccessListQuery, InstitutionsAccessListQueryVariables>(InstitutionsAccessListDocument, options);
        }
export type InstitutionsAccessListQueryHookResult = ReturnType<typeof useInstitutionsAccessListQuery>;
export type InstitutionsAccessListLazyQueryHookResult = ReturnType<typeof useInstitutionsAccessListLazyQuery>;
export type InstitutionsAccessListQueryResult = Apollo.QueryResult<InstitutionsAccessListQuery, InstitutionsAccessListQueryVariables>;
export const AccessEventsDocument = gql`
    query AccessEvents($input: AccessFilterInput) {
  output: accessEvents(input: $input) {
    events {
      activity
      user_id
      article_title
      article_publication_id
      created
      ip_address_str
      user {
        display_name
        email
        referer
        referrerPath
      }
      geolocation {
        countryCode
        regionName
      }
      institution {
        name
      }
      time_watched
      referredFrom
      referrerPath
    }
    count
  }
}
    `;

/**
 * __useAccessEventsQuery__
 *
 * To run a query within a React component, call `useAccessEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccessEventsQuery(baseOptions?: Apollo.QueryHookOptions<AccessEventsQuery, AccessEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccessEventsQuery, AccessEventsQueryVariables>(AccessEventsDocument, options);
      }
export function useAccessEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessEventsQuery, AccessEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccessEventsQuery, AccessEventsQueryVariables>(AccessEventsDocument, options);
        }
export type AccessEventsQueryHookResult = ReturnType<typeof useAccessEventsQuery>;
export type AccessEventsLazyQueryHookResult = ReturnType<typeof useAccessEventsLazyQuery>;
export type AccessEventsQueryResult = Apollo.QueryResult<AccessEventsQuery, AccessEventsQueryVariables>;
export const InstutionAccessOverviewDocument = gql`
    query InstutionAccessOverview($input: InstitutionAccessInput!) {
  institutionAccessStats(input: $input) {
    users
    activeUsers
    totalLogins
    totalArticleViews
    anonymousArticleViews
    articleViewsByUser
  }
  institutionUserTypesStats(input: $input) {
    user_type
    count
  }
}
    `;

/**
 * __useInstutionAccessOverviewQuery__
 *
 * To run a query within a React component, call `useInstutionAccessOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstutionAccessOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstutionAccessOverviewQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInstutionAccessOverviewQuery(baseOptions: Apollo.QueryHookOptions<InstutionAccessOverviewQuery, InstutionAccessOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstutionAccessOverviewQuery, InstutionAccessOverviewQueryVariables>(InstutionAccessOverviewDocument, options);
      }
export function useInstutionAccessOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstutionAccessOverviewQuery, InstutionAccessOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstutionAccessOverviewQuery, InstutionAccessOverviewQueryVariables>(InstutionAccessOverviewDocument, options);
        }
export type InstutionAccessOverviewQueryHookResult = ReturnType<typeof useInstutionAccessOverviewQuery>;
export type InstutionAccessOverviewLazyQueryHookResult = ReturnType<typeof useInstutionAccessOverviewLazyQuery>;
export type InstutionAccessOverviewQueryResult = Apollo.QueryResult<InstutionAccessOverviewQuery, InstutionAccessOverviewQueryVariables>;
export const InstitutionTrafficOverTimeDocument = gql`
    query InstitutionTrafficOverTime($input: InstitutionAccessInput!, $groupBy: String!) {
  institutionTrafficOverTime(input: $input, groupBy: $groupBy) {
    _id
    count
  }
}
    `;

/**
 * __useInstitutionTrafficOverTimeQuery__
 *
 * To run a query within a React component, call `useInstitutionTrafficOverTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionTrafficOverTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionTrafficOverTimeQuery({
 *   variables: {
 *      input: // value for 'input'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useInstitutionTrafficOverTimeQuery(baseOptions: Apollo.QueryHookOptions<InstitutionTrafficOverTimeQuery, InstitutionTrafficOverTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstitutionTrafficOverTimeQuery, InstitutionTrafficOverTimeQueryVariables>(InstitutionTrafficOverTimeDocument, options);
      }
export function useInstitutionTrafficOverTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstitutionTrafficOverTimeQuery, InstitutionTrafficOverTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstitutionTrafficOverTimeQuery, InstitutionTrafficOverTimeQueryVariables>(InstitutionTrafficOverTimeDocument, options);
        }
export type InstitutionTrafficOverTimeQueryHookResult = ReturnType<typeof useInstitutionTrafficOverTimeQuery>;
export type InstitutionTrafficOverTimeLazyQueryHookResult = ReturnType<typeof useInstitutionTrafficOverTimeLazyQuery>;
export type InstitutionTrafficOverTimeQueryResult = Apollo.QueryResult<InstitutionTrafficOverTimeQuery, InstitutionTrafficOverTimeQueryVariables>;
export const ArticleActivityStatsDocument = gql`
    query ArticleActivityStats($input: AccessFilterInput!) {
  articleAccessStats(input: $input) {
    items {
      _id
      articleViews
      uniqueViews
      article {
        title
        publication_id
        slug
        status
      }
    }
    totalCount
  }
}
    `;

/**
 * __useArticleActivityStatsQuery__
 *
 * To run a query within a React component, call `useArticleActivityStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleActivityStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleActivityStatsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleActivityStatsQuery(baseOptions: Apollo.QueryHookOptions<ArticleActivityStatsQuery, ArticleActivityStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleActivityStatsQuery, ArticleActivityStatsQueryVariables>(ArticleActivityStatsDocument, options);
      }
export function useArticleActivityStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleActivityStatsQuery, ArticleActivityStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleActivityStatsQuery, ArticleActivityStatsQueryVariables>(ArticleActivityStatsDocument, options);
        }
export type ArticleActivityStatsQueryHookResult = ReturnType<typeof useArticleActivityStatsQuery>;
export type ArticleActivityStatsLazyQueryHookResult = ReturnType<typeof useArticleActivityStatsLazyQuery>;
export type ArticleActivityStatsQueryResult = Apollo.QueryResult<ArticleActivityStatsQuery, ArticleActivityStatsQueryVariables>;
export const InstArticleEventLogsDocument = gql`
    query InstArticleEventLogs($input: AccessFilterInput!) {
  output: instArticleEventLogs(input: $input) {
    events {
      activity
      user_id
      article_title
      article_publication_id
      created
      ip_address_str
      user {
        display_name
        email
      }
      geolocation {
        countryCode
        regionName
      }
      institution {
        name
      }
      time_watched
    }
    count
  }
}
    `;

/**
 * __useInstArticleEventLogsQuery__
 *
 * To run a query within a React component, call `useInstArticleEventLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstArticleEventLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstArticleEventLogsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInstArticleEventLogsQuery(baseOptions: Apollo.QueryHookOptions<InstArticleEventLogsQuery, InstArticleEventLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstArticleEventLogsQuery, InstArticleEventLogsQueryVariables>(InstArticleEventLogsDocument, options);
      }
export function useInstArticleEventLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstArticleEventLogsQuery, InstArticleEventLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstArticleEventLogsQuery, InstArticleEventLogsQueryVariables>(InstArticleEventLogsDocument, options);
        }
export type InstArticleEventLogsQueryHookResult = ReturnType<typeof useInstArticleEventLogsQuery>;
export type InstArticleEventLogsLazyQueryHookResult = ReturnType<typeof useInstArticleEventLogsLazyQuery>;
export type InstArticleEventLogsQueryResult = Apollo.QueryResult<InstArticleEventLogsQuery, InstArticleEventLogsQueryVariables>;
export const GenCounterReportDocument = gql`
    query GenCounterReport($input: CounterInput!) {
  genCounterReport(input: $input)
}
    `;

/**
 * __useGenCounterReportQuery__
 *
 * To run a query within a React component, call `useGenCounterReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenCounterReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenCounterReportQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenCounterReportQuery(baseOptions: Apollo.QueryHookOptions<GenCounterReportQuery, GenCounterReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenCounterReportQuery, GenCounterReportQueryVariables>(GenCounterReportDocument, options);
      }
export function useGenCounterReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenCounterReportQuery, GenCounterReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenCounterReportQuery, GenCounterReportQueryVariables>(GenCounterReportDocument, options);
        }
export type GenCounterReportQueryHookResult = ReturnType<typeof useGenCounterReportQuery>;
export type GenCounterReportLazyQueryHookResult = ReturnType<typeof useGenCounterReportLazyQuery>;
export type GenCounterReportQueryResult = Apollo.QueryResult<GenCounterReportQuery, GenCounterReportQueryVariables>;