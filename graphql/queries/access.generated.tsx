import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InstitutionsAccessListQueryVariables = Types.Exact<{
  input: Types.InstitutionInput;
}>;


export type InstitutionsAccessListQuery = { __typename?: 'Query', output: { __typename?: 'InstitutionOutput', count: number, institutions: Array<{ __typename?: 'Institution', _id: string, name: string, user_count: number, total_article_count: number, pending_requests?: number | null, sent_requests: number, created?: any | null, subscription: { __typename?: 'InstitutionSubscription', status?: Types.StatusType | null }, articleViewsOverTime: { __typename?: 'ChartData', labels: Array<string>, datasets: Array<{ __typename?: 'ChartDataset', data: Array<number>, label: string }> } }> } };

export type AccessEventsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.AccessFilterInput>;
}>;


export type AccessEventsQuery = { __typename?: 'Query', output: { __typename?: 'AccessEventsOutput', count: number, events: Array<{ __typename?: 'Access', activity: Types.ActivityType, user_id?: string | null, article_title?: string | null, article_publication_id?: string | null, created: any, ip_address_str?: string | null, matchedBy?: Types.MatchedBy | null, accessType?: Types.AccessTypeEnum | null, time_watched?: number | null, referredFrom?: string | null, referrerPath?: string | null, user?: { __typename?: 'User', display_name?: string | null, email: string, referer?: string | null, referrerPath?: string | null } | null, geolocation?: { __typename?: 'GeoLocation', countryCode?: string | null, regionName?: string | null } | null, institution?: { __typename?: 'Institution', _id: string, name: string } | null }> } };

export type InstutionAccessOverviewQueryVariables = Types.Exact<{
  input: Types.InstitutionAccessInput;
}>;


export type InstutionAccessOverviewQuery = { __typename?: 'Query', institutionAccessStats: { __typename?: 'InstitutionAccessStats', users: number, activeUsers: number, totalLogins: number, totalArticleViews: number, anonymousArticleViews: number, articleViewsByUser: number, videoBlocks: number, uniqueVideoBlocks: number, anonUserCount: number }, institutionUserTypesStats: Array<{ __typename?: 'InstitutionUserTypeStat', user_type: string, count: number }> };

export type InstitutionTrafficOverTimeQueryVariables = Types.Exact<{
  input: Types.InstitutionAccessInput;
  groupBy: Types.Scalars['String']['input'];
}>;


export type InstitutionTrafficOverTimeQuery = { __typename?: 'Query', institutionTrafficOverTime: { __typename?: 'ChartData', labels: Array<string>, datasets: Array<{ __typename?: 'ChartDataset', data: Array<number>, label: string }> } };

export type InstitutionUsersOverTimeQueryVariables = Types.Exact<{
  input: Types.InstitutionAccessInput;
  groupBy: Types.Scalars['String']['input'];
}>;


export type InstitutionUsersOverTimeQuery = { __typename?: 'Query', institutionUsersOverTime: { __typename?: 'ChartData', labels: Array<string>, datasets: Array<{ __typename?: 'ChartDataset', data: Array<number>, label: string }> } };

export type InstitutionTrafficOverTimeByUserTypeQueryVariables = Types.Exact<{
  input: Types.InstitutionAccessInput;
  groupBy: Types.Scalars['String']['input'];
}>;


export type InstitutionTrafficOverTimeByUserTypeQuery = { __typename?: 'Query', traffic: { __typename?: 'ChartData', labels: Array<string>, datasets: Array<{ __typename?: 'ChartDataset', data: Array<number>, label: string }> }, users: { __typename?: 'ChartData', labels: Array<string>, datasets: Array<{ __typename?: 'ChartDataset', data: Array<number>, label: string }> } };

export type InstitutionTrafficBreakdownQueryVariables = Types.Exact<{
  input: Types.InstitutionAccessInput;
}>;


export type InstitutionTrafficBreakdownQuery = { __typename?: 'Query', byUserType: { __typename?: 'ChartData', labels: Array<string>, datasets: Array<{ __typename?: 'ChartDataset', data: Array<number>, label: string }> }, userCountByUserType: { __typename?: 'ChartData', labels: Array<string>, datasets: Array<{ __typename?: 'ChartDataset', data: Array<number>, label: string }> }, byContentType: { __typename?: 'ChartData', labels: Array<string>, datasets: Array<{ __typename?: 'ChartDataset', data: Array<number>, label: string }> }, userCountByContentType: { __typename?: 'ChartData', labels: Array<string>, datasets: Array<{ __typename?: 'ChartDataset', data: Array<number>, label: string }> } };

export type ArticleActivityStatsQueryVariables = Types.Exact<{
  input: Types.AccessFilterInput;
}>;


export type ArticleActivityStatsQuery = { __typename?: 'Query', articleAccessStats: { __typename?: 'InstitutionArticleStatsOutput', totalCount: number, items: Array<{ __typename?: 'InstitutionArticleStats', _id: string, articleViews: number, uniqueViews: number, article?: { __typename?: 'Article', title: string, publication_id?: string | null, slug?: string | null, status: string } | null }> } };

export type InstArticleEventLogsQueryVariables = Types.Exact<{
  input: Types.AccessFilterInput;
}>;


export type InstArticleEventLogsQuery = { __typename?: 'Query', output: { __typename?: 'AccessEventsOutput', count: number, events: Array<{ __typename?: 'Access', activity: Types.ActivityType, user_id?: string | null, article_title?: string | null, article_publication_id?: string | null, created: any, ip_address_str?: string | null, time_watched?: number | null, user?: { __typename?: 'User', display_name?: string | null, email: string } | null, geolocation?: { __typename?: 'GeoLocation', countryCode?: string | null, regionName?: string | null } | null, institution?: { __typename?: 'Institution', name: string } | null }> } };

export type GenCounterReportQueryVariables = Types.Exact<{
  input: Types.CounterInput;
}>;


export type GenCounterReportQuery = { __typename?: 'Query', genCounterReport: string };

export type InstFeedbackListQueryVariables = Types.Exact<{
  institution_id: Types.Scalars['String']['input'];
  input: Types.FeedbackListInput;
}>;


export type InstFeedbackListQuery = { __typename?: 'Query', output: { __typename?: 'FeedbackListOutput', count: number, items: Array<{ __typename?: 'Feedback', _id: string, type: string, questionId: string, value: any, comment?: string | null, anon_link_id?: string | null, createdAt: any, updatedAt?: any | null, question?: { __typename?: 'FeedbackQuestion', question: string, choices?: Array<{ __typename?: 'Choice', value: number }> | null } | null, user?: { __typename?: 'User', email: string, user_type?: string | null, _id: string } | null }> } };

export type CheckFrequentArticleViewsDataQueryVariables = Types.Exact<{
  institution_id: Types.Scalars['String']['input'];
}>;


export type CheckFrequentArticleViewsDataQuery = { __typename?: 'Query', result: number };

export type CleanUpFrequentArticleViewsDataMutationVariables = Types.Exact<{
  institution_id: Types.Scalars['String']['input'];
}>;


export type CleanUpFrequentArticleViewsDataMutation = { __typename?: 'Mutation', result: string };


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
      articleViewsOverTime {
        datasets {
          data
          label
        }
        labels
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
        _id
        name
      }
      matchedBy
      accessType
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
    videoBlocks
    uniqueVideoBlocks
    anonUserCount
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
    datasets {
      data
      label
    }
    labels
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
export const InstitutionUsersOverTimeDocument = gql`
    query InstitutionUsersOverTime($input: InstitutionAccessInput!, $groupBy: String!) {
  institutionUsersOverTime(input: $input, groupBy: $groupBy) {
    datasets {
      data
      label
    }
    labels
  }
}
    `;

/**
 * __useInstitutionUsersOverTimeQuery__
 *
 * To run a query within a React component, call `useInstitutionUsersOverTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionUsersOverTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionUsersOverTimeQuery({
 *   variables: {
 *      input: // value for 'input'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useInstitutionUsersOverTimeQuery(baseOptions: Apollo.QueryHookOptions<InstitutionUsersOverTimeQuery, InstitutionUsersOverTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstitutionUsersOverTimeQuery, InstitutionUsersOverTimeQueryVariables>(InstitutionUsersOverTimeDocument, options);
      }
export function useInstitutionUsersOverTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstitutionUsersOverTimeQuery, InstitutionUsersOverTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstitutionUsersOverTimeQuery, InstitutionUsersOverTimeQueryVariables>(InstitutionUsersOverTimeDocument, options);
        }
export type InstitutionUsersOverTimeQueryHookResult = ReturnType<typeof useInstitutionUsersOverTimeQuery>;
export type InstitutionUsersOverTimeLazyQueryHookResult = ReturnType<typeof useInstitutionUsersOverTimeLazyQuery>;
export type InstitutionUsersOverTimeQueryResult = Apollo.QueryResult<InstitutionUsersOverTimeQuery, InstitutionUsersOverTimeQueryVariables>;
export const InstitutionTrafficOverTimeByUserTypeDocument = gql`
    query InstitutionTrafficOverTimeByUserType($input: InstitutionAccessInput!, $groupBy: String!) {
  traffic: institutionTrafficOverTimeByUserType(input: $input, groupBy: $groupBy) {
    datasets {
      data
      label
    }
    labels
  }
  users: institutionUsersOverTimeByUserType(input: $input, groupBy: $groupBy) {
    datasets {
      data
      label
    }
    labels
  }
}
    `;

/**
 * __useInstitutionTrafficOverTimeByUserTypeQuery__
 *
 * To run a query within a React component, call `useInstitutionTrafficOverTimeByUserTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionTrafficOverTimeByUserTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionTrafficOverTimeByUserTypeQuery({
 *   variables: {
 *      input: // value for 'input'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useInstitutionTrafficOverTimeByUserTypeQuery(baseOptions: Apollo.QueryHookOptions<InstitutionTrafficOverTimeByUserTypeQuery, InstitutionTrafficOverTimeByUserTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstitutionTrafficOverTimeByUserTypeQuery, InstitutionTrafficOverTimeByUserTypeQueryVariables>(InstitutionTrafficOverTimeByUserTypeDocument, options);
      }
export function useInstitutionTrafficOverTimeByUserTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstitutionTrafficOverTimeByUserTypeQuery, InstitutionTrafficOverTimeByUserTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstitutionTrafficOverTimeByUserTypeQuery, InstitutionTrafficOverTimeByUserTypeQueryVariables>(InstitutionTrafficOverTimeByUserTypeDocument, options);
        }
export type InstitutionTrafficOverTimeByUserTypeQueryHookResult = ReturnType<typeof useInstitutionTrafficOverTimeByUserTypeQuery>;
export type InstitutionTrafficOverTimeByUserTypeLazyQueryHookResult = ReturnType<typeof useInstitutionTrafficOverTimeByUserTypeLazyQuery>;
export type InstitutionTrafficOverTimeByUserTypeQueryResult = Apollo.QueryResult<InstitutionTrafficOverTimeByUserTypeQuery, InstitutionTrafficOverTimeByUserTypeQueryVariables>;
export const InstitutionTrafficBreakdownDocument = gql`
    query InstitutionTrafficBreakdown($input: InstitutionAccessInput!) {
  byUserType: institutionTrafficBreakdownByUserType(input: $input) {
    datasets {
      data
      label
    }
    labels
  }
  userCountByUserType: institutionUserCountBreakdownByUserType(input: $input) {
    datasets {
      data
      label
    }
    labels
  }
  byContentType: institutionTrafficBreakdownByContentType(input: $input) {
    datasets {
      data
      label
    }
    labels
  }
  userCountByContentType: institutionUserCountBreakdownByContentType(
    input: $input
  ) {
    datasets {
      data
      label
    }
    labels
  }
}
    `;

/**
 * __useInstitutionTrafficBreakdownQuery__
 *
 * To run a query within a React component, call `useInstitutionTrafficBreakdownQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionTrafficBreakdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionTrafficBreakdownQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInstitutionTrafficBreakdownQuery(baseOptions: Apollo.QueryHookOptions<InstitutionTrafficBreakdownQuery, InstitutionTrafficBreakdownQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstitutionTrafficBreakdownQuery, InstitutionTrafficBreakdownQueryVariables>(InstitutionTrafficBreakdownDocument, options);
      }
export function useInstitutionTrafficBreakdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstitutionTrafficBreakdownQuery, InstitutionTrafficBreakdownQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstitutionTrafficBreakdownQuery, InstitutionTrafficBreakdownQueryVariables>(InstitutionTrafficBreakdownDocument, options);
        }
export type InstitutionTrafficBreakdownQueryHookResult = ReturnType<typeof useInstitutionTrafficBreakdownQuery>;
export type InstitutionTrafficBreakdownLazyQueryHookResult = ReturnType<typeof useInstitutionTrafficBreakdownLazyQuery>;
export type InstitutionTrafficBreakdownQueryResult = Apollo.QueryResult<InstitutionTrafficBreakdownQuery, InstitutionTrafficBreakdownQueryVariables>;
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
export const InstFeedbackListDocument = gql`
    query InstFeedbackList($institution_id: String!, $input: FeedbackListInput!) {
  output: getFeedbacksByInstitutionId(
    institution_id: $institution_id
    input: $input
  ) {
    items {
      _id
      type
      questionId
      question {
        question
        choices {
          value
        }
      }
      value
      comment
      user {
        email
        user_type
        _id
      }
      anon_link_id
      createdAt
      updatedAt
    }
    count
  }
}
    `;

/**
 * __useInstFeedbackListQuery__
 *
 * To run a query within a React component, call `useInstFeedbackListQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstFeedbackListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstFeedbackListQuery({
 *   variables: {
 *      institution_id: // value for 'institution_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInstFeedbackListQuery(baseOptions: Apollo.QueryHookOptions<InstFeedbackListQuery, InstFeedbackListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstFeedbackListQuery, InstFeedbackListQueryVariables>(InstFeedbackListDocument, options);
      }
export function useInstFeedbackListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstFeedbackListQuery, InstFeedbackListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstFeedbackListQuery, InstFeedbackListQueryVariables>(InstFeedbackListDocument, options);
        }
export type InstFeedbackListQueryHookResult = ReturnType<typeof useInstFeedbackListQuery>;
export type InstFeedbackListLazyQueryHookResult = ReturnType<typeof useInstFeedbackListLazyQuery>;
export type InstFeedbackListQueryResult = Apollo.QueryResult<InstFeedbackListQuery, InstFeedbackListQueryVariables>;
export const CheckFrequentArticleViewsDataDocument = gql`
    query CheckFrequentArticleViewsData($institution_id: String!) {
  result: checkFrequentArticleViews(institution_id: $institution_id)
}
    `;

/**
 * __useCheckFrequentArticleViewsDataQuery__
 *
 * To run a query within a React component, call `useCheckFrequentArticleViewsDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckFrequentArticleViewsDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckFrequentArticleViewsDataQuery({
 *   variables: {
 *      institution_id: // value for 'institution_id'
 *   },
 * });
 */
export function useCheckFrequentArticleViewsDataQuery(baseOptions: Apollo.QueryHookOptions<CheckFrequentArticleViewsDataQuery, CheckFrequentArticleViewsDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckFrequentArticleViewsDataQuery, CheckFrequentArticleViewsDataQueryVariables>(CheckFrequentArticleViewsDataDocument, options);
      }
export function useCheckFrequentArticleViewsDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckFrequentArticleViewsDataQuery, CheckFrequentArticleViewsDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckFrequentArticleViewsDataQuery, CheckFrequentArticleViewsDataQueryVariables>(CheckFrequentArticleViewsDataDocument, options);
        }
export type CheckFrequentArticleViewsDataQueryHookResult = ReturnType<typeof useCheckFrequentArticleViewsDataQuery>;
export type CheckFrequentArticleViewsDataLazyQueryHookResult = ReturnType<typeof useCheckFrequentArticleViewsDataLazyQuery>;
export type CheckFrequentArticleViewsDataQueryResult = Apollo.QueryResult<CheckFrequentArticleViewsDataQuery, CheckFrequentArticleViewsDataQueryVariables>;
export const CleanUpFrequentArticleViewsDataDocument = gql`
    mutation CleanUpFrequentArticleViewsData($institution_id: String!) {
  result: cleanUpFrequentArticleViews(institution_id: $institution_id)
}
    `;
export type CleanUpFrequentArticleViewsDataMutationFn = Apollo.MutationFunction<CleanUpFrequentArticleViewsDataMutation, CleanUpFrequentArticleViewsDataMutationVariables>;

/**
 * __useCleanUpFrequentArticleViewsDataMutation__
 *
 * To run a mutation, you first call `useCleanUpFrequentArticleViewsDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCleanUpFrequentArticleViewsDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cleanUpFrequentArticleViewsDataMutation, { data, loading, error }] = useCleanUpFrequentArticleViewsDataMutation({
 *   variables: {
 *      institution_id: // value for 'institution_id'
 *   },
 * });
 */
export function useCleanUpFrequentArticleViewsDataMutation(baseOptions?: Apollo.MutationHookOptions<CleanUpFrequentArticleViewsDataMutation, CleanUpFrequentArticleViewsDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CleanUpFrequentArticleViewsDataMutation, CleanUpFrequentArticleViewsDataMutationVariables>(CleanUpFrequentArticleViewsDataDocument, options);
      }
export type CleanUpFrequentArticleViewsDataMutationHookResult = ReturnType<typeof useCleanUpFrequentArticleViewsDataMutation>;
export type CleanUpFrequentArticleViewsDataMutationResult = Apollo.MutationResult<CleanUpFrequentArticleViewsDataMutation>;
export type CleanUpFrequentArticleViewsDataMutationOptions = Apollo.BaseMutationOptions<CleanUpFrequentArticleViewsDataMutation, CleanUpFrequentArticleViewsDataMutationVariables>;