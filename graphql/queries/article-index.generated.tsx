import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllArticleVotesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllArticleVotesQuery = { __typename?: 'Query', allArticleVotes: Array<{ __typename?: 'NewArticleVote', t: string, v: number }> };

export type GetUserArticleVotesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserArticleVotesQuery = { __typename?: 'Query', userArticleVotes: Array<{ __typename?: 'NewArticleVote', t: string, v: number }> };

export type AddVoteMutationVariables = Types.Exact<{
  article_title: Types.Scalars['String']['input'];
}>;


export type AddVoteMutation = { __typename?: 'Mutation', addVote: { __typename?: 'NewArticleVote', t: string, v: number } };

export type RedactVoteMutationVariables = Types.Exact<{
  article_title: Types.Scalars['String']['input'];
}>;


export type RedactVoteMutation = { __typename?: 'Mutation', redactVote: { __typename?: 'NewArticleVote', t: string, v: number } };


export const AllArticleVotesDocument = gql`
    query AllArticleVotes {
  allArticleVotes {
    t
    v
  }
}
    `;

/**
 * __useAllArticleVotesQuery__
 *
 * To run a query within a React component, call `useAllArticleVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllArticleVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllArticleVotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllArticleVotesQuery(baseOptions?: Apollo.QueryHookOptions<AllArticleVotesQuery, AllArticleVotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllArticleVotesQuery, AllArticleVotesQueryVariables>(AllArticleVotesDocument, options);
      }
export function useAllArticleVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllArticleVotesQuery, AllArticleVotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllArticleVotesQuery, AllArticleVotesQueryVariables>(AllArticleVotesDocument, options);
        }
export type AllArticleVotesQueryHookResult = ReturnType<typeof useAllArticleVotesQuery>;
export type AllArticleVotesLazyQueryHookResult = ReturnType<typeof useAllArticleVotesLazyQuery>;
export type AllArticleVotesQueryResult = Apollo.QueryResult<AllArticleVotesQuery, AllArticleVotesQueryVariables>;
export const GetUserArticleVotesDocument = gql`
    query GetUserArticleVotes {
  userArticleVotes {
    t
    v
  }
}
    `;

/**
 * __useGetUserArticleVotesQuery__
 *
 * To run a query within a React component, call `useGetUserArticleVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserArticleVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserArticleVotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserArticleVotesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserArticleVotesQuery, GetUserArticleVotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserArticleVotesQuery, GetUserArticleVotesQueryVariables>(GetUserArticleVotesDocument, options);
      }
export function useGetUserArticleVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserArticleVotesQuery, GetUserArticleVotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserArticleVotesQuery, GetUserArticleVotesQueryVariables>(GetUserArticleVotesDocument, options);
        }
export type GetUserArticleVotesQueryHookResult = ReturnType<typeof useGetUserArticleVotesQuery>;
export type GetUserArticleVotesLazyQueryHookResult = ReturnType<typeof useGetUserArticleVotesLazyQuery>;
export type GetUserArticleVotesQueryResult = Apollo.QueryResult<GetUserArticleVotesQuery, GetUserArticleVotesQueryVariables>;
export const AddVoteDocument = gql`
    mutation AddVote($article_title: String!) {
  addVote(article_title: $article_title) {
    t
    v
  }
}
    `;
export type AddVoteMutationFn = Apollo.MutationFunction<AddVoteMutation, AddVoteMutationVariables>;

/**
 * __useAddVoteMutation__
 *
 * To run a mutation, you first call `useAddVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVoteMutation, { data, loading, error }] = useAddVoteMutation({
 *   variables: {
 *      article_title: // value for 'article_title'
 *   },
 * });
 */
export function useAddVoteMutation(baseOptions?: Apollo.MutationHookOptions<AddVoteMutation, AddVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddVoteMutation, AddVoteMutationVariables>(AddVoteDocument, options);
      }
export type AddVoteMutationHookResult = ReturnType<typeof useAddVoteMutation>;
export type AddVoteMutationResult = Apollo.MutationResult<AddVoteMutation>;
export type AddVoteMutationOptions = Apollo.BaseMutationOptions<AddVoteMutation, AddVoteMutationVariables>;
export const RedactVoteDocument = gql`
    mutation RedactVote($article_title: String!) {
  redactVote(article_title: $article_title) {
    t
    v
  }
}
    `;
export type RedactVoteMutationFn = Apollo.MutationFunction<RedactVoteMutation, RedactVoteMutationVariables>;

/**
 * __useRedactVoteMutation__
 *
 * To run a mutation, you first call `useRedactVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRedactVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [redactVoteMutation, { data, loading, error }] = useRedactVoteMutation({
 *   variables: {
 *      article_title: // value for 'article_title'
 *   },
 * });
 */
export function useRedactVoteMutation(baseOptions?: Apollo.MutationHookOptions<RedactVoteMutation, RedactVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RedactVoteMutation, RedactVoteMutationVariables>(RedactVoteDocument, options);
      }
export type RedactVoteMutationHookResult = ReturnType<typeof useRedactVoteMutation>;
export type RedactVoteMutationResult = Apollo.MutationResult<RedactVoteMutation>;
export type RedactVoteMutationOptions = Apollo.BaseMutationOptions<RedactVoteMutation, RedactVoteMutationVariables>;