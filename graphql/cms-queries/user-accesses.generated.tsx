import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AccessesByUserIdQueryVariables = Types.Exact<{
  input: Types.AccessesByUserIdInput;
}>;


export type AccessesByUserIdQuery = { __typename?: 'Query', accessesByUserId?: { __typename?: 'AccessEventsOutput', count: number, events: Array<{ __typename?: 'Access', created: any, article_title?: string | null, activity: Types.ActivityType, ip_address_str?: string | null, time_watched?: number | null, user_agent?: string | null, block_type?: string | null, accessType?: Types.AccessTypeEnum | null, matchedBy?: Types.MatchedBy | null, orderId?: string | null, institution?: { __typename?: 'Institution', _id: string, name: string } | null }> } | null };


export const AccessesByUserIdDocument = gql`
    query AccessesByUserId($input: AccessesByUserIdInput!) {
  accessesByUserId(input: $input) {
    events {
      created
      article_title
      activity
      ip_address_str
      time_watched
      user_agent
      block_type
      accessType
      matchedBy
      institution {
        _id
        name
      }
      orderId
    }
    count
  }
}
    `;

/**
 * __useAccessesByUserIdQuery__
 *
 * To run a query within a React component, call `useAccessesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessesByUserIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccessesByUserIdQuery(baseOptions: Apollo.QueryHookOptions<AccessesByUserIdQuery, AccessesByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccessesByUserIdQuery, AccessesByUserIdQueryVariables>(AccessesByUserIdDocument, options);
      }
export function useAccessesByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessesByUserIdQuery, AccessesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccessesByUserIdQuery, AccessesByUserIdQueryVariables>(AccessesByUserIdDocument, options);
        }
export type AccessesByUserIdQueryHookResult = ReturnType<typeof useAccessesByUserIdQuery>;
export type AccessesByUserIdLazyQueryHookResult = ReturnType<typeof useAccessesByUserIdLazyQuery>;
export type AccessesByUserIdQueryResult = Apollo.QueryResult<AccessesByUserIdQuery, AccessesByUserIdQueryVariables>;