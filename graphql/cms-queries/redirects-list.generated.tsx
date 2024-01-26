import * as Types from '../types';

import { gql } from '@apollo/client';
import { RedirectPartsFragmentDoc } from './RedirectParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RedirectsListQueryVariables = Types.Exact<{
  input: Types.RedirectInput;
}>;


export type RedirectsListQuery = { __typename?: 'Query', fetchRedirects: { __typename?: 'RedirectOutput', count: number, redirects: Array<{ __typename?: 'Redirect', _id: string, from: string, to: string, type: string, name?: string | null, track?: boolean | null, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null, last?: string | null } } | null, stats?: Array<{ __typename?: 'RedirectStats', time: any }> | null }> } };

export type RedirectByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type RedirectByIdQuery = { __typename?: 'Query', redirect?: { __typename?: 'Redirect', _id: string, created?: any | null, updated?: any | null, name?: string | null, from: string, to: string, type: string, track?: boolean | null, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null, last?: string | null } } | null, stats?: Array<{ __typename?: 'RedirectStats', time: any }> | null } | null };

export type DeleteRedirectMutationVariables = Types.Exact<{
  input: Types.DeleteRedirectInput;
}>;


export type DeleteRedirectMutation = { __typename?: 'Mutation', deleteRedirect: { __typename?: 'DeleteRedirectOutput', _id?: string | null } };

export type UpdateRedirectMutationVariables = Types.Exact<{
  input: Types.UpdateRedirectInput;
}>;


export type UpdateRedirectMutation = { __typename?: 'Mutation', redirect?: { __typename?: 'Redirect', _id: string, created?: any | null, updated?: any | null, name?: string | null, from: string, to: string, type: string, track?: boolean | null, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null, last?: string | null } } | null, stats?: Array<{ __typename?: 'RedirectStats', time: any }> | null } | null };

export type CreateRedirectMutationVariables = Types.Exact<{
  input: Types.CreateRedirectInput;
}>;


export type CreateRedirectMutation = { __typename?: 'Mutation', redirect: { __typename?: 'Redirect', _id: string, created?: any | null, updated?: any | null, name?: string | null, from: string, to: string, type: string, track?: boolean | null, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null, last?: string | null } } | null, stats?: Array<{ __typename?: 'RedirectStats', time: any }> | null } };


export const RedirectsListDocument = gql`
    query RedirectsList($input: RedirectInput!) {
  fetchRedirects(input: $input) {
    redirects {
      _id
      from
      to
      type
      name
      track
      author {
        name {
          first
          last
        }
      }
      stats {
        time
      }
    }
    count
  }
}
    `;

/**
 * __useRedirectsListQuery__
 *
 * To run a query within a React component, call `useRedirectsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRedirectsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRedirectsListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRedirectsListQuery(baseOptions: Apollo.QueryHookOptions<RedirectsListQuery, RedirectsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RedirectsListQuery, RedirectsListQueryVariables>(RedirectsListDocument, options);
      }
export function useRedirectsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RedirectsListQuery, RedirectsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RedirectsListQuery, RedirectsListQueryVariables>(RedirectsListDocument, options);
        }
export type RedirectsListQueryHookResult = ReturnType<typeof useRedirectsListQuery>;
export type RedirectsListLazyQueryHookResult = ReturnType<typeof useRedirectsListLazyQuery>;
export type RedirectsListQueryResult = Apollo.QueryResult<RedirectsListQuery, RedirectsListQueryVariables>;
export const RedirectByIdDocument = gql`
    query RedirectById($id: String!) {
  redirect: fetchRedirectById(id: $id) {
    ...RedirectParts
  }
}
    ${RedirectPartsFragmentDoc}`;

/**
 * __useRedirectByIdQuery__
 *
 * To run a query within a React component, call `useRedirectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRedirectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRedirectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRedirectByIdQuery(baseOptions: Apollo.QueryHookOptions<RedirectByIdQuery, RedirectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RedirectByIdQuery, RedirectByIdQueryVariables>(RedirectByIdDocument, options);
      }
export function useRedirectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RedirectByIdQuery, RedirectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RedirectByIdQuery, RedirectByIdQueryVariables>(RedirectByIdDocument, options);
        }
export type RedirectByIdQueryHookResult = ReturnType<typeof useRedirectByIdQuery>;
export type RedirectByIdLazyQueryHookResult = ReturnType<typeof useRedirectByIdLazyQuery>;
export type RedirectByIdQueryResult = Apollo.QueryResult<RedirectByIdQuery, RedirectByIdQueryVariables>;
export const DeleteRedirectDocument = gql`
    mutation DeleteRedirect($input: DeleteRedirectInput!) {
  deleteRedirect(input: $input) {
    _id
  }
}
    `;
export type DeleteRedirectMutationFn = Apollo.MutationFunction<DeleteRedirectMutation, DeleteRedirectMutationVariables>;

/**
 * __useDeleteRedirectMutation__
 *
 * To run a mutation, you first call `useDeleteRedirectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRedirectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRedirectMutation, { data, loading, error }] = useDeleteRedirectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRedirectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRedirectMutation, DeleteRedirectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRedirectMutation, DeleteRedirectMutationVariables>(DeleteRedirectDocument, options);
      }
export type DeleteRedirectMutationHookResult = ReturnType<typeof useDeleteRedirectMutation>;
export type DeleteRedirectMutationResult = Apollo.MutationResult<DeleteRedirectMutation>;
export type DeleteRedirectMutationOptions = Apollo.BaseMutationOptions<DeleteRedirectMutation, DeleteRedirectMutationVariables>;
export const UpdateRedirectDocument = gql`
    mutation UpdateRedirect($input: UpdateRedirectInput!) {
  redirect: updateRedirect(input: $input) {
    ...RedirectParts
  }
}
    ${RedirectPartsFragmentDoc}`;
export type UpdateRedirectMutationFn = Apollo.MutationFunction<UpdateRedirectMutation, UpdateRedirectMutationVariables>;

/**
 * __useUpdateRedirectMutation__
 *
 * To run a mutation, you first call `useUpdateRedirectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRedirectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRedirectMutation, { data, loading, error }] = useUpdateRedirectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRedirectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRedirectMutation, UpdateRedirectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRedirectMutation, UpdateRedirectMutationVariables>(UpdateRedirectDocument, options);
      }
export type UpdateRedirectMutationHookResult = ReturnType<typeof useUpdateRedirectMutation>;
export type UpdateRedirectMutationResult = Apollo.MutationResult<UpdateRedirectMutation>;
export type UpdateRedirectMutationOptions = Apollo.BaseMutationOptions<UpdateRedirectMutation, UpdateRedirectMutationVariables>;
export const CreateRedirectDocument = gql`
    mutation CreateRedirect($input: CreateRedirectInput!) {
  redirect: createRedirect(input: $input) {
    ...RedirectParts
  }
}
    ${RedirectPartsFragmentDoc}`;
export type CreateRedirectMutationFn = Apollo.MutationFunction<CreateRedirectMutation, CreateRedirectMutationVariables>;

/**
 * __useCreateRedirectMutation__
 *
 * To run a mutation, you first call `useCreateRedirectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRedirectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRedirectMutation, { data, loading, error }] = useCreateRedirectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRedirectMutation(baseOptions?: Apollo.MutationHookOptions<CreateRedirectMutation, CreateRedirectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRedirectMutation, CreateRedirectMutationVariables>(CreateRedirectDocument, options);
      }
export type CreateRedirectMutationHookResult = ReturnType<typeof useCreateRedirectMutation>;
export type CreateRedirectMutationResult = Apollo.MutationResult<CreateRedirectMutation>;
export type CreateRedirectMutationOptions = Apollo.BaseMutationOptions<CreateRedirectMutation, CreateRedirectMutationVariables>;