import * as Types from '../types';

import { gql } from '@apollo/client';
import { AnnouncementPartsFragmentDoc, AnnouncementViewsFragmentDoc } from '../fragments/AnnouncementParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AnnoucementForUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AnnoucementForUserQuery = { __typename?: 'Query', announcementForUser?: Array<{ __typename?: 'Announcement', _id: any, lastEditedBy?: string | null | undefined, isPermanent?: boolean | null | undefined, limit?: number | null | undefined, cache_id: any, enabled: boolean, createdAt: any, updatedAt: any, type: Types.AnnouncementType, backgroundColor?: string | null | undefined, title?: string | null | undefined, content?: string | null | undefined, author?: { __typename?: 'User', _id: string, display_name?: string | null | undefined } | null | undefined }> | null | undefined };


export const AnnoucementForUserDocument = gql`
    query AnnoucementForUser {
  announcementForUser {
    ...AnnouncementParts
  }
}
    ${AnnouncementPartsFragmentDoc}`;

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