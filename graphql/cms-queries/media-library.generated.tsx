import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MediaLibraryQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.MediaInput>;
}>;


export type MediaLibraryQuery = { __typename?: 'Query', files: { __typename?: 'MediaOutput', count?: number | null, files: Array<{ __typename?: 'Media', _id: any, filename: string, length: number, uploadDate?: any | null, metadata?: { __typename?: 'MediaMeta', title?: string | null, description?: string | null } | null }> } };

export type DeleteMediaMutationVariables = Types.Exact<{
  _id: Types.Scalars['String']['input'];
}>;


export type DeleteMediaMutation = { __typename?: 'Mutation', result: string };

export type UpdateMediaLibraryMutationVariables = Types.Exact<{
  input: Types.UpdateMediaLibraryInput;
}>;


export type UpdateMediaLibraryMutation = { __typename?: 'Mutation', mediaLibrary?: { __typename?: 'Media', _id: any, filename: string, length: number, uploadDate?: any | null, metadata?: { __typename?: 'MediaMeta', title?: string | null, description?: string | null } | null } | null };

export type MediaLibraryPartFragment = { __typename?: 'Media', _id: any, filename: string, length: number, uploadDate?: any | null, metadata?: { __typename?: 'MediaMeta', title?: string | null, description?: string | null } | null };

export const MediaLibraryPartFragmentDoc = gql`
    fragment MediaLibraryPart on Media {
  _id
  filename
  length
  uploadDate
  metadata {
    title
    description
  }
}
    `;
export const MediaLibraryDocument = gql`
    query MediaLibrary($input: MediaInput) {
  files(input: $input) {
    files {
      _id
      filename
      length
      uploadDate
      metadata {
        title
        description
      }
    }
    count
  }
}
    `;

/**
 * __useMediaLibraryQuery__
 *
 * To run a query within a React component, call `useMediaLibraryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMediaLibraryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMediaLibraryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMediaLibraryQuery(baseOptions?: Apollo.QueryHookOptions<MediaLibraryQuery, MediaLibraryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MediaLibraryQuery, MediaLibraryQueryVariables>(MediaLibraryDocument, options);
      }
export function useMediaLibraryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MediaLibraryQuery, MediaLibraryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MediaLibraryQuery, MediaLibraryQueryVariables>(MediaLibraryDocument, options);
        }
export type MediaLibraryQueryHookResult = ReturnType<typeof useMediaLibraryQuery>;
export type MediaLibraryLazyQueryHookResult = ReturnType<typeof useMediaLibraryLazyQuery>;
export type MediaLibraryQueryResult = Apollo.QueryResult<MediaLibraryQuery, MediaLibraryQueryVariables>;
export const DeleteMediaDocument = gql`
    mutation DeleteMedia($_id: String!) {
  result: deleteMedia(_id: $_id)
}
    `;
export type DeleteMediaMutationFn = Apollo.MutationFunction<DeleteMediaMutation, DeleteMediaMutationVariables>;

/**
 * __useDeleteMediaMutation__
 *
 * To run a mutation, you first call `useDeleteMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMediaMutation, { data, loading, error }] = useDeleteMediaMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteMediaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMediaMutation, DeleteMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMediaMutation, DeleteMediaMutationVariables>(DeleteMediaDocument, options);
      }
export type DeleteMediaMutationHookResult = ReturnType<typeof useDeleteMediaMutation>;
export type DeleteMediaMutationResult = Apollo.MutationResult<DeleteMediaMutation>;
export type DeleteMediaMutationOptions = Apollo.BaseMutationOptions<DeleteMediaMutation, DeleteMediaMutationVariables>;
export const UpdateMediaLibraryDocument = gql`
    mutation UpdateMediaLibrary($input: UpdateMediaLibraryInput!) {
  mediaLibrary: updateMediaLibrary(input: $input) {
    ...MediaLibraryPart
  }
}
    ${MediaLibraryPartFragmentDoc}`;
export type UpdateMediaLibraryMutationFn = Apollo.MutationFunction<UpdateMediaLibraryMutation, UpdateMediaLibraryMutationVariables>;

/**
 * __useUpdateMediaLibraryMutation__
 *
 * To run a mutation, you first call `useUpdateMediaLibraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMediaLibraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMediaLibraryMutation, { data, loading, error }] = useUpdateMediaLibraryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMediaLibraryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMediaLibraryMutation, UpdateMediaLibraryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMediaLibraryMutation, UpdateMediaLibraryMutationVariables>(UpdateMediaLibraryDocument, options);
      }
export type UpdateMediaLibraryMutationHookResult = ReturnType<typeof useUpdateMediaLibraryMutation>;
export type UpdateMediaLibraryMutationResult = Apollo.MutationResult<UpdateMediaLibraryMutation>;
export type UpdateMediaLibraryMutationOptions = Apollo.BaseMutationOptions<UpdateMediaLibraryMutation, UpdateMediaLibraryMutationVariables>;