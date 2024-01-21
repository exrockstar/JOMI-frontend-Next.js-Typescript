import * as Types from '../types';

import { gql } from '@apollo/client';
import { InstitutionPartsFragmentDoc } from './InstitutionParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InstitutionsListQueryVariables = Types.Exact<{
  input: Types.InstitutionInput;
}>;


export type InstitutionsListQuery = { __typename?: 'Query', institutions: { __typename?: 'InstitutionOutput', dbQueryString: string, count: number, institutions: Array<{ __typename?: 'Institution', _id: string, name: string, category?: string | null, total_article_count: number, user_count: number, created?: any | null, expiry_date_cached?: any | null, pending_requests?: number | null, sent_requests: number, total_requests?: number | null, subscription: { __typename?: 'InstitutionSubscription', status?: Types.StatusType | null, expiredOrderStatus?: Types.OrderType | null }, stats?: { __typename?: 'InstitutionStats', videoBlocks?: number | null, uniqueVideoBlocks?: number | null } | null }> } };

export type InstitutionByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type InstitutionByIdQuery = { __typename?: 'Query', institution?: { __typename?: 'Institution', _id: string, created?: any | null, updated?: any | null, name: string, aliases: Array<string>, domains: Array<string>, urlLink?: string | null, category?: string | null, subscriber_display_name?: string | null, show_on_subscribers_page?: boolean | null, restrictMatchByName?: boolean | null, notes?: string | null, subscription: { __typename?: 'InstitutionSubscription', status?: Types.StatusType | null, last_checked?: string | null, order?: string | null }, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, notes?: string | null, isMainContact?: boolean | null }> | null, image?: { __typename?: 'Image', filename?: string | null, geometry?: { __typename?: 'Geometry', width: number, height: number } | null } | null, locations: Array<{ __typename?: 'Location', _id: string, created?: any | null, updated?: any | null, title: string, comment?: string | null, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, plan_interval?: Types.OrderInterval | null, currency?: Types.OrderCurrency | null, type?: Types.OrderType | null, created: any, updated: any, lastEditedBy?: string | null, createdBy?: string | null, status?: Types.OrderStatus | null, amount?: number | null, require_login?: Types.RequireLogin | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null, notes?: string | null, customInstitutionName?: string | null }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null }> }>, accessSettings: { __typename?: 'AccessSettings', displayTrafficGraph: boolean } } | null };

export type InstitutionSearchQueryVariables = Types.Exact<{
  input: Types.InstitutionInput;
}>;


export type InstitutionSearchQuery = { __typename?: 'Query', institutions: { __typename?: 'InstitutionOutput', count: number, institutions: Array<{ __typename?: 'Institution', value: string, label: string }> } };

export type TransferInstitutionDataMutationVariables = Types.Exact<{
  input: Types.TransferInstDataInput;
}>;


export type TransferInstitutionDataMutation = { __typename?: 'Mutation', transferInstitutionData: string };

export type TransferDuplicateDomainsMutationVariables = Types.Exact<{
  input: Types.TransferDomainsInput;
}>;


export type TransferDuplicateDomainsMutation = { __typename?: 'Mutation', transferDuplicateDomains: string };


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
      stats {
        videoBlocks
        uniqueVideoBlocks
      }
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
export const TransferInstitutionDataDocument = gql`
    mutation TransferInstitutionData($input: TransferInstDataInput!) {
  transferInstitutionData(input: $input)
}
    `;
export type TransferInstitutionDataMutationFn = Apollo.MutationFunction<TransferInstitutionDataMutation, TransferInstitutionDataMutationVariables>;

/**
 * __useTransferInstitutionDataMutation__
 *
 * To run a mutation, you first call `useTransferInstitutionDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferInstitutionDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferInstitutionDataMutation, { data, loading, error }] = useTransferInstitutionDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTransferInstitutionDataMutation(baseOptions?: Apollo.MutationHookOptions<TransferInstitutionDataMutation, TransferInstitutionDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransferInstitutionDataMutation, TransferInstitutionDataMutationVariables>(TransferInstitutionDataDocument, options);
      }
export type TransferInstitutionDataMutationHookResult = ReturnType<typeof useTransferInstitutionDataMutation>;
export type TransferInstitutionDataMutationResult = Apollo.MutationResult<TransferInstitutionDataMutation>;
export type TransferInstitutionDataMutationOptions = Apollo.BaseMutationOptions<TransferInstitutionDataMutation, TransferInstitutionDataMutationVariables>;
export const TransferDuplicateDomainsDocument = gql`
    mutation TransferDuplicateDomains($input: TransferDomainsInput!) {
  transferDuplicateDomains(input: $input)
}
    `;
export type TransferDuplicateDomainsMutationFn = Apollo.MutationFunction<TransferDuplicateDomainsMutation, TransferDuplicateDomainsMutationVariables>;

/**
 * __useTransferDuplicateDomainsMutation__
 *
 * To run a mutation, you first call `useTransferDuplicateDomainsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferDuplicateDomainsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferDuplicateDomainsMutation, { data, loading, error }] = useTransferDuplicateDomainsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTransferDuplicateDomainsMutation(baseOptions?: Apollo.MutationHookOptions<TransferDuplicateDomainsMutation, TransferDuplicateDomainsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransferDuplicateDomainsMutation, TransferDuplicateDomainsMutationVariables>(TransferDuplicateDomainsDocument, options);
      }
export type TransferDuplicateDomainsMutationHookResult = ReturnType<typeof useTransferDuplicateDomainsMutation>;
export type TransferDuplicateDomainsMutationResult = Apollo.MutationResult<TransferDuplicateDomainsMutation>;
export type TransferDuplicateDomainsMutationOptions = Apollo.BaseMutationOptions<TransferDuplicateDomainsMutation, TransferDuplicateDomainsMutationVariables>;