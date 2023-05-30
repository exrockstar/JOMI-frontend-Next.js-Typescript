import * as Types from '../types';

import { gql } from '@apollo/client';
import { InstitutionPartsFragmentDoc } from './InstitutionParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type InstitutionsListQueryVariables = Types.Exact<{
  input: Types.InstitutionInput;
}>;


export type InstitutionsListQuery = { __typename?: 'Query', institutions: { __typename?: 'InstitutionOutput', dbQueryString: string, count: number, institutions: Array<{ __typename?: 'Institution', _id: string, name: string, category?: string | null | undefined, total_article_count: number, user_count: number, created?: any | null | undefined, expiry_date_cached?: any | null | undefined, pending_requests?: number | null | undefined, sent_requests: number, total_requests?: number | null | undefined, subscription: { __typename?: 'InstitutionSubscription', status?: Types.StatusType | null | undefined, expiredOrderStatus?: Types.OrderType | null | undefined } }> } };

export type InstitutionByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type InstitutionByIdQuery = { __typename?: 'Query', institution?: { __typename?: 'Institution', _id: string, created?: any | null | undefined, updated?: any | null | undefined, name: string, aliases: Array<string>, domains: Array<string>, urlLink?: string | null | undefined, category?: string | null | undefined, subscriber_display_name?: string | null | undefined, show_on_subscribers_page?: boolean | null | undefined, restrictMatchByName?: boolean | null | undefined, notes?: string | null | undefined, subscription: { __typename?: 'InstitutionSubscription', status?: Types.StatusType | null | undefined, last_checked?: string | null | undefined, order?: string | null | undefined }, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, notes?: string | null | undefined, isMainContact?: boolean | null | undefined }> | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined, geometry?: { __typename?: 'Geometry', width: number, height: number } | null | undefined } | null | undefined, locations: Array<{ __typename?: 'Location', _id: string, created?: any | null | undefined, updated?: any | null | undefined, title: string, comment?: string | null | undefined, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, currency?: Types.OrderCurrency | null | undefined, type: Types.OrderType, created: any, updated: any, lastEditedBy?: string | null | undefined, createdBy?: string | null | undefined, status?: Types.OrderStatus | null | undefined, amount?: number | null | undefined, require_login?: Types.RequireLogin | null | undefined, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null | undefined }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null | undefined, updated?: any | null | undefined, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null | undefined }> }>, accessSettings: { __typename?: 'AccessSettings', displayTrafficGraph: boolean } } | null | undefined };

export type InstitutionSearchQueryVariables = Types.Exact<{
  input: Types.InstitutionInput;
}>;


export type InstitutionSearchQuery = { __typename?: 'Query', institutions: { __typename?: 'InstitutionOutput', count: number, institutions: Array<{ __typename?: 'Institution', value: string, label: string }> } };


export const InstitutionsListDocument = gql`
    query InstitutionsList($input: InstitutionInput!) {
  institutions(input: $input) {
    institutions {
      _id
      name
      category
      total_article_count
      user_count
      created
      expiry_date_cached
      subscription {
        status
        expiredOrderStatus
      }
      pending_requests
      sent_requests
      total_requests
    }
    dbQueryString
    count
  }
}
    `;

/**
 * __useInstitutionsListQuery__
 *
 * To run a query within a React component, call `useInstitutionsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionsListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInstitutionsListQuery(baseOptions: Apollo.QueryHookOptions<InstitutionsListQuery, InstitutionsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstitutionsListQuery, InstitutionsListQueryVariables>(InstitutionsListDocument, options);
      }
export function useInstitutionsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstitutionsListQuery, InstitutionsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstitutionsListQuery, InstitutionsListQueryVariables>(InstitutionsListDocument, options);
        }
export type InstitutionsListQueryHookResult = ReturnType<typeof useInstitutionsListQuery>;
export type InstitutionsListLazyQueryHookResult = ReturnType<typeof useInstitutionsListLazyQuery>;
export type InstitutionsListQueryResult = Apollo.QueryResult<InstitutionsListQuery, InstitutionsListQueryVariables>;
export const InstitutionByIdDocument = gql`
    query InstitutionById($id: String!) {
  institution: institutionById(id: $id) {
    ...InstitutionParts
  }
}
    ${InstitutionPartsFragmentDoc}`;

/**
 * __useInstitutionByIdQuery__
 *
 * To run a query within a React component, call `useInstitutionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInstitutionByIdQuery(baseOptions: Apollo.QueryHookOptions<InstitutionByIdQuery, InstitutionByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstitutionByIdQuery, InstitutionByIdQueryVariables>(InstitutionByIdDocument, options);
      }
export function useInstitutionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstitutionByIdQuery, InstitutionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstitutionByIdQuery, InstitutionByIdQueryVariables>(InstitutionByIdDocument, options);
        }
export type InstitutionByIdQueryHookResult = ReturnType<typeof useInstitutionByIdQuery>;
export type InstitutionByIdLazyQueryHookResult = ReturnType<typeof useInstitutionByIdLazyQuery>;
export type InstitutionByIdQueryResult = Apollo.QueryResult<InstitutionByIdQuery, InstitutionByIdQueryVariables>;
export const InstitutionSearchDocument = gql`
    query InstitutionSearch($input: InstitutionInput!) {
  institutions(input: $input) {
    institutions {
      value: _id
      label: name
    }
    count
  }
}
    `;

/**
 * __useInstitutionSearchQuery__
 *
 * To run a query within a React component, call `useInstitutionSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInstitutionSearchQuery(baseOptions: Apollo.QueryHookOptions<InstitutionSearchQuery, InstitutionSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstitutionSearchQuery, InstitutionSearchQueryVariables>(InstitutionSearchDocument, options);
      }
export function useInstitutionSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstitutionSearchQuery, InstitutionSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstitutionSearchQuery, InstitutionSearchQueryVariables>(InstitutionSearchDocument, options);
        }
export type InstitutionSearchQueryHookResult = ReturnType<typeof useInstitutionSearchQuery>;
export type InstitutionSearchLazyQueryHookResult = ReturnType<typeof useInstitutionSearchLazyQuery>;
export type InstitutionSearchQueryResult = Apollo.QueryResult<InstitutionSearchQuery, InstitutionSearchQueryVariables>;