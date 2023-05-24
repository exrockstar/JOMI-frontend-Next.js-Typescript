import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AnnoucementForUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AnnoucementForUserQuery = { __typename?: 'Query', announcementForUser?: Array<{ __typename?: 'Announcement', _id: any, cache_id: string, backgroundColor?: string | null | undefined, content?: string | null | undefined, title?: string | null | undefined }> | null | undefined };

export type SiteWideAnnouncementsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SiteWideAnnouncementsQuery = { __typename?: 'Query', getSiteWideAnnouncements?: Array<{ __typename?: 'Announcement', _id: any, cache_id: string, backgroundColor?: string | null | undefined, content?: string | null | undefined, isPermanent?: boolean | null | undefined, type: Types.AnnouncementType }> | null | undefined };

export type MarkAnnouncementAsReadMutationVariables = Types.Exact<{
  cacheId: Types.Scalars['String'];
}>;


export type MarkAnnouncementAsReadMutation = { __typename?: 'Mutation', markAnnouncementAsRead: Array<string> };


export const AnnoucementForUserDocument = gql`
    query AnnoucementForUser {
  announcementForUser {
    _id
    cache_id
    backgroundColor
    content
    title
  }
}
    `;

/**
 * __useAnnoucementForUserQuery__
 *
 * To run a query within a React component, call `useAnnoucementForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnnoucementForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnnoucementForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAnnoucementForUserQuery(baseOptions?: Apollo.QueryHookOptions<AnnoucementForUserQuery, AnnoucementForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnnoucementForUserQuery, AnnoucementForUserQueryVariables>(AnnoucementForUserDocument, options);
      }
export function useAnnoucementForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnnoucementForUserQuery, AnnoucementForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnnoucementForUserQuery, AnnoucementForUserQueryVariables>(AnnoucementForUserDocument, options);
        }
export type AnnoucementForUserQueryHookResult = ReturnType<typeof useAnnoucementForUserQuery>;
export type AnnoucementForUserLazyQueryHookResult = ReturnType<typeof useAnnoucementForUserLazyQuery>;
export type AnnoucementForUserQueryResult = Apollo.QueryResult<AnnoucementForUserQuery, AnnoucementForUserQueryVariables>;
export const SiteWideAnnouncementsDocument = gql`
    query SiteWideAnnouncements {
  getSiteWideAnnouncements {
    _id
    cache_id
    backgroundColor
    content
    isPermanent
    type
  }
}
    `;

/**
 * __useSiteWideAnnouncementsQuery__
 *
 * To run a query within a React component, call `useSiteWideAnnouncementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSiteWideAnnouncementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSiteWideAnnouncementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSiteWideAnnouncementsQuery(baseOptions?: Apollo.QueryHookOptions<SiteWideAnnouncementsQuery, SiteWideAnnouncementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SiteWideAnnouncementsQuery, SiteWideAnnouncementsQueryVariables>(SiteWideAnnouncementsDocument, options);
      }
export function useSiteWideAnnouncementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SiteWideAnnouncementsQuery, SiteWideAnnouncementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SiteWideAnnouncementsQuery, SiteWideAnnouncementsQueryVariables>(SiteWideAnnouncementsDocument, options);
        }
export type SiteWideAnnouncementsQueryHookResult = ReturnType<typeof useSiteWideAnnouncementsQuery>;
export type SiteWideAnnouncementsLazyQueryHookResult = ReturnType<typeof useSiteWideAnnouncementsLazyQuery>;
export type SiteWideAnnouncementsQueryResult = Apollo.QueryResult<SiteWideAnnouncementsQuery, SiteWideAnnouncementsQueryVariables>;
export const MarkAnnouncementAsReadDocument = gql`
    mutation MarkAnnouncementAsRead($cacheId: String!) {
  markAnnouncementAsRead(cacheId: $cacheId)
}
    `;
export type MarkAnnouncementAsReadMutationFn = Apollo.MutationFunction<MarkAnnouncementAsReadMutation, MarkAnnouncementAsReadMutationVariables>;

/**
 * __useMarkAnnouncementAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAnnouncementAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAnnouncementAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAnnouncementAsReadMutation, { data, loading, error }] = useMarkAnnouncementAsReadMutation({
 *   variables: {
 *      cacheId: // value for 'cacheId'
 *   },
 * });
 */
export function useMarkAnnouncementAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAnnouncementAsReadMutation, MarkAnnouncementAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAnnouncementAsReadMutation, MarkAnnouncementAsReadMutationVariables>(MarkAnnouncementAsReadDocument, options);
      }
export type MarkAnnouncementAsReadMutationHookResult = ReturnType<typeof useMarkAnnouncementAsReadMutation>;
export type MarkAnnouncementAsReadMutationResult = Apollo.MutationResult<MarkAnnouncementAsReadMutation>;
export type MarkAnnouncementAsReadMutationOptions = Apollo.BaseMutationOptions<MarkAnnouncementAsReadMutation, MarkAnnouncementAsReadMutationVariables>;