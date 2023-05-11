import * as Types from '../types';

import { gql } from '@apollo/client';
import { UserListPartsFragmentDoc, UserDetailFragmentDoc } from './UserListParts.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UserManagementListQueryVariables = Types.Exact<{
  input: Types.UserInput;
}>;


export type UserManagementListQuery = { __typename?: 'Query', users: { __typename?: 'UserOutput', count: number, dbQueryString: string, users: Array<{ __typename?: 'User', _id: string, display_name?: string | null | undefined, email: string, role: Types.UserRoles, user_type?: string | null | undefined, specialty?: string | null | undefined, institution?: string | null | undefined, institution_name?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, user_type_other?: string | null | undefined, created: any, total_time_watched?: number | null | undefined, articleCount?: number | null | undefined, subActive: boolean, loginCount?: number | null | undefined, promo_code?: string | null | undefined, isSubscribed?: boolean | null | undefined, last_visited?: any | null | undefined, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined, emailNeedsConfirm?: boolean | null | undefined, instEmailVerified?: boolean | null | undefined, institutionalEmail?: string | null | undefined, referer?: string | null | undefined, referrerPath?: string | null | undefined, anon_link_id?: string | null | undefined, hasRequestedSubscription?: boolean | null | undefined, requestSubscriptionCount?: number | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined, middle?: string | null | undefined, nickname?: string | null | undefined }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined, fromInst?: string | null | undefined, lastSubType?: Types.SubType | null | undefined, lastSubTypeExpiry?: any | null | undefined } | null | undefined, social?: { __typename?: 'Social', google?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined, linkedin?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined, facebook?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined } | null | undefined }> } };

export type UseUserByInstitutionListQueryVariables = Types.Exact<{
  instId: Types.Scalars['String'];
  input: Types.UserInput;
}>;


export type UseUserByInstitutionListQuery = { __typename?: 'Query', usersByInstitution: { __typename?: 'UserOutput', count: number, users: Array<{ __typename?: 'User', _id: string, display_name?: string | null | undefined, email: string, role: Types.UserRoles, user_type?: string | null | undefined, specialty?: string | null | undefined, institution?: string | null | undefined, institution_name?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, user_type_other?: string | null | undefined, created: any, total_time_watched?: number | null | undefined, articleCount?: number | null | undefined, subActive: boolean, loginCount?: number | null | undefined, promo_code?: string | null | undefined, isSubscribed?: boolean | null | undefined, last_visited?: any | null | undefined, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined, emailNeedsConfirm?: boolean | null | undefined, instEmailVerified?: boolean | null | undefined, institutionalEmail?: string | null | undefined, referer?: string | null | undefined, referrerPath?: string | null | undefined, anon_link_id?: string | null | undefined, hasRequestedSubscription?: boolean | null | undefined, requestSubscriptionCount?: number | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined, middle?: string | null | undefined, nickname?: string | null | undefined }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined, fromInst?: string | null | undefined, lastSubType?: Types.SubType | null | undefined, lastSubTypeExpiry?: any | null | undefined } | null | undefined, social?: { __typename?: 'Social', google?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined, linkedin?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined, facebook?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined } | null | undefined }> } };

export type DownloadUserListQueryVariables = Types.Exact<{
  input: Types.UserInput;
}>;


export type DownloadUserListQuery = { __typename?: 'Query', users: { __typename?: 'UserOutput', users: Array<{ __typename?: 'User', _id: string, display_name?: string | null | undefined, email: string, role: Types.UserRoles, user_type?: string | null | undefined, specialty?: string | null | undefined, institution?: string | null | undefined, institution_name?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, user_type_other?: string | null | undefined, created: any, total_time_watched?: number | null | undefined, articleCount?: number | null | undefined, subActive: boolean, loginCount?: number | null | undefined, promo_code?: string | null | undefined, isSubscribed?: boolean | null | undefined, last_visited?: any | null | undefined, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined, emailNeedsConfirm?: boolean | null | undefined, instEmailVerified?: boolean | null | undefined, institutionalEmail?: string | null | undefined, referer?: string | null | undefined, referrerPath?: string | null | undefined, anon_link_id?: string | null | undefined, hasRequestedSubscription?: boolean | null | undefined, requestSubscriptionCount?: number | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined, middle?: string | null | undefined, nickname?: string | null | undefined }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined, fromInst?: string | null | undefined, lastSubType?: Types.SubType | null | undefined, lastSubTypeExpiry?: any | null | undefined } | null | undefined, social?: { __typename?: 'Social', google?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined, linkedin?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined, facebook?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined } | null | undefined }> } };

export type CreatUserMutationVariables = Types.Exact<{
  input: Types.AddUserInput;
}>;


export type CreatUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, display_name?: string | null | undefined, email: string, role: Types.UserRoles, user_type?: string | null | undefined, specialty?: string | null | undefined, institution?: string | null | undefined, institution_name?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, user_type_other?: string | null | undefined, created: any, total_time_watched?: number | null | undefined, articleCount?: number | null | undefined, subActive: boolean, loginCount?: number | null | undefined, promo_code?: string | null | undefined, isSubscribed?: boolean | null | undefined, last_visited?: any | null | undefined, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined, emailNeedsConfirm?: boolean | null | undefined, instEmailVerified?: boolean | null | undefined, institutionalEmail?: string | null | undefined, referer?: string | null | undefined, referrerPath?: string | null | undefined, anon_link_id?: string | null | undefined, hasRequestedSubscription?: boolean | null | undefined, requestSubscriptionCount?: number | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined, middle?: string | null | undefined, nickname?: string | null | undefined }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined, fromInst?: string | null | undefined, lastSubType?: Types.SubType | null | undefined, lastSubTypeExpiry?: any | null | undefined } | null | undefined, social?: { __typename?: 'Social', google?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined, linkedin?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined, facebook?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined } | null | undefined } };

export type UpdateUserCmsMutationVariables = Types.Exact<{
  input: Types.UpdateUserInput;
}>;


export type UpdateUserCmsMutation = { __typename?: 'Mutation', updateUserCms: { __typename?: 'User', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, created: any, last_visited?: any | null | undefined, slug?: string | null | undefined, role: Types.UserRoles, phone?: string | null | undefined, institution?: string | null | undefined, institution_name?: string | null | undefined, institutionalEmail?: string | null | undefined, matchedBy?: Types.MatchedBy | null | undefined, matchStatus?: Types.MatchStatus | null | undefined, interests?: Array<string> | null | undefined, emailNeedsConfirm?: boolean | null | undefined, instEmailVerified?: boolean | null | undefined, hasManualBlock?: boolean | null | undefined, manualBlockMessage?: string | null | undefined, deleted?: boolean | null | undefined, email_preference?: Types.EmailPreference | null | undefined, signInToken?: string | null | undefined, subActive: boolean, isTrialFeatureOn?: boolean | null | undefined, trialDuration?: number | null | undefined, referer?: string | null | undefined, referrerPath?: string | null | undefined, anon_link_id?: string | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined }, image?: { __typename?: 'Image', filename?: string | null | undefined, length?: number | null | undefined, format?: string | null | undefined } | null | undefined, social?: { __typename?: 'Social', google?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null | undefined } | null | undefined, linkedin?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null | undefined } | null | undefined, facebook?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null | undefined } | null | undefined } | null | undefined, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined, fromInst?: string | null | undefined } | null | undefined } };

export type UserDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type UserDetailQuery = { __typename?: 'Query', userById?: { __typename?: 'User', accessExpiredAt?: any | null | undefined, lastSubType?: Types.SubType | null | undefined, _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, created: any, last_visited?: any | null | undefined, slug?: string | null | undefined, role: Types.UserRoles, phone?: string | null | undefined, institution?: string | null | undefined, institution_name?: string | null | undefined, institutionalEmail?: string | null | undefined, matchedBy?: Types.MatchedBy | null | undefined, matchStatus?: Types.MatchStatus | null | undefined, interests?: Array<string> | null | undefined, emailNeedsConfirm?: boolean | null | undefined, instEmailVerified?: boolean | null | undefined, hasManualBlock?: boolean | null | undefined, manualBlockMessage?: string | null | undefined, deleted?: boolean | null | undefined, email_preference?: Types.EmailPreference | null | undefined, signInToken?: string | null | undefined, subActive: boolean, isTrialFeatureOn?: boolean | null | undefined, trialDuration?: number | null | undefined, referer?: string | null | undefined, referrerPath?: string | null | undefined, anon_link_id?: string | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined }, image?: { __typename?: 'Image', filename?: string | null | undefined, length?: number | null | undefined, format?: string | null | undefined } | null | undefined, social?: { __typename?: 'Social', google?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null | undefined } | null | undefined, linkedin?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null | undefined } | null | undefined, facebook?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null | undefined } | null | undefined } | null | undefined, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined, fromInst?: string | null | undefined } | null | undefined } | null | undefined };

export type CreateSignInTokenMutationVariables = Types.Exact<{
  input: Types.CreateSignInTokenInput;
}>;


export type CreateSignInTokenMutation = { __typename?: 'Mutation', token: string };

export type DeleteSignInTokenMutationVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
}>;


export type DeleteSignInTokenMutation = { __typename?: 'Mutation', deleteSignInToken: boolean };

export type AddCrmTagsToFoundUsersMutationVariables = Types.Exact<{
  input: Types.UserInput;
  tags: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type AddCrmTagsToFoundUsersMutation = { __typename?: 'Mutation', addCRMTagsToUsers: boolean };


export const UserManagementListDocument = gql`
    query UserManagementList($input: UserInput!) {
  users(input: $input) {
    count
    users {
      ...UserListParts
    }
    dbQueryString
  }
}
    ${UserListPartsFragmentDoc}`;

/**
 * __useUserManagementListQuery__
 *
 * To run a query within a React component, call `useUserManagementListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserManagementListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserManagementListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserManagementListQuery(baseOptions: Apollo.QueryHookOptions<UserManagementListQuery, UserManagementListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserManagementListQuery, UserManagementListQueryVariables>(UserManagementListDocument, options);
      }
export function useUserManagementListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserManagementListQuery, UserManagementListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserManagementListQuery, UserManagementListQueryVariables>(UserManagementListDocument, options);
        }
export type UserManagementListQueryHookResult = ReturnType<typeof useUserManagementListQuery>;
export type UserManagementListLazyQueryHookResult = ReturnType<typeof useUserManagementListLazyQuery>;
export type UserManagementListQueryResult = Apollo.QueryResult<UserManagementListQuery, UserManagementListQueryVariables>;
export const UseUserByInstitutionListDocument = gql`
    query useUserByInstitutionList($instId: String!, $input: UserInput!) {
  usersByInstitution(instId: $instId, input: $input) {
    count
    users {
      ...UserListParts
    }
  }
}
    ${UserListPartsFragmentDoc}`;

/**
 * __useUseUserByInstitutionListQuery__
 *
 * To run a query within a React component, call `useUseUserByInstitutionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUseUserByInstitutionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUseUserByInstitutionListQuery({
 *   variables: {
 *      instId: // value for 'instId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUseUserByInstitutionListQuery(baseOptions: Apollo.QueryHookOptions<UseUserByInstitutionListQuery, UseUserByInstitutionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UseUserByInstitutionListQuery, UseUserByInstitutionListQueryVariables>(UseUserByInstitutionListDocument, options);
      }
export function useUseUserByInstitutionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UseUserByInstitutionListQuery, UseUserByInstitutionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UseUserByInstitutionListQuery, UseUserByInstitutionListQueryVariables>(UseUserByInstitutionListDocument, options);
        }
export type UseUserByInstitutionListQueryHookResult = ReturnType<typeof useUseUserByInstitutionListQuery>;
export type UseUserByInstitutionListLazyQueryHookResult = ReturnType<typeof useUseUserByInstitutionListLazyQuery>;
export type UseUserByInstitutionListQueryResult = Apollo.QueryResult<UseUserByInstitutionListQuery, UseUserByInstitutionListQueryVariables>;
export const DownloadUserListDocument = gql`
    query DownloadUserList($input: UserInput!) {
  users(input: $input) {
    users {
      ...UserListParts
    }
  }
}
    ${UserListPartsFragmentDoc}`;

/**
 * __useDownloadUserListQuery__
 *
 * To run a query within a React component, call `useDownloadUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useDownloadUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDownloadUserListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDownloadUserListQuery(baseOptions: Apollo.QueryHookOptions<DownloadUserListQuery, DownloadUserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DownloadUserListQuery, DownloadUserListQueryVariables>(DownloadUserListDocument, options);
      }
export function useDownloadUserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DownloadUserListQuery, DownloadUserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DownloadUserListQuery, DownloadUserListQueryVariables>(DownloadUserListDocument, options);
        }
export type DownloadUserListQueryHookResult = ReturnType<typeof useDownloadUserListQuery>;
export type DownloadUserListLazyQueryHookResult = ReturnType<typeof useDownloadUserListLazyQuery>;
export type DownloadUserListQueryResult = Apollo.QueryResult<DownloadUserListQuery, DownloadUserListQueryVariables>;
export const CreatUserDocument = gql`
    mutation CreatUser($input: AddUserInput!) {
  createUser(input: $input) {
    ...UserListParts
  }
}
    ${UserListPartsFragmentDoc}`;
export type CreatUserMutationFn = Apollo.MutationFunction<CreatUserMutation, CreatUserMutationVariables>;

/**
 * __useCreatUserMutation__
 *
 * To run a mutation, you first call `useCreatUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [creatUserMutation, { data, loading, error }] = useCreatUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatUserMutation(baseOptions?: Apollo.MutationHookOptions<CreatUserMutation, CreatUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatUserMutation, CreatUserMutationVariables>(CreatUserDocument, options);
      }
export type CreatUserMutationHookResult = ReturnType<typeof useCreatUserMutation>;
export type CreatUserMutationResult = Apollo.MutationResult<CreatUserMutation>;
export type CreatUserMutationOptions = Apollo.BaseMutationOptions<CreatUserMutation, CreatUserMutationVariables>;
export const UpdateUserCmsDocument = gql`
    mutation UpdateUserCms($input: UpdateUserInput!) {
  updateUserCms(input: $input) {
    ...UserDetail
  }
}
    ${UserDetailFragmentDoc}`;
export type UpdateUserCmsMutationFn = Apollo.MutationFunction<UpdateUserCmsMutation, UpdateUserCmsMutationVariables>;

/**
 * __useUpdateUserCmsMutation__
 *
 * To run a mutation, you first call `useUpdateUserCmsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserCmsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserCmsMutation, { data, loading, error }] = useUpdateUserCmsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserCmsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserCmsMutation, UpdateUserCmsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserCmsMutation, UpdateUserCmsMutationVariables>(UpdateUserCmsDocument, options);
      }
export type UpdateUserCmsMutationHookResult = ReturnType<typeof useUpdateUserCmsMutation>;
export type UpdateUserCmsMutationResult = Apollo.MutationResult<UpdateUserCmsMutation>;
export type UpdateUserCmsMutationOptions = Apollo.BaseMutationOptions<UpdateUserCmsMutation, UpdateUserCmsMutationVariables>;
export const UserDetailDocument = gql`
    query UserDetail($id: String!) {
  userById(id: $id) {
    ...UserDetail
    accessExpiredAt
    lastSubType
  }
}
    ${UserDetailFragmentDoc}`;

/**
 * __useUserDetailQuery__
 *
 * To run a query within a React component, call `useUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserDetailQuery(baseOptions: Apollo.QueryHookOptions<UserDetailQuery, UserDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserDetailQuery, UserDetailQueryVariables>(UserDetailDocument, options);
      }
export function useUserDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDetailQuery, UserDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserDetailQuery, UserDetailQueryVariables>(UserDetailDocument, options);
        }
export type UserDetailQueryHookResult = ReturnType<typeof useUserDetailQuery>;
export type UserDetailLazyQueryHookResult = ReturnType<typeof useUserDetailLazyQuery>;
export type UserDetailQueryResult = Apollo.QueryResult<UserDetailQuery, UserDetailQueryVariables>;
export const CreateSignInTokenDocument = gql`
    mutation CreateSignInToken($input: CreateSignInTokenInput!) {
  token: createSignInToken(input: $input)
}
    `;
export type CreateSignInTokenMutationFn = Apollo.MutationFunction<CreateSignInTokenMutation, CreateSignInTokenMutationVariables>;

/**
 * __useCreateSignInTokenMutation__
 *
 * To run a mutation, you first call `useCreateSignInTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSignInTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSignInTokenMutation, { data, loading, error }] = useCreateSignInTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSignInTokenMutation(baseOptions?: Apollo.MutationHookOptions<CreateSignInTokenMutation, CreateSignInTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSignInTokenMutation, CreateSignInTokenMutationVariables>(CreateSignInTokenDocument, options);
      }
export type CreateSignInTokenMutationHookResult = ReturnType<typeof useCreateSignInTokenMutation>;
export type CreateSignInTokenMutationResult = Apollo.MutationResult<CreateSignInTokenMutation>;
export type CreateSignInTokenMutationOptions = Apollo.BaseMutationOptions<CreateSignInTokenMutation, CreateSignInTokenMutationVariables>;
export const DeleteSignInTokenDocument = gql`
    mutation DeleteSignInToken($user_id: String!) {
  deleteSignInToken(user_id: $user_id)
}
    `;
export type DeleteSignInTokenMutationFn = Apollo.MutationFunction<DeleteSignInTokenMutation, DeleteSignInTokenMutationVariables>;

/**
 * __useDeleteSignInTokenMutation__
 *
 * To run a mutation, you first call `useDeleteSignInTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSignInTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSignInTokenMutation, { data, loading, error }] = useDeleteSignInTokenMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useDeleteSignInTokenMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSignInTokenMutation, DeleteSignInTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSignInTokenMutation, DeleteSignInTokenMutationVariables>(DeleteSignInTokenDocument, options);
      }
export type DeleteSignInTokenMutationHookResult = ReturnType<typeof useDeleteSignInTokenMutation>;
export type DeleteSignInTokenMutationResult = Apollo.MutationResult<DeleteSignInTokenMutation>;
export type DeleteSignInTokenMutationOptions = Apollo.BaseMutationOptions<DeleteSignInTokenMutation, DeleteSignInTokenMutationVariables>;
export const AddCrmTagsToFoundUsersDocument = gql`
    mutation AddCRMTagsToFoundUsers($input: UserInput!, $tags: [String!]!) {
  addCRMTagsToUsers(input: $input, tags: $tags)
}
    `;
export type AddCrmTagsToFoundUsersMutationFn = Apollo.MutationFunction<AddCrmTagsToFoundUsersMutation, AddCrmTagsToFoundUsersMutationVariables>;

/**
 * __useAddCrmTagsToFoundUsersMutation__
 *
 * To run a mutation, you first call `useAddCrmTagsToFoundUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCrmTagsToFoundUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCrmTagsToFoundUsersMutation, { data, loading, error }] = useAddCrmTagsToFoundUsersMutation({
 *   variables: {
 *      input: // value for 'input'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddCrmTagsToFoundUsersMutation(baseOptions?: Apollo.MutationHookOptions<AddCrmTagsToFoundUsersMutation, AddCrmTagsToFoundUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCrmTagsToFoundUsersMutation, AddCrmTagsToFoundUsersMutationVariables>(AddCrmTagsToFoundUsersDocument, options);
      }
export type AddCrmTagsToFoundUsersMutationHookResult = ReturnType<typeof useAddCrmTagsToFoundUsersMutation>;
export type AddCrmTagsToFoundUsersMutationResult = Apollo.MutationResult<AddCrmTagsToFoundUsersMutation>;
export type AddCrmTagsToFoundUsersMutationOptions = Apollo.BaseMutationOptions<AddCrmTagsToFoundUsersMutation, AddCrmTagsToFoundUsersMutationVariables>;