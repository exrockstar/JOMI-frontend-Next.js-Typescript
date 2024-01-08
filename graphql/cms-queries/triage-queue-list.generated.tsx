import * as Types from '../types';

import { gql } from '@apollo/client';
import { TriageQueuePartsFragmentDoc } from './TriageQueueParts.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TriageQueueListQueryVariables = Types.Exact<{
  input: Types.TriageQueueInput;
}>;


export type TriageQueueListQuery = { __typename?: 'Query', triageQueueRequests: { __typename?: 'TriageQueueOutput', count: number, dbQueryString: string, triage_requests: Array<{ __typename?: 'TriageQueue', _id: string, created?: any | null | undefined, updated?: any | null | undefined, type: Types.TriageQueueStatus, priority?: Types.TriagePriority | null | undefined, display_name?: string | null | undefined, email?: string | null | undefined, institution_name?: string | null | undefined, countryCode?: string | null | undefined, countryName?: string | null | undefined, accessType?: Types.AccessTypeEnum | null | undefined, regionName?: string | null | undefined, sentEmailAt?: any | null | undefined, notes?: string | null | undefined, market?: Types.TriageMarket | null | undefined, user?: { __typename?: 'User', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, institution_name?: string | null | undefined, subActive: boolean } | null | undefined, institution?: { __typename?: 'Institution', _id: string, name: string, category?: string | null | undefined, stats?: { __typename?: 'InstitutionStats', userCount: number, loginCount?: number | null | undefined, articleCount?: number | null | undefined, totalArticleCount?: number | null | undefined } | null | undefined } | null | undefined }> } };

export type RequestsByUserQueryVariables = Types.Exact<{
  instId: Types.Scalars['String'];
  input: Types.TriageQueueInput;
}>;


export type RequestsByUserQuery = { __typename?: 'Query', triageQueueRequestsByInstitution: { __typename?: 'TriageRequestsByUserOutput', count: number, totalRequestCount?: number | null | undefined, triage_requests: Array<{ __typename?: 'TriageRequestByUser', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, last_visited?: any | null | undefined, last_request_date?: any | null | undefined, registered?: any | null | undefined, loginCount?: number | null | undefined, articleCount?: number | null | undefined, requestCount?: number | null | undefined, requests: Array<{ __typename?: 'PartialRequest', created?: any | null | undefined, message?: string | null | undefined }> }> } };

export type TriageQueueByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  pocName?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TriageQueueByIdQuery = { __typename?: 'Query', triageQueueRequest?: { __typename?: 'TriageQueue', emailTemplate: string, notes?: string | null | undefined, _id: string, created?: any | null | undefined, updated?: any | null | undefined, type: Types.TriageQueueStatus, priority?: Types.TriagePriority | null | undefined, display_name?: string | null | undefined, institution_name?: string | null | undefined, email?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, market?: Types.TriageMarket | null | undefined, user?: { __typename?: 'User', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, institution_name?: string | null | undefined, subActive: boolean, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined } | null | undefined, additional_info?: { __typename?: 'AdditionalInfo', question?: string | null | undefined, response?: string | null | undefined, suggested_contact?: string | null | undefined, contactInfo?: string | null | undefined, request_email_sent?: boolean | null | undefined, pocs_email_sent?: Array<string> | null | undefined } | null | undefined, institution?: { __typename?: 'Institution', _id: string, name: string, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, isMainContact?: boolean | null | undefined }> | null | undefined } | null | undefined } | null | undefined };

export type ApplyInstitutionToTriageMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  institution_id: Types.Scalars['String'];
}>;


export type ApplyInstitutionToTriageMutation = { __typename?: 'Mutation', triageQueueRequest: { __typename?: 'TriageQueue', emailTemplate: string, notes?: string | null | undefined, _id: string, created?: any | null | undefined, updated?: any | null | undefined, type: Types.TriageQueueStatus, priority?: Types.TriagePriority | null | undefined, display_name?: string | null | undefined, institution_name?: string | null | undefined, email?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, market?: Types.TriageMarket | null | undefined, user?: { __typename?: 'User', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, institution_name?: string | null | undefined, subActive: boolean, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined } | null | undefined, additional_info?: { __typename?: 'AdditionalInfo', question?: string | null | undefined, response?: string | null | undefined, suggested_contact?: string | null | undefined, contactInfo?: string | null | undefined, request_email_sent?: boolean | null | undefined, pocs_email_sent?: Array<string> | null | undefined } | null | undefined, institution?: { __typename?: 'Institution', _id: string, name: string, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, isMainContact?: boolean | null | undefined }> | null | undefined } | null | undefined } };

export type UpdateTriageQueueResponseMutationVariables = Types.Exact<{
  input: Types.UpdateTriageResponseInput;
}>;


export type UpdateTriageQueueResponseMutation = { __typename?: 'Mutation', triageQueueRequest: { __typename?: 'TriageQueue', emailTemplate: string, notes?: string | null | undefined, _id: string, created?: any | null | undefined, updated?: any | null | undefined, type: Types.TriageQueueStatus, priority?: Types.TriagePriority | null | undefined, display_name?: string | null | undefined, institution_name?: string | null | undefined, email?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, market?: Types.TriageMarket | null | undefined, user?: { __typename?: 'User', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, institution_name?: string | null | undefined, subActive: boolean, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined } | null | undefined, additional_info?: { __typename?: 'AdditionalInfo', question?: string | null | undefined, response?: string | null | undefined, suggested_contact?: string | null | undefined, contactInfo?: string | null | undefined, request_email_sent?: boolean | null | undefined, pocs_email_sent?: Array<string> | null | undefined } | null | undefined, institution?: { __typename?: 'Institution', _id: string, name: string, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, isMainContact?: boolean | null | undefined }> | null | undefined } | null | undefined } };

export type UpdateTriageQueueNotesMutationVariables = Types.Exact<{
  input: Types.UpdateTriageNotesInput;
}>;


export type UpdateTriageQueueNotesMutation = { __typename?: 'Mutation', triageQueueRequest: { __typename?: 'TriageQueue', emailTemplate: string, notes?: string | null | undefined, _id: string, created?: any | null | undefined, updated?: any | null | undefined, type: Types.TriageQueueStatus, priority?: Types.TriagePriority | null | undefined, display_name?: string | null | undefined, institution_name?: string | null | undefined, email?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, market?: Types.TriageMarket | null | undefined, user?: { __typename?: 'User', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, institution_name?: string | null | undefined, subActive: boolean, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined } | null | undefined, additional_info?: { __typename?: 'AdditionalInfo', question?: string | null | undefined, response?: string | null | undefined, suggested_contact?: string | null | undefined, contactInfo?: string | null | undefined, request_email_sent?: boolean | null | undefined, pocs_email_sent?: Array<string> | null | undefined } | null | undefined, institution?: { __typename?: 'Institution', _id: string, name: string, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, isMainContact?: boolean | null | undefined }> | null | undefined } | null | undefined } };

export type UpdateTriageQueueStatusMutationVariables = Types.Exact<{
  input: Types.UpdateTriageInput;
}>;


export type UpdateTriageQueueStatusMutation = { __typename?: 'Mutation', triageQueueRequest: { __typename?: 'TriageQueue', emailTemplate: string, notes?: string | null | undefined, _id: string, created?: any | null | undefined, updated?: any | null | undefined, type: Types.TriageQueueStatus, priority?: Types.TriagePriority | null | undefined, display_name?: string | null | undefined, institution_name?: string | null | undefined, email?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, market?: Types.TriageMarket | null | undefined, user?: { __typename?: 'User', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, institution_name?: string | null | undefined, subActive: boolean, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined } | null | undefined, additional_info?: { __typename?: 'AdditionalInfo', question?: string | null | undefined, response?: string | null | undefined, suggested_contact?: string | null | undefined, contactInfo?: string | null | undefined, request_email_sent?: boolean | null | undefined, pocs_email_sent?: Array<string> | null | undefined } | null | undefined, institution?: { __typename?: 'Institution', _id: string, name: string, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, isMainContact?: boolean | null | undefined }> | null | undefined } | null | undefined } };

export type SendTriageQueueEmailMutationVariables = Types.Exact<{
  input: Types.TriageQueueEmailInput;
}>;


export type SendTriageQueueEmailMutation = { __typename?: 'Mutation', triageQueueRequest: { __typename?: 'TriageQueue', emailTemplate: string, notes?: string | null | undefined, _id: string, created?: any | null | undefined, updated?: any | null | undefined, type: Types.TriageQueueStatus, priority?: Types.TriagePriority | null | undefined, display_name?: string | null | undefined, institution_name?: string | null | undefined, email?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, market?: Types.TriageMarket | null | undefined, user?: { __typename?: 'User', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, institution_name?: string | null | undefined, subActive: boolean, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined } | null | undefined, additional_info?: { __typename?: 'AdditionalInfo', question?: string | null | undefined, response?: string | null | undefined, suggested_contact?: string | null | undefined, contactInfo?: string | null | undefined, request_email_sent?: boolean | null | undefined, pocs_email_sent?: Array<string> | null | undefined } | null | undefined, institution?: { __typename?: 'Institution', _id: string, name: string, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, isMainContact?: boolean | null | undefined }> | null | undefined } | null | undefined } };

export type AddCrmTagsToTriageQueueResultsMutationVariables = Types.Exact<{
  input: Types.TriageQueueInput;
  tags: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type AddCrmTagsToTriageQueueResultsMutation = { __typename?: 'Mutation', result: boolean };

export type AddCrmTagsToTriageQueueResultsPreviewQueryVariables = Types.Exact<{
  input: Types.TriageQueueInput;
}>;


export type AddCrmTagsToTriageQueueResultsPreviewQuery = { __typename?: 'Query', result: number };


export const TriageQueueListDocument = gql`
    query TriageQueueList($input: TriageQueueInput!) {
  triageQueueRequests(input: $input) {
    count
    dbQueryString
    triage_requests {
      _id
      created
      updated
      type
      priority
      display_name
      email
      institution_name
      countryCode
      countryName
      accessType
      regionName
      sentEmailAt
      user {
        _id
        email
        display_name
        user_type
        specialty
        countryCode
        regionName
        institution_name
        subActive
      }
      institution {
        _id
        name
        stats {
          userCount
          loginCount
          articleCount
          totalArticleCount
        }
        category
      }
      notes
      market
    }
  }
}
    `;

/**
 * __useTriageQueueListQuery__
 *
 * To run a query within a React component, call `useTriageQueueListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTriageQueueListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTriageQueueListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTriageQueueListQuery(baseOptions: Apollo.QueryHookOptions<TriageQueueListQuery, TriageQueueListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TriageQueueListQuery, TriageQueueListQueryVariables>(TriageQueueListDocument, options);
      }
export function useTriageQueueListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TriageQueueListQuery, TriageQueueListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TriageQueueListQuery, TriageQueueListQueryVariables>(TriageQueueListDocument, options);
        }
export type TriageQueueListQueryHookResult = ReturnType<typeof useTriageQueueListQuery>;
export type TriageQueueListLazyQueryHookResult = ReturnType<typeof useTriageQueueListLazyQuery>;
export type TriageQueueListQueryResult = Apollo.QueryResult<TriageQueueListQuery, TriageQueueListQueryVariables>;
export const RequestsByUserDocument = gql`
    query RequestsByUser($instId: String!, $input: TriageQueueInput!) {
  triageQueueRequestsByInstitution(instId: $instId, input: $input) {
    triage_requests {
      _id
      email
      display_name
      user_type
      specialty
      last_visited
      last_request_date
      registered
      loginCount
      articleCount
      requestCount
      requests {
        created
        message
      }
    }
    count
    totalRequestCount
  }
}
    `;

/**
 * __useRequestsByUserQuery__
 *
 * To run a query within a React component, call `useRequestsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestsByUserQuery({
 *   variables: {
 *      instId: // value for 'instId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestsByUserQuery(baseOptions: Apollo.QueryHookOptions<RequestsByUserQuery, RequestsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestsByUserQuery, RequestsByUserQueryVariables>(RequestsByUserDocument, options);
      }
export function useRequestsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestsByUserQuery, RequestsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestsByUserQuery, RequestsByUserQueryVariables>(RequestsByUserDocument, options);
        }
export type RequestsByUserQueryHookResult = ReturnType<typeof useRequestsByUserQuery>;
export type RequestsByUserLazyQueryHookResult = ReturnType<typeof useRequestsByUserLazyQuery>;
export type RequestsByUserQueryResult = Apollo.QueryResult<RequestsByUserQuery, RequestsByUserQueryVariables>;
export const TriageQueueByIdDocument = gql`
    query TriageQueueById($id: String!, $pocName: String) {
  triageQueueRequest: triageQueueById(id: $id) {
    ...TriageQueueParts
    emailTemplate(pocName: $pocName)
    notes
  }
}
    ${TriageQueuePartsFragmentDoc}`;

/**
 * __useTriageQueueByIdQuery__
 *
 * To run a query within a React component, call `useTriageQueueByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTriageQueueByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTriageQueueByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      pocName: // value for 'pocName'
 *   },
 * });
 */
export function useTriageQueueByIdQuery(baseOptions: Apollo.QueryHookOptions<TriageQueueByIdQuery, TriageQueueByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TriageQueueByIdQuery, TriageQueueByIdQueryVariables>(TriageQueueByIdDocument, options);
      }
export function useTriageQueueByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TriageQueueByIdQuery, TriageQueueByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TriageQueueByIdQuery, TriageQueueByIdQueryVariables>(TriageQueueByIdDocument, options);
        }
export type TriageQueueByIdQueryHookResult = ReturnType<typeof useTriageQueueByIdQuery>;
export type TriageQueueByIdLazyQueryHookResult = ReturnType<typeof useTriageQueueByIdLazyQuery>;
export type TriageQueueByIdQueryResult = Apollo.QueryResult<TriageQueueByIdQuery, TriageQueueByIdQueryVariables>;
export const ApplyInstitutionToTriageDocument = gql`
    mutation ApplyInstitutionToTriage($id: String!, $institution_id: String!) {
  triageQueueRequest: applyInstitutionToTriage(
    id: $id
    institution_id: $institution_id
  ) {
    ...TriageQueueParts
    emailTemplate
    notes
  }
}
    ${TriageQueuePartsFragmentDoc}`;
export type ApplyInstitutionToTriageMutationFn = Apollo.MutationFunction<ApplyInstitutionToTriageMutation, ApplyInstitutionToTriageMutationVariables>;

/**
 * __useApplyInstitutionToTriageMutation__
 *
 * To run a mutation, you first call `useApplyInstitutionToTriageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyInstitutionToTriageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyInstitutionToTriageMutation, { data, loading, error }] = useApplyInstitutionToTriageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      institution_id: // value for 'institution_id'
 *   },
 * });
 */
export function useApplyInstitutionToTriageMutation(baseOptions?: Apollo.MutationHookOptions<ApplyInstitutionToTriageMutation, ApplyInstitutionToTriageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyInstitutionToTriageMutation, ApplyInstitutionToTriageMutationVariables>(ApplyInstitutionToTriageDocument, options);
      }
export type ApplyInstitutionToTriageMutationHookResult = ReturnType<typeof useApplyInstitutionToTriageMutation>;
export type ApplyInstitutionToTriageMutationResult = Apollo.MutationResult<ApplyInstitutionToTriageMutation>;
export type ApplyInstitutionToTriageMutationOptions = Apollo.BaseMutationOptions<ApplyInstitutionToTriageMutation, ApplyInstitutionToTriageMutationVariables>;
export const UpdateTriageQueueResponseDocument = gql`
    mutation UpdateTriageQueueResponse($input: UpdateTriageResponseInput!) {
  triageQueueRequest: updateTriageResponse(input: $input) {
    ...TriageQueueParts
    emailTemplate
    notes
  }
}
    ${TriageQueuePartsFragmentDoc}`;
export type UpdateTriageQueueResponseMutationFn = Apollo.MutationFunction<UpdateTriageQueueResponseMutation, UpdateTriageQueueResponseMutationVariables>;

/**
 * __useUpdateTriageQueueResponseMutation__
 *
 * To run a mutation, you first call `useUpdateTriageQueueResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTriageQueueResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTriageQueueResponseMutation, { data, loading, error }] = useUpdateTriageQueueResponseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTriageQueueResponseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTriageQueueResponseMutation, UpdateTriageQueueResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTriageQueueResponseMutation, UpdateTriageQueueResponseMutationVariables>(UpdateTriageQueueResponseDocument, options);
      }
export type UpdateTriageQueueResponseMutationHookResult = ReturnType<typeof useUpdateTriageQueueResponseMutation>;
export type UpdateTriageQueueResponseMutationResult = Apollo.MutationResult<UpdateTriageQueueResponseMutation>;
export type UpdateTriageQueueResponseMutationOptions = Apollo.BaseMutationOptions<UpdateTriageQueueResponseMutation, UpdateTriageQueueResponseMutationVariables>;
export const UpdateTriageQueueNotesDocument = gql`
    mutation UpdateTriageQueueNotes($input: UpdateTriageNotesInput!) {
  triageQueueRequest: updateTriageNotes(input: $input) {
    ...TriageQueueParts
    emailTemplate
    notes
  }
}
    ${TriageQueuePartsFragmentDoc}`;
export type UpdateTriageQueueNotesMutationFn = Apollo.MutationFunction<UpdateTriageQueueNotesMutation, UpdateTriageQueueNotesMutationVariables>;

/**
 * __useUpdateTriageQueueNotesMutation__
 *
 * To run a mutation, you first call `useUpdateTriageQueueNotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTriageQueueNotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTriageQueueNotesMutation, { data, loading, error }] = useUpdateTriageQueueNotesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTriageQueueNotesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTriageQueueNotesMutation, UpdateTriageQueueNotesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTriageQueueNotesMutation, UpdateTriageQueueNotesMutationVariables>(UpdateTriageQueueNotesDocument, options);
      }
export type UpdateTriageQueueNotesMutationHookResult = ReturnType<typeof useUpdateTriageQueueNotesMutation>;
export type UpdateTriageQueueNotesMutationResult = Apollo.MutationResult<UpdateTriageQueueNotesMutation>;
export type UpdateTriageQueueNotesMutationOptions = Apollo.BaseMutationOptions<UpdateTriageQueueNotesMutation, UpdateTriageQueueNotesMutationVariables>;
export const UpdateTriageQueueStatusDocument = gql`
    mutation UpdateTriageQueueStatus($input: UpdateTriageInput!) {
  triageQueueRequest: updateTriageQueueStatus(input: $input) {
    ...TriageQueueParts
    emailTemplate
    notes
  }
}
    ${TriageQueuePartsFragmentDoc}`;
export type UpdateTriageQueueStatusMutationFn = Apollo.MutationFunction<UpdateTriageQueueStatusMutation, UpdateTriageQueueStatusMutationVariables>;

/**
 * __useUpdateTriageQueueStatusMutation__
 *
 * To run a mutation, you first call `useUpdateTriageQueueStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTriageQueueStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTriageQueueStatusMutation, { data, loading, error }] = useUpdateTriageQueueStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTriageQueueStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTriageQueueStatusMutation, UpdateTriageQueueStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTriageQueueStatusMutation, UpdateTriageQueueStatusMutationVariables>(UpdateTriageQueueStatusDocument, options);
      }
export type UpdateTriageQueueStatusMutationHookResult = ReturnType<typeof useUpdateTriageQueueStatusMutation>;
export type UpdateTriageQueueStatusMutationResult = Apollo.MutationResult<UpdateTriageQueueStatusMutation>;
export type UpdateTriageQueueStatusMutationOptions = Apollo.BaseMutationOptions<UpdateTriageQueueStatusMutation, UpdateTriageQueueStatusMutationVariables>;
export const SendTriageQueueEmailDocument = gql`
    mutation SendTriageQueueEmail($input: TriageQueueEmailInput!) {
  triageQueueRequest: sendTriageQueueEmail(input: $input) {
    ...TriageQueueParts
    emailTemplate
    notes
  }
}
    ${TriageQueuePartsFragmentDoc}`;
export type SendTriageQueueEmailMutationFn = Apollo.MutationFunction<SendTriageQueueEmailMutation, SendTriageQueueEmailMutationVariables>;

/**
 * __useSendTriageQueueEmailMutation__
 *
 * To run a mutation, you first call `useSendTriageQueueEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendTriageQueueEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendTriageQueueEmailMutation, { data, loading, error }] = useSendTriageQueueEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendTriageQueueEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendTriageQueueEmailMutation, SendTriageQueueEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendTriageQueueEmailMutation, SendTriageQueueEmailMutationVariables>(SendTriageQueueEmailDocument, options);
      }
export type SendTriageQueueEmailMutationHookResult = ReturnType<typeof useSendTriageQueueEmailMutation>;
export type SendTriageQueueEmailMutationResult = Apollo.MutationResult<SendTriageQueueEmailMutation>;
export type SendTriageQueueEmailMutationOptions = Apollo.BaseMutationOptions<SendTriageQueueEmailMutation, SendTriageQueueEmailMutationVariables>;
export const AddCrmTagsToTriageQueueResultsDocument = gql`
    mutation AddCRMTagsToTriageQueueResults($input: TriageQueueInput!, $tags: [String!]!) {
  result: addCRMTagsToTriageQueueResults(input: $input, tags: $tags)
}
    `;
export type AddCrmTagsToTriageQueueResultsMutationFn = Apollo.MutationFunction<AddCrmTagsToTriageQueueResultsMutation, AddCrmTagsToTriageQueueResultsMutationVariables>;

/**
 * __useAddCrmTagsToTriageQueueResultsMutation__
 *
 * To run a mutation, you first call `useAddCrmTagsToTriageQueueResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCrmTagsToTriageQueueResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCrmTagsToTriageQueueResultsMutation, { data, loading, error }] = useAddCrmTagsToTriageQueueResultsMutation({
 *   variables: {
 *      input: // value for 'input'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddCrmTagsToTriageQueueResultsMutation(baseOptions?: Apollo.MutationHookOptions<AddCrmTagsToTriageQueueResultsMutation, AddCrmTagsToTriageQueueResultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCrmTagsToTriageQueueResultsMutation, AddCrmTagsToTriageQueueResultsMutationVariables>(AddCrmTagsToTriageQueueResultsDocument, options);
      }
export type AddCrmTagsToTriageQueueResultsMutationHookResult = ReturnType<typeof useAddCrmTagsToTriageQueueResultsMutation>;
export type AddCrmTagsToTriageQueueResultsMutationResult = Apollo.MutationResult<AddCrmTagsToTriageQueueResultsMutation>;
export type AddCrmTagsToTriageQueueResultsMutationOptions = Apollo.BaseMutationOptions<AddCrmTagsToTriageQueueResultsMutation, AddCrmTagsToTriageQueueResultsMutationVariables>;
export const AddCrmTagsToTriageQueueResultsPreviewDocument = gql`
    query AddCRMTagsToTriageQueueResultsPreview($input: TriageQueueInput!) {
  result: addCRMTagsToTriageQueueResultsPreview(input: $input)
}
    `;

/**
 * __useAddCrmTagsToTriageQueueResultsPreviewQuery__
 *
 * To run a query within a React component, call `useAddCrmTagsToTriageQueueResultsPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddCrmTagsToTriageQueueResultsPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddCrmTagsToTriageQueueResultsPreviewQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCrmTagsToTriageQueueResultsPreviewQuery(baseOptions: Apollo.QueryHookOptions<AddCrmTagsToTriageQueueResultsPreviewQuery, AddCrmTagsToTriageQueueResultsPreviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddCrmTagsToTriageQueueResultsPreviewQuery, AddCrmTagsToTriageQueueResultsPreviewQueryVariables>(AddCrmTagsToTriageQueueResultsPreviewDocument, options);
      }
export function useAddCrmTagsToTriageQueueResultsPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddCrmTagsToTriageQueueResultsPreviewQuery, AddCrmTagsToTriageQueueResultsPreviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddCrmTagsToTriageQueueResultsPreviewQuery, AddCrmTagsToTriageQueueResultsPreviewQueryVariables>(AddCrmTagsToTriageQueueResultsPreviewDocument, options);
        }
export type AddCrmTagsToTriageQueueResultsPreviewQueryHookResult = ReturnType<typeof useAddCrmTagsToTriageQueueResultsPreviewQuery>;
export type AddCrmTagsToTriageQueueResultsPreviewLazyQueryHookResult = ReturnType<typeof useAddCrmTagsToTriageQueueResultsPreviewLazyQuery>;
export type AddCrmTagsToTriageQueueResultsPreviewQueryResult = Apollo.QueryResult<AddCrmTagsToTriageQueueResultsPreviewQuery, AddCrmTagsToTriageQueueResultsPreviewQueryVariables>;