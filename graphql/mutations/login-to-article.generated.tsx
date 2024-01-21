import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LoginToArticleMutationVariables = Types.Exact<{
  publication_id: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type LoginToArticleMutation = { __typename?: 'Mutation', loginToArticle: boolean };


export const LoginToArticleDocument = gql`
    mutation LoginToArticle($publication_id: String!, $password: String!) {
  loginToArticle(publication_id: $publication_id, password: $password)
}
    `;
export type LoginToArticleMutationFn = Apollo.MutationFunction<LoginToArticleMutation, LoginToArticleMutationVariables>;

/**
 * __useLoginToArticleMutation__
 *
 * To run a mutation, you first call `useLoginToArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginToArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginToArticleMutation, { data, loading, error }] = useLoginToArticleMutation({
 *   variables: {
 *      publication_id: // value for 'publication_id'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginToArticleMutation(baseOptions?: Apollo.MutationHookOptions<LoginToArticleMutation, LoginToArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginToArticleMutation, LoginToArticleMutationVariables>(LoginToArticleDocument, options);
      }
export type LoginToArticleMutationHookResult = ReturnType<typeof useLoginToArticleMutation>;
export type LoginToArticleMutationResult = Apollo.MutationResult<LoginToArticleMutation>;
export type LoginToArticleMutationOptions = Apollo.BaseMutationOptions<LoginToArticleMutation, LoginToArticleMutationVariables>;