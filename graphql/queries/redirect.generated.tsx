import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RedirectQueryVariables = Types.Exact<{
  from: Types.Scalars['String']['input'];
}>;


export type RedirectQuery = { __typename?: 'Query', redirectFor?: { __typename?: 'Redirect', from: string, to: string, type: string } | null };


export const RedirectDocument = gql`
    query Redirect($from: String!) {
  redirectFor(from: $from) {
    from
    to
    type
  }
}
    `;

/**
 * __useRedirectQuery__
 *
 * To run a query within a React component, call `useRedirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useRedirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRedirectQuery({
 *   variables: {
 *      from: // value for 'from'
 *   },
 * });
 */
export function useRedirectQuery(baseOptions: Apollo.QueryHookOptions<RedirectQuery, RedirectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RedirectQuery, RedirectQueryVariables>(RedirectDocument, options);
      }
export function useRedirectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RedirectQuery, RedirectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RedirectQuery, RedirectQueryVariables>(RedirectDocument, options);
        }
export type RedirectQueryHookResult = ReturnType<typeof useRedirectQuery>;
export type RedirectLazyQueryHookResult = ReturnType<typeof useRedirectLazyQuery>;
export type RedirectQueryResult = Apollo.QueryResult<RedirectQuery, RedirectQueryVariables>;