import * as Types from '../types';

import { gql } from '@apollo/client';
import { AnnouncementPartsFragmentDoc, AnnouncementViewsFragmentDoc } from '../fragments/AnnouncementParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AnnouncementsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AnnouncementsQuery = { __typename?: 'Query', announcements: Array<{ __typename?: 'Announcement', _id: any, lastEditedBy?: string | null | undefined, isPermanent?: boolean | null | undefined, limit?: number | null | undefined, cache_id: any, enabled: boolean, createdAt: any, updatedAt: any, type: Types.AnnouncementType, backgroundColor?: string | null | undefined, title?: string | null | undefined, content?: string | null | undefined, author?: { __typename?: 'User', _id: string, display_name?: string | null | undefined } | null | undefined }> };

export type AnnouncementQueryVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type AnnouncementQuery = { __typename?: 'Query', announcement: { __typename?: 'Announcement', _id: any, lastEditedBy?: string | null | undefined, isPermanent?: boolean | null | undefined, limit?: number | null | undefined, cache_id: any, enabled: boolean, createdAt: any, updatedAt: any, type: Types.AnnouncementType, backgroundColor?: string | null | undefined, title?: string | null | undefined, content?: string | null | undefined, views: number, unique_views?: number | null | undefined, author?: { __typename?: 'User', _id: string, display_name?: string | null | undefined } | null | undefined, user_views?: { __typename?: 'UserViews', total: number, by_country: Array<{ __typename?: 'ViewType', key: string, views: number }>, by_institution: Array<{ __typename?: 'ViewType', key: string, views: number }>, by_user_type: Array<{ __typename?: 'ViewType', key: string, views: number }> } | null | undefined } };

export type ToggleAnnouncementMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
  enabled: Types.Scalars['Boolean'];
}>;


export type ToggleAnnouncementMutation = { __typename?: 'Mutation', announcement: { __typename?: 'Announcement', _id: any, lastEditedBy?: string | null | undefined, isPermanent?: boolean | null | undefined, limit?: number | null | undefined, cache_id: any, enabled: boolean, createdAt: any, updatedAt: any, type: Types.AnnouncementType, backgroundColor?: string | null | undefined, title?: string | null | undefined, content?: string | null | undefined, author?: { __typename?: 'User', _id: string, display_name?: string | null | undefined } | null | undefined } };

export type DeleteAnnouncementMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type DeleteAnnouncementMutation = { __typename?: 'Mutation', result: string };

export type CreateAnnouncementMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateAnnouncementMutation = { __typename?: 'Mutation', announcement: { __typename?: 'Announcement', _id: any, lastEditedBy?: string | null | undefined, isPermanent?: boolean | null | undefined, limit?: number | null | undefined, cache_id: any, enabled: boolean, createdAt: any, updatedAt: any, type: Types.AnnouncementType, backgroundColor?: string | null | undefined, title?: string | null | undefined, content?: string | null | undefined, author?: { __typename?: 'User', _id: string, display_name?: string | null | undefined } | null | undefined } };

export type UpdateAnnouncementMutationVariables = Types.Exact<{
  input: Types.AnnouncementInput;
}>;


export type UpdateAnnouncementMutation = { __typename?: 'Mutation', updateAnnouncement: { __typename?: 'Announcement', _id: any, lastEditedBy?: string | null | undefined, isPermanent?: boolean | null | undefined, limit?: number | null | undefined, cache_id: any, enabled: boolean, createdAt: any, updatedAt: any, type: Types.AnnouncementType, backgroundColor?: string | null | undefined, title?: string | null | undefined, content?: string | null | undefined, author?: { __typename?: 'User', _id: string, display_name?: string | null | undefined } | null | undefined } };


export const AnnouncementsDocument = gql`
    query Announcements {
  announcements {
    ...AnnouncementParts
  }
}
    ${AnnouncementPartsFragmentDoc}`;

/**
 * __useAnnouncementsQuery__
 *
 * To run a query within a React component, call `useAnnouncementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnnouncementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnnouncementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAnnouncementsQuery(baseOptions?: Apollo.QueryHookOptions<AnnouncementsQuery, AnnouncementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnnouncementsQuery, AnnouncementsQueryVariables>(AnnouncementsDocument, options);
      }
export function useAnnouncementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnnouncementsQuery, AnnouncementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnnouncementsQuery, AnnouncementsQueryVariables>(AnnouncementsDocument, options);
        }
export type AnnouncementsQueryHookResult = ReturnType<typeof useAnnouncementsQuery>;
export type AnnouncementsLazyQueryHookResult = ReturnType<typeof useAnnouncementsLazyQuery>;
export type AnnouncementsQueryResult = Apollo.QueryResult<AnnouncementsQuery, AnnouncementsQueryVariables>;
export const AnnouncementDocument = gql`
    query Announcement($_id: String!) {
  announcement(id: $_id) {
    ...AnnouncementParts
    ...AnnouncementViews
  }
}
    ${AnnouncementPartsFragmentDoc}
${AnnouncementViewsFragmentDoc}`;

/**
 * __useAnnouncementQuery__
 *
 * To run a query within a React component, call `useAnnouncementQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnnouncementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnnouncementQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useAnnouncementQuery(baseOptions: Apollo.QueryHookOptions<AnnouncementQuery, AnnouncementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnnouncementQuery, AnnouncementQueryVariables>(AnnouncementDocument, options);
      }
export function useAnnouncementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnnouncementQuery, AnnouncementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnnouncementQuery, AnnouncementQueryVariables>(AnnouncementDocument, options);
        }
export type AnnouncementQueryHookResult = ReturnType<typeof useAnnouncementQuery>;
export type AnnouncementLazyQueryHookResult = ReturnType<typeof useAnnouncementLazyQuery>;
export type AnnouncementQueryResult = Apollo.QueryResult<AnnouncementQuery, AnnouncementQueryVariables>;
export const ToggleAnnouncementDocument = gql`
    mutation ToggleAnnouncement($_id: String!, $enabled: Boolean!) {
  announcement: setEnabledAnnouncement(_id: $_id, enabled: $enabled) {
    ...AnnouncementParts
  }
}
    ${AnnouncementPartsFragmentDoc}`;
export type ToggleAnnouncementMutationFn = Apollo.MutationFunction<ToggleAnnouncementMutation, ToggleAnnouncementMutationVariables>;

/**
 * __useToggleAnnouncementMutation__
 *
 * To run a mutation, you first call `useToggleAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleAnnouncementMutation, { data, loading, error }] = useToggleAnnouncementMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      enabled: // value for 'enabled'
 *   },
 * });
 */
export function useToggleAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<ToggleAnnouncementMutation, ToggleAnnouncementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleAnnouncementMutation, ToggleAnnouncementMutationVariables>(ToggleAnnouncementDocument, options);
      }
export type ToggleAnnouncementMutationHookResult = ReturnType<typeof useToggleAnnouncementMutation>;
export type ToggleAnnouncementMutationResult = Apollo.MutationResult<ToggleAnnouncementMutation>;
export type ToggleAnnouncementMutationOptions = Apollo.BaseMutationOptions<ToggleAnnouncementMutation, ToggleAnnouncementMutationVariables>;
export const DeleteAnnouncementDocument = gql`
    mutation DeleteAnnouncement($_id: String!) {
  result: deleteAnnouncement(_id: $_id)
}
    `;
export type DeleteAnnouncementMutationFn = Apollo.MutationFunction<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>;

/**
 * __useDeleteAnnouncementMutation__
 *
 * To run a mutation, you first call `useDeleteAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAnnouncementMutation, { data, loading, error }] = useDeleteAnnouncementMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>(DeleteAnnouncementDocument, options);
      }
export type DeleteAnnouncementMutationHookResult = ReturnType<typeof useDeleteAnnouncementMutation>;
export type DeleteAnnouncementMutationResult = Apollo.MutationResult<DeleteAnnouncementMutation>;
export type DeleteAnnouncementMutationOptions = Apollo.BaseMutationOptions<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>;
export const CreateAnnouncementDocument = gql`
    mutation CreateAnnouncement {
  announcement: createAnnouncement {
    ...AnnouncementParts
  }
}
    ${AnnouncementPartsFragmentDoc}`;
export type CreateAnnouncementMutationFn = Apollo.MutationFunction<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>;

/**
 * __useCreateAnnouncementMutation__
 *
 * To run a mutation, you first call `useCreateAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnnouncementMutation, { data, loading, error }] = useCreateAnnouncementMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>(CreateAnnouncementDocument, options);
      }
export type CreateAnnouncementMutationHookResult = ReturnType<typeof useCreateAnnouncementMutation>;
export type CreateAnnouncementMutationResult = Apollo.MutationResult<CreateAnnouncementMutation>;
export type CreateAnnouncementMutationOptions = Apollo.BaseMutationOptions<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>;
export const UpdateAnnouncementDocument = gql`
    mutation UpdateAnnouncement($input: AnnouncementInput!) {
  updateAnnouncement(input: $input) {
    ...AnnouncementParts
  }
}
    ${AnnouncementPartsFragmentDoc}`;
export type UpdateAnnouncementMutationFn = Apollo.MutationFunction<UpdateAnnouncementMutation, UpdateAnnouncementMutationVariables>;

/**
 * __useUpdateAnnouncementMutation__
 *
 * To run a mutation, you first call `useUpdateAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAnnouncementMutation, { data, loading, error }] = useUpdateAnnouncementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAnnouncementMutation, UpdateAnnouncementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAnnouncementMutation, UpdateAnnouncementMutationVariables>(UpdateAnnouncementDocument, options);
      }
export type UpdateAnnouncementMutationHookResult = ReturnType<typeof useUpdateAnnouncementMutation>;
export type UpdateAnnouncementMutationResult = Apollo.MutationResult<UpdateAnnouncementMutation>;
export type UpdateAnnouncementMutationOptions = Apollo.BaseMutationOptions<UpdateAnnouncementMutation, UpdateAnnouncementMutationVariables>;