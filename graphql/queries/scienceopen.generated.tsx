import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetScienceOpenPubIdsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetScienceOpenPubIdsQuery = { __typename?: 'Query', getScienceOpenArticlesXml: Array<{ __typename?: 'ScienceOpenXml', articlePublicationId: string, generatedAt: any }> };

export type GetScienceOpenXmlByPublicationIdQueryVariables = Types.Exact<{
  pub_id: Types.Scalars['String'];
}>;


export type GetScienceOpenXmlByPublicationIdQuery = { __typename?: 'Query', getScienceOpenArticleByPubId?: { __typename?: 'ScienceOpenXml', generatedXml: string, articlePublicationId: string, generatedAt: any } | null | undefined };

export type GenerateAllScienceOpenXmlMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type GenerateAllScienceOpenXmlMutation = { __typename?: 'Mutation', generateAllScienceOpenXml: string };

export type ScienceOpenLastGeneratedQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ScienceOpenLastGeneratedQuery = { __typename?: 'Query', scienceOpenLastGeneratedAt?: any | null | undefined };


export const GetScienceOpenPubIdsDocument = gql`
    query GetScienceOpenPubIds {
  getScienceOpenArticlesXml {
    articlePublicationId
    generatedAt
  }
}
    `;

/**
 * __useGetScienceOpenPubIdsQuery__
 *
 * To run a query within a React component, call `useGetScienceOpenPubIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScienceOpenPubIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScienceOpenPubIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetScienceOpenPubIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetScienceOpenPubIdsQuery, GetScienceOpenPubIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScienceOpenPubIdsQuery, GetScienceOpenPubIdsQueryVariables>(GetScienceOpenPubIdsDocument, options);
      }
export function useGetScienceOpenPubIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScienceOpenPubIdsQuery, GetScienceOpenPubIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScienceOpenPubIdsQuery, GetScienceOpenPubIdsQueryVariables>(GetScienceOpenPubIdsDocument, options);
        }
export type GetScienceOpenPubIdsQueryHookResult = ReturnType<typeof useGetScienceOpenPubIdsQuery>;
export type GetScienceOpenPubIdsLazyQueryHookResult = ReturnType<typeof useGetScienceOpenPubIdsLazyQuery>;
export type GetScienceOpenPubIdsQueryResult = Apollo.QueryResult<GetScienceOpenPubIdsQuery, GetScienceOpenPubIdsQueryVariables>;
export const GetScienceOpenXmlByPublicationIdDocument = gql`
    query GetScienceOpenXmlByPublicationId($pub_id: String!) {
  getScienceOpenArticleByPubId(publication_id: $pub_id) {
    generatedXml
    articlePublicationId
    generatedAt
  }
}
    `;

/**
 * __useGetScienceOpenXmlByPublicationIdQuery__
 *
 * To run a query within a React component, call `useGetScienceOpenXmlByPublicationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScienceOpenXmlByPublicationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScienceOpenXmlByPublicationIdQuery({
 *   variables: {
 *      pub_id: // value for 'pub_id'
 *   },
 * });
 */
export function useGetScienceOpenXmlByPublicationIdQuery(baseOptions: Apollo.QueryHookOptions<GetScienceOpenXmlByPublicationIdQuery, GetScienceOpenXmlByPublicationIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScienceOpenXmlByPublicationIdQuery, GetScienceOpenXmlByPublicationIdQueryVariables>(GetScienceOpenXmlByPublicationIdDocument, options);
      }
export function useGetScienceOpenXmlByPublicationIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScienceOpenXmlByPublicationIdQuery, GetScienceOpenXmlByPublicationIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScienceOpenXmlByPublicationIdQuery, GetScienceOpenXmlByPublicationIdQueryVariables>(GetScienceOpenXmlByPublicationIdDocument, options);
        }
export type GetScienceOpenXmlByPublicationIdQueryHookResult = ReturnType<typeof useGetScienceOpenXmlByPublicationIdQuery>;
export type GetScienceOpenXmlByPublicationIdLazyQueryHookResult = ReturnType<typeof useGetScienceOpenXmlByPublicationIdLazyQuery>;
export type GetScienceOpenXmlByPublicationIdQueryResult = Apollo.QueryResult<GetScienceOpenXmlByPublicationIdQuery, GetScienceOpenXmlByPublicationIdQueryVariables>;
export const GenerateAllScienceOpenXmlDocument = gql`
    mutation GenerateAllScienceOpenXml {
  generateAllScienceOpenXml
}
    `;
export type GenerateAllScienceOpenXmlMutationFn = Apollo.MutationFunction<GenerateAllScienceOpenXmlMutation, GenerateAllScienceOpenXmlMutationVariables>;

/**
 * __useGenerateAllScienceOpenXmlMutation__
 *
 * To run a mutation, you first call `useGenerateAllScienceOpenXmlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateAllScienceOpenXmlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateAllScienceOpenXmlMutation, { data, loading, error }] = useGenerateAllScienceOpenXmlMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateAllScienceOpenXmlMutation(baseOptions?: Apollo.MutationHookOptions<GenerateAllScienceOpenXmlMutation, GenerateAllScienceOpenXmlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateAllScienceOpenXmlMutation, GenerateAllScienceOpenXmlMutationVariables>(GenerateAllScienceOpenXmlDocument, options);
      }
export type GenerateAllScienceOpenXmlMutationHookResult = ReturnType<typeof useGenerateAllScienceOpenXmlMutation>;
export type GenerateAllScienceOpenXmlMutationResult = Apollo.MutationResult<GenerateAllScienceOpenXmlMutation>;
export type GenerateAllScienceOpenXmlMutationOptions = Apollo.BaseMutationOptions<GenerateAllScienceOpenXmlMutation, GenerateAllScienceOpenXmlMutationVariables>;
export const ScienceOpenLastGeneratedDocument = gql`
    query ScienceOpenLastGenerated {
  scienceOpenLastGeneratedAt
}
    `;

/**
 * __useScienceOpenLastGeneratedQuery__
 *
 * To run a query within a React component, call `useScienceOpenLastGeneratedQuery` and pass it any options that fit your needs.
 * When your component renders, `useScienceOpenLastGeneratedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScienceOpenLastGeneratedQuery({
 *   variables: {
 *   },
 * });
 */
export function useScienceOpenLastGeneratedQuery(baseOptions?: Apollo.QueryHookOptions<ScienceOpenLastGeneratedQuery, ScienceOpenLastGeneratedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScienceOpenLastGeneratedQuery, ScienceOpenLastGeneratedQueryVariables>(ScienceOpenLastGeneratedDocument, options);
      }
export function useScienceOpenLastGeneratedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScienceOpenLastGeneratedQuery, ScienceOpenLastGeneratedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScienceOpenLastGeneratedQuery, ScienceOpenLastGeneratedQueryVariables>(ScienceOpenLastGeneratedDocument, options);
        }
export type ScienceOpenLastGeneratedQueryHookResult = ReturnType<typeof useScienceOpenLastGeneratedQuery>;
export type ScienceOpenLastGeneratedLazyQueryHookResult = ReturnType<typeof useScienceOpenLastGeneratedLazyQuery>;
export type ScienceOpenLastGeneratedQueryResult = Apollo.QueryResult<ScienceOpenLastGeneratedQuery, ScienceOpenLastGeneratedQueryVariables>;