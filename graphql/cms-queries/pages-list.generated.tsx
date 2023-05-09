import * as Types from '../types';

import { gql } from '@apollo/client';
import { PagePartsFragmentDoc } from '../fragments/PageParts.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type PagesListQueryVariables = Types.Exact<{
  input: Types.PageInputFetch;
}>;


export type PagesListQuery = { __typename?: 'Query', fetchPages: { __typename?: 'PageOutput', totalCount: number, pages: Array<{ __typename?: 'Page', _id: string, title: string, status: Types.PageStatus, slug: string, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined } } | null | undefined }> } };

export type PageByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type PageByIdQuery = { __typename?: 'Query', page?: { __typename?: 'Page', _id: string, created: any, updated: any, title: string, status: Types.PageStatus, slug: string, content?: string | null | undefined, scripts?: Array<string> | null | undefined, meta_desc?: string | null | undefined, sidebar?: string | null | undefined, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined } } | null | undefined } | null | undefined };

export type DeletePageMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeletePageMutation = { __typename?: 'Mutation', deletePage: { __typename?: 'Page', _id: string } };

export type CreatePageMutationVariables = Types.Exact<{
  input: Types.CreatePageInput;
}>;


export type CreatePageMutation = { __typename?: 'Mutation', createPage: { __typename?: 'Page', _id: string, created: any, updated: any, title: string, status: Types.PageStatus, slug: string, content?: string | null | undefined, scripts?: Array<string> | null | undefined, meta_desc?: string | null | undefined, sidebar?: string | null | undefined } };

export type UpdatePageMutationVariables = Types.Exact<{
  input: Types.UpdatePageInput;
}>;


export type UpdatePageMutation = { __typename?: 'Mutation', page?: { __typename?: 'Page', _id: string, created: any, updated: any, title: string, status: Types.PageStatus, slug: string, content?: string | null | undefined, scripts?: Array<string> | null | undefined, meta_desc?: string | null | undefined, sidebar?: string | null | undefined, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined } } | null | undefined } | null | undefined };


export const PagesListDocument = gql`
    query PagesList($input: PageInputFetch!) {
  fetchPages(input: $input) {
    totalCount
    pages {
      _id
      title
      status
      slug
      author {
        name {
          first
          last
        }
      }
    }
  }
}
    `;

/**
 * __usePagesListQuery__
 *
 * To run a query within a React component, call `usePagesListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePagesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePagesListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePagesListQuery(baseOptions: Apollo.QueryHookOptions<PagesListQuery, PagesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PagesListQuery, PagesListQueryVariables>(PagesListDocument, options);
      }
export function usePagesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PagesListQuery, PagesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PagesListQuery, PagesListQueryVariables>(PagesListDocument, options);
        }
export type PagesListQueryHookResult = ReturnType<typeof usePagesListQuery>;
export type PagesListLazyQueryHookResult = ReturnType<typeof usePagesListLazyQuery>;
export type PagesListQueryResult = Apollo.QueryResult<PagesListQuery, PagesListQueryVariables>;
export const PageByIdDocument = gql`
    query PageById($id: String!) {
  page: fetchPageById(id: $id) {
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;

/**
 * __usePageByIdQuery__
 *
 * To run a query within a React component, call `usePageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePageByIdQuery(baseOptions: Apollo.QueryHookOptions<PageByIdQuery, PageByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageByIdQuery, PageByIdQueryVariables>(PageByIdDocument, options);
      }
export function usePageByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageByIdQuery, PageByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageByIdQuery, PageByIdQueryVariables>(PageByIdDocument, options);
        }
export type PageByIdQueryHookResult = ReturnType<typeof usePageByIdQuery>;
export type PageByIdLazyQueryHookResult = ReturnType<typeof usePageByIdLazyQuery>;
export type PageByIdQueryResult = Apollo.QueryResult<PageByIdQuery, PageByIdQueryVariables>;
export const DeletePageDocument = gql`
    mutation DeletePage($id: String!) {
  deletePage(id: $id) {
    _id
  }
}
    `;
export type DeletePageMutationFn = Apollo.MutationFunction<DeletePageMutation, DeletePageMutationVariables>;

/**
 * __useDeletePageMutation__
 *
 * To run a mutation, you first call `useDeletePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePageMutation, { data, loading, error }] = useDeletePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePageMutation(baseOptions?: Apollo.MutationHookOptions<DeletePageMutation, DeletePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePageMutation, DeletePageMutationVariables>(DeletePageDocument, options);
      }
export type DeletePageMutationHookResult = ReturnType<typeof useDeletePageMutation>;
export type DeletePageMutationResult = Apollo.MutationResult<DeletePageMutation>;
export type DeletePageMutationOptions = Apollo.BaseMutationOptions<DeletePageMutation, DeletePageMutationVariables>;
export const CreatePageDocument = gql`
    mutation CreatePage($input: CreatePageInput!) {
  createPage(input: $input) {
    _id
    created
    updated
    title
    status
    slug
    content
    scripts
    meta_desc
    sidebar
  }
}
    `;
export type CreatePageMutationFn = Apollo.MutationFunction<CreatePageMutation, CreatePageMutationVariables>;

/**
 * __useCreatePageMutation__
 *
 * To run a mutation, you first call `useCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageMutation, { data, loading, error }] = useCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePageMutation(baseOptions?: Apollo.MutationHookOptions<CreatePageMutation, CreatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePageMutation, CreatePageMutationVariables>(CreatePageDocument, options);
      }
export type CreatePageMutationHookResult = ReturnType<typeof useCreatePageMutation>;
export type CreatePageMutationResult = Apollo.MutationResult<CreatePageMutation>;
export type CreatePageMutationOptions = Apollo.BaseMutationOptions<CreatePageMutation, CreatePageMutationVariables>;
export const UpdatePageDocument = gql`
    mutation UpdatePage($input: UpdatePageInput!) {
  page: updatePage(input: $input) {
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
export type UpdatePageMutationFn = Apollo.MutationFunction<UpdatePageMutation, UpdatePageMutationVariables>;

/**
 * __useUpdatePageMutation__
 *
 * To run a mutation, you first call `useUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageMutation, { data, loading, error }] = useUpdatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePageMutation, UpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(UpdatePageDocument, options);
      }
export type UpdatePageMutationHookResult = ReturnType<typeof useUpdatePageMutation>;
export type UpdatePageMutationResult = Apollo.MutationResult<UpdatePageMutation>;
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<UpdatePageMutation, UpdatePageMutationVariables>;