import * as Types from '../types';

import { gql } from '@apollo/client';
import { ArticleListPartsFragmentDoc } from '../fragments/ArticleListParts.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArticlesListQueryVariables = Types.Exact<{
  input: Types.ArticleInputFetch;
}>;


export type ArticlesListQuery = { __typename?: 'Query', allArticleIds: Array<string>, fetchArticles: { __typename?: 'ArticleOutput', totalCount: number, selectAllArticleIds?: Array<string> | null, articles: Array<{ __typename?: 'Article', _id: string, title: string, status: string, publication_id?: string | null, production_id?: string | null, published?: any | null, preprint_date?: any | null, has_complete_abstract?: boolean | null, DOIStatus?: string | null, languages?: Array<string> | null, enabled_languages?: Array<string> | null, outdatedTranslations?: Array<string> | null, contentlength?: number | null, isPurchaseArticleFeatureOn?: boolean | null, isRentArticleFeatureOn?: boolean | null, purchaseAllowedCountries?: Array<Types.CountryEnum> | null, authors: Array<{ __typename?: 'Author', _id: string, display_name?: string | null }>, restrictions?: { __typename?: 'Restriction', article: Types.ArticleRestrictionEnum } | null, content: { __typename?: 'Content', article?: string | null }, categories: Array<{ __typename?: 'Category', displayName: string }> }> } };

export type UpdateArticleMutationVariables = Types.Exact<{
  input: Types.UpdateArticleInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', article?: { __typename?: 'Article', _id: string, title: string, status: string, publication_id?: string | null, descriptionSEO?: string | null, visibility: Types.VisibilityEnum, vid_length?: string | null, created: any, slug?: string | null, production_id?: string | null, published?: any | null, updated: any, preprint_date?: any | null, tags: Array<string>, comment_count: number, isPurchaseArticleFeatureOn?: boolean | null, isRentArticleFeatureOn?: boolean | null, authors: Array<{ __typename?: 'Author', _id: string, display_name?: string | null, role?: string | null, slug?: string | null }>, categories: Array<{ __typename?: 'Category', _id: string, short: string, displayName: string, color: string, slug: string }>, hospital?: { __typename?: 'Hospital', name: string } | null, image?: { __typename?: 'Image', filename?: string | null, geometry?: { __typename?: 'Geometry', width: number, height: number } | null } | null, restrictions?: { __typename?: 'Restriction', article: Types.ArticleRestrictionEnum } | null, wistia?: { __typename?: 'Wistia', duration?: number | null } | null } | null };

export type GenerateDoiArticleMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GenerateDoiArticleMutation = { __typename?: 'Mutation', article: { __typename?: 'Article', _id: string, title: string, status: string, publication_id?: string | null, descriptionSEO?: string | null, visibility: Types.VisibilityEnum, vid_length?: string | null, created: any, slug?: string | null, production_id?: string | null, published?: any | null, updated: any, preprint_date?: any | null, tags: Array<string>, comment_count: number, isPurchaseArticleFeatureOn?: boolean | null, isRentArticleFeatureOn?: boolean | null, authors: Array<{ __typename?: 'Author', _id: string, display_name?: string | null, role?: string | null, slug?: string | null }>, categories: Array<{ __typename?: 'Category', _id: string, short: string, displayName: string, color: string, slug: string }>, hospital?: { __typename?: 'Hospital', name: string } | null, image?: { __typename?: 'Image', filename?: string | null, geometry?: { __typename?: 'Geometry', width: number, height: number } | null } | null, restrictions?: { __typename?: 'Restriction', article: Types.ArticleRestrictionEnum } | null, wistia?: { __typename?: 'Wistia', duration?: number | null } | null } };

export type UpdateWistiaMetadataMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UpdateWistiaMetadataMutation = { __typename?: 'Mutation', updateWistiaMetadata: string };

export type TranslateArticlesMutationVariables = Types.Exact<{
  input: Types.TranslateArticlesInput;
}>;


export type TranslateArticlesMutation = { __typename?: 'Mutation', translateArticles: Array<{ __typename?: 'TranslationResult', publication_id: string, success: boolean, message?: string | null, language: string, slug: string }> };

export type CheckOutdatedTranslationsMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CheckOutdatedTranslationsMutation = { __typename?: 'Mutation', checkOutdatedTranslations: boolean };

export type AddLanguagesToExistingArticlesMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type AddLanguagesToExistingArticlesMutation = { __typename?: 'Mutation', addLanguagesToExistingArticles: string };

export type SetPurchaseSettingMutationVariables = Types.Exact<{
  input: Types.UpdatePurchaseSettingInput;
}>;


export type SetPurchaseSettingMutation = { __typename?: 'Mutation', updatePurchaseSetting: Array<{ __typename?: 'Article', publication_id?: string | null, slug?: string | null }> };

export type SelectedArticlesQueryVariables = Types.Exact<{
  article_ids: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type SelectedArticlesQuery = { __typename?: 'Query', articlesByIds: Array<{ __typename?: 'Article', _id: string, purchaseAllowedCountries?: Array<Types.CountryEnum> | null, isPurchaseArticleFeatureOn?: boolean | null, isRentArticleFeatureOn?: boolean | null }> };


export const ArticlesListDocument = gql`
    query ArticlesList($input: ArticleInputFetch!) {
  allArticleIds
  fetchArticles(input: $input) {
    totalCount
    selectAllArticleIds
    articles {
      _id
      title
      status
      publication_id
      production_id
      published
      preprint_date
      has_complete_abstract
      authors {
        _id
        display_name
      }
      restrictions {
        article
      }
      DOIStatus
      languages
      enabled_languages
      outdatedTranslations
      content {
        article
      }
      contentlength
      isPurchaseArticleFeatureOn
      isRentArticleFeatureOn
      purchaseAllowedCountries
      categories {
        displayName
      }
    }
  }
}
    `;

/**
 * __useArticlesListQuery__
 *
 * To run a query within a React component, call `useArticlesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticlesListQuery(baseOptions: Apollo.QueryHookOptions<ArticlesListQuery, ArticlesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesListQuery, ArticlesListQueryVariables>(ArticlesListDocument, options);
      }
export function useArticlesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesListQuery, ArticlesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesListQuery, ArticlesListQueryVariables>(ArticlesListDocument, options);
        }
export type ArticlesListQueryHookResult = ReturnType<typeof useArticlesListQuery>;
export type ArticlesListLazyQueryHookResult = ReturnType<typeof useArticlesListLazyQuery>;
export type ArticlesListQueryResult = Apollo.QueryResult<ArticlesListQuery, ArticlesListQueryVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($input: UpdateArticleInput!) {
  article: updateArticle(input: $input) {
    ...ArticleListParts
  }
}
    ${ArticleListPartsFragmentDoc}`;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const GenerateDoiArticleDocument = gql`
    mutation GenerateDOIArticle($id: String!) {
  article: generateDOI(id: $id) {
    ...ArticleListParts
  }
}
    ${ArticleListPartsFragmentDoc}`;
export type GenerateDoiArticleMutationFn = Apollo.MutationFunction<GenerateDoiArticleMutation, GenerateDoiArticleMutationVariables>;

/**
 * __useGenerateDoiArticleMutation__
 *
 * To run a mutation, you first call `useGenerateDoiArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateDoiArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateDoiArticleMutation, { data, loading, error }] = useGenerateDoiArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGenerateDoiArticleMutation(baseOptions?: Apollo.MutationHookOptions<GenerateDoiArticleMutation, GenerateDoiArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateDoiArticleMutation, GenerateDoiArticleMutationVariables>(GenerateDoiArticleDocument, options);
      }
export type GenerateDoiArticleMutationHookResult = ReturnType<typeof useGenerateDoiArticleMutation>;
export type GenerateDoiArticleMutationResult = Apollo.MutationResult<GenerateDoiArticleMutation>;
export type GenerateDoiArticleMutationOptions = Apollo.BaseMutationOptions<GenerateDoiArticleMutation, GenerateDoiArticleMutationVariables>;
export const UpdateWistiaMetadataDocument = gql`
    mutation UpdateWistiaMetadata {
  updateWistiaMetadata
}
    `;
export type UpdateWistiaMetadataMutationFn = Apollo.MutationFunction<UpdateWistiaMetadataMutation, UpdateWistiaMetadataMutationVariables>;

/**
 * __useUpdateWistiaMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateWistiaMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWistiaMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWistiaMetadataMutation, { data, loading, error }] = useUpdateWistiaMetadataMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateWistiaMetadataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWistiaMetadataMutation, UpdateWistiaMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWistiaMetadataMutation, UpdateWistiaMetadataMutationVariables>(UpdateWistiaMetadataDocument, options);
      }
export type UpdateWistiaMetadataMutationHookResult = ReturnType<typeof useUpdateWistiaMetadataMutation>;
export type UpdateWistiaMetadataMutationResult = Apollo.MutationResult<UpdateWistiaMetadataMutation>;
export type UpdateWistiaMetadataMutationOptions = Apollo.BaseMutationOptions<UpdateWistiaMetadataMutation, UpdateWistiaMetadataMutationVariables>;
export const TranslateArticlesDocument = gql`
    mutation TranslateArticles($input: TranslateArticlesInput!) {
  translateArticles(input: $input) {
    publication_id
    success
    message
    language
    slug
  }
}
    `;
export type TranslateArticlesMutationFn = Apollo.MutationFunction<TranslateArticlesMutation, TranslateArticlesMutationVariables>;

/**
 * __useTranslateArticlesMutation__
 *
 * To run a mutation, you first call `useTranslateArticlesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTranslateArticlesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [translateArticlesMutation, { data, loading, error }] = useTranslateArticlesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTranslateArticlesMutation(baseOptions?: Apollo.MutationHookOptions<TranslateArticlesMutation, TranslateArticlesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TranslateArticlesMutation, TranslateArticlesMutationVariables>(TranslateArticlesDocument, options);
      }
export type TranslateArticlesMutationHookResult = ReturnType<typeof useTranslateArticlesMutation>;
export type TranslateArticlesMutationResult = Apollo.MutationResult<TranslateArticlesMutation>;
export type TranslateArticlesMutationOptions = Apollo.BaseMutationOptions<TranslateArticlesMutation, TranslateArticlesMutationVariables>;
export const CheckOutdatedTranslationsDocument = gql`
    mutation CheckOutdatedTranslations {
  checkOutdatedTranslations
}
    `;
export type CheckOutdatedTranslationsMutationFn = Apollo.MutationFunction<CheckOutdatedTranslationsMutation, CheckOutdatedTranslationsMutationVariables>;

/**
 * __useCheckOutdatedTranslationsMutation__
 *
 * To run a mutation, you first call `useCheckOutdatedTranslationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckOutdatedTranslationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkOutdatedTranslationsMutation, { data, loading, error }] = useCheckOutdatedTranslationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useCheckOutdatedTranslationsMutation(baseOptions?: Apollo.MutationHookOptions<CheckOutdatedTranslationsMutation, CheckOutdatedTranslationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckOutdatedTranslationsMutation, CheckOutdatedTranslationsMutationVariables>(CheckOutdatedTranslationsDocument, options);
      }
export type CheckOutdatedTranslationsMutationHookResult = ReturnType<typeof useCheckOutdatedTranslationsMutation>;
export type CheckOutdatedTranslationsMutationResult = Apollo.MutationResult<CheckOutdatedTranslationsMutation>;
export type CheckOutdatedTranslationsMutationOptions = Apollo.BaseMutationOptions<CheckOutdatedTranslationsMutation, CheckOutdatedTranslationsMutationVariables>;
export const AddLanguagesToExistingArticlesDocument = gql`
    mutation AddLanguagesToExistingArticles {
  addLanguagesToExistingArticles
}
    `;
export type AddLanguagesToExistingArticlesMutationFn = Apollo.MutationFunction<AddLanguagesToExistingArticlesMutation, AddLanguagesToExistingArticlesMutationVariables>;

/**
 * __useAddLanguagesToExistingArticlesMutation__
 *
 * To run a mutation, you first call `useAddLanguagesToExistingArticlesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLanguagesToExistingArticlesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLanguagesToExistingArticlesMutation, { data, loading, error }] = useAddLanguagesToExistingArticlesMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddLanguagesToExistingArticlesMutation(baseOptions?: Apollo.MutationHookOptions<AddLanguagesToExistingArticlesMutation, AddLanguagesToExistingArticlesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLanguagesToExistingArticlesMutation, AddLanguagesToExistingArticlesMutationVariables>(AddLanguagesToExistingArticlesDocument, options);
      }
export type AddLanguagesToExistingArticlesMutationHookResult = ReturnType<typeof useAddLanguagesToExistingArticlesMutation>;
export type AddLanguagesToExistingArticlesMutationResult = Apollo.MutationResult<AddLanguagesToExistingArticlesMutation>;
export type AddLanguagesToExistingArticlesMutationOptions = Apollo.BaseMutationOptions<AddLanguagesToExistingArticlesMutation, AddLanguagesToExistingArticlesMutationVariables>;
export const SetPurchaseSettingDocument = gql`
    mutation SetPurchaseSetting($input: UpdatePurchaseSettingInput!) {
  updatePurchaseSetting(input: $input) {
    publication_id
    slug
  }
}
    `;
export type SetPurchaseSettingMutationFn = Apollo.MutationFunction<SetPurchaseSettingMutation, SetPurchaseSettingMutationVariables>;

/**
 * __useSetPurchaseSettingMutation__
 *
 * To run a mutation, you first call `useSetPurchaseSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPurchaseSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPurchaseSettingMutation, { data, loading, error }] = useSetPurchaseSettingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPurchaseSettingMutation(baseOptions?: Apollo.MutationHookOptions<SetPurchaseSettingMutation, SetPurchaseSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPurchaseSettingMutation, SetPurchaseSettingMutationVariables>(SetPurchaseSettingDocument, options);
      }
export type SetPurchaseSettingMutationHookResult = ReturnType<typeof useSetPurchaseSettingMutation>;
export type SetPurchaseSettingMutationResult = Apollo.MutationResult<SetPurchaseSettingMutation>;
export type SetPurchaseSettingMutationOptions = Apollo.BaseMutationOptions<SetPurchaseSettingMutation, SetPurchaseSettingMutationVariables>;
export const SelectedArticlesDocument = gql`
    query SelectedArticles($article_ids: [String!]!) {
  articlesByIds(article_ids: $article_ids) {
    _id
    purchaseAllowedCountries
    isPurchaseArticleFeatureOn
    isRentArticleFeatureOn
  }
}
    `;

/**
 * __useSelectedArticlesQuery__
 *
 * To run a query within a React component, call `useSelectedArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectedArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectedArticlesQuery({
 *   variables: {
 *      article_ids: // value for 'article_ids'
 *   },
 * });
 */
export function useSelectedArticlesQuery(baseOptions: Apollo.QueryHookOptions<SelectedArticlesQuery, SelectedArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SelectedArticlesQuery, SelectedArticlesQueryVariables>(SelectedArticlesDocument, options);
      }
export function useSelectedArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectedArticlesQuery, SelectedArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SelectedArticlesQuery, SelectedArticlesQueryVariables>(SelectedArticlesDocument, options);
        }
export type SelectedArticlesQueryHookResult = ReturnType<typeof useSelectedArticlesQuery>;
export type SelectedArticlesLazyQueryHookResult = ReturnType<typeof useSelectedArticlesLazyQuery>;
export type SelectedArticlesQueryResult = Apollo.QueryResult<SelectedArticlesQuery, SelectedArticlesQueryVariables>;