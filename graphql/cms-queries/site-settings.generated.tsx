import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SiteSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SiteSettingsQuery = { __typename?: 'Query', getSiteSettings: { __typename?: 'SiteSetting', isRentArticleFeatureOn: boolean, isPurchaseArticleFeatureOn: boolean, isRequestInstSubButtonPaperOn: boolean, displayPurchaseAndRentToAdminOnly: boolean, rentDuration: number, updated: any, updatedBy?: { __typename?: 'User', display_name?: string | null | undefined, _id: string } | null | undefined } };

export type UpdateSiteSettingsMutationVariables = Types.Exact<{
  input: Types.UpdateSiteSettingInput;
}>;


export type UpdateSiteSettingsMutation = { __typename?: 'Mutation', updateSiteSettings: { __typename?: 'SiteSetting', isRentArticleFeatureOn: boolean, isPurchaseArticleFeatureOn: boolean, displayPurchaseAndRentToAdminOnly: boolean, rentDuration: number, isRequestInstSubButtonPaperOn: boolean, updated: any, updatedBy?: { __typename?: 'User', display_name?: string | null | undefined, _id: string } | null | undefined } };

export type AddHashToTranslationsMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type AddHashToTranslationsMutation = { __typename?: 'Mutation', addTranslationsHash: string };


export const SiteSettingsDocument = gql`
    query SiteSettings {
  getSiteSettings {
    isRentArticleFeatureOn
    isPurchaseArticleFeatureOn
    isRequestInstSubButtonPaperOn
    displayPurchaseAndRentToAdminOnly
    rentDuration
    updated
    updatedBy {
      display_name
      _id
    }
  }
}
    `;

/**
 * __useSiteSettingsQuery__
 *
 * To run a query within a React component, call `useSiteSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSiteSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSiteSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSiteSettingsQuery(baseOptions?: Apollo.QueryHookOptions<SiteSettingsQuery, SiteSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SiteSettingsQuery, SiteSettingsQueryVariables>(SiteSettingsDocument, options);
      }
export function useSiteSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SiteSettingsQuery, SiteSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SiteSettingsQuery, SiteSettingsQueryVariables>(SiteSettingsDocument, options);
        }
export type SiteSettingsQueryHookResult = ReturnType<typeof useSiteSettingsQuery>;
export type SiteSettingsLazyQueryHookResult = ReturnType<typeof useSiteSettingsLazyQuery>;
export type SiteSettingsQueryResult = Apollo.QueryResult<SiteSettingsQuery, SiteSettingsQueryVariables>;
export const UpdateSiteSettingsDocument = gql`
    mutation UpdateSiteSettings($input: UpdateSiteSettingInput!) {
  updateSiteSettings(input: $input) {
    isRentArticleFeatureOn
    isPurchaseArticleFeatureOn
    displayPurchaseAndRentToAdminOnly
    rentDuration
    isRequestInstSubButtonPaperOn
    updated
    updatedBy {
      display_name
      _id
    }
  }
}
    `;
export type UpdateSiteSettingsMutationFn = Apollo.MutationFunction<UpdateSiteSettingsMutation, UpdateSiteSettingsMutationVariables>;

/**
 * __useUpdateSiteSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateSiteSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSiteSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSiteSettingsMutation, { data, loading, error }] = useUpdateSiteSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSiteSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSiteSettingsMutation, UpdateSiteSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSiteSettingsMutation, UpdateSiteSettingsMutationVariables>(UpdateSiteSettingsDocument, options);
      }
export type UpdateSiteSettingsMutationHookResult = ReturnType<typeof useUpdateSiteSettingsMutation>;
export type UpdateSiteSettingsMutationResult = Apollo.MutationResult<UpdateSiteSettingsMutation>;
export type UpdateSiteSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateSiteSettingsMutation, UpdateSiteSettingsMutationVariables>;
export const AddHashToTranslationsDocument = gql`
    mutation AddHashToTranslations {
  addTranslationsHash
}
    `;
export type AddHashToTranslationsMutationFn = Apollo.MutationFunction<AddHashToTranslationsMutation, AddHashToTranslationsMutationVariables>;

/**
 * __useAddHashToTranslationsMutation__
 *
 * To run a mutation, you first call `useAddHashToTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHashToTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHashToTranslationsMutation, { data, loading, error }] = useAddHashToTranslationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddHashToTranslationsMutation(baseOptions?: Apollo.MutationHookOptions<AddHashToTranslationsMutation, AddHashToTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddHashToTranslationsMutation, AddHashToTranslationsMutationVariables>(AddHashToTranslationsDocument, options);
      }
export type AddHashToTranslationsMutationHookResult = ReturnType<typeof useAddHashToTranslationsMutation>;
export type AddHashToTranslationsMutationResult = Apollo.MutationResult<AddHashToTranslationsMutation>;
export type AddHashToTranslationsMutationOptions = Apollo.BaseMutationOptions<AddHashToTranslationsMutation, AddHashToTranslationsMutationVariables>;