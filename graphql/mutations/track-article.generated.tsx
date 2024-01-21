import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TrackArticleMutationVariables = Types.Exact<{
  input: Types.TrackArticleInput;
}>;


export type TrackArticleMutation = { __typename?: 'Mutation', trackArticle: boolean };

export type TrackVideoPlayMutationVariables = Types.Exact<{
  input: Types.TrackVideoInput;
}>;


export type TrackVideoPlayMutation = { __typename?: 'Mutation', trackVideoPlay?: string | null };

export type TrackVideoTimeMutationVariables = Types.Exact<{
  input: Types.TrackVideoTimeInput;
}>;


export type TrackVideoTimeMutation = { __typename?: 'Mutation', trackVideoTime: boolean };

export type TrackVideoBlockMutationVariables = Types.Exact<{
  input: Types.TrackVideoInput;
}>;


export type TrackVideoBlockMutation = { __typename?: 'Mutation', trackVideoBlock?: string | null };

export type TrackSubscribeMutationVariables = Types.Exact<{
  input: Types.TrackSubscribeInput;
}>;


export type TrackSubscribeMutation = { __typename?: 'Mutation', trackSubscribe: boolean };

export type TrackInitiateCheckoutMutationVariables = Types.Exact<{
  input: Types.TrackInitiateCheckoutInput;
}>;


export type TrackInitiateCheckoutMutation = { __typename?: 'Mutation', trackInitiateCheckout: boolean };

export type TrackSearchMutationVariables = Types.Exact<{
  input: Types.ArticleInput;
}>;


export type TrackSearchMutation = { __typename?: 'Mutation', trackSearch: boolean };


export const TrackArticleDocument = gql`
    mutation TrackArticle($input: TrackArticleInput!) {
  trackArticle(input: $input)
}
    `;
export type TrackArticleMutationFn = Apollo.MutationFunction<TrackArticleMutation, TrackArticleMutationVariables>;

/**
 * __useTrackArticleMutation__
 *
 * To run a mutation, you first call `useTrackArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackArticleMutation, { data, loading, error }] = useTrackArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackArticleMutation(baseOptions?: Apollo.MutationHookOptions<TrackArticleMutation, TrackArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackArticleMutation, TrackArticleMutationVariables>(TrackArticleDocument, options);
      }
export type TrackArticleMutationHookResult = ReturnType<typeof useTrackArticleMutation>;
export type TrackArticleMutationResult = Apollo.MutationResult<TrackArticleMutation>;
export type TrackArticleMutationOptions = Apollo.BaseMutationOptions<TrackArticleMutation, TrackArticleMutationVariables>;
export const TrackVideoPlayDocument = gql`
    mutation TrackVideoPlay($input: TrackVideoInput!) {
  trackVideoPlay(input: $input)
}
    `;
export type TrackVideoPlayMutationFn = Apollo.MutationFunction<TrackVideoPlayMutation, TrackVideoPlayMutationVariables>;

/**
 * __useTrackVideoPlayMutation__
 *
 * To run a mutation, you first call `useTrackVideoPlayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackVideoPlayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackVideoPlayMutation, { data, loading, error }] = useTrackVideoPlayMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackVideoPlayMutation(baseOptions?: Apollo.MutationHookOptions<TrackVideoPlayMutation, TrackVideoPlayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackVideoPlayMutation, TrackVideoPlayMutationVariables>(TrackVideoPlayDocument, options);
      }
export type TrackVideoPlayMutationHookResult = ReturnType<typeof useTrackVideoPlayMutation>;
export type TrackVideoPlayMutationResult = Apollo.MutationResult<TrackVideoPlayMutation>;
export type TrackVideoPlayMutationOptions = Apollo.BaseMutationOptions<TrackVideoPlayMutation, TrackVideoPlayMutationVariables>;
export const TrackVideoTimeDocument = gql`
    mutation TrackVideoTime($input: TrackVideoTimeInput!) {
  trackVideoTime(input: $input)
}
    `;
export type TrackVideoTimeMutationFn = Apollo.MutationFunction<TrackVideoTimeMutation, TrackVideoTimeMutationVariables>;

/**
 * __useTrackVideoTimeMutation__
 *
 * To run a mutation, you first call `useTrackVideoTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackVideoTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackVideoTimeMutation, { data, loading, error }] = useTrackVideoTimeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackVideoTimeMutation(baseOptions?: Apollo.MutationHookOptions<TrackVideoTimeMutation, TrackVideoTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackVideoTimeMutation, TrackVideoTimeMutationVariables>(TrackVideoTimeDocument, options);
      }
export type TrackVideoTimeMutationHookResult = ReturnType<typeof useTrackVideoTimeMutation>;
export type TrackVideoTimeMutationResult = Apollo.MutationResult<TrackVideoTimeMutation>;
export type TrackVideoTimeMutationOptions = Apollo.BaseMutationOptions<TrackVideoTimeMutation, TrackVideoTimeMutationVariables>;
export const TrackVideoBlockDocument = gql`
    mutation TrackVideoBlock($input: TrackVideoInput!) {
  trackVideoBlock(input: $input)
}
    `;
export type TrackVideoBlockMutationFn = Apollo.MutationFunction<TrackVideoBlockMutation, TrackVideoBlockMutationVariables>;

/**
 * __useTrackVideoBlockMutation__
 *
 * To run a mutation, you first call `useTrackVideoBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackVideoBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackVideoBlockMutation, { data, loading, error }] = useTrackVideoBlockMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackVideoBlockMutation(baseOptions?: Apollo.MutationHookOptions<TrackVideoBlockMutation, TrackVideoBlockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackVideoBlockMutation, TrackVideoBlockMutationVariables>(TrackVideoBlockDocument, options);
      }
export type TrackVideoBlockMutationHookResult = ReturnType<typeof useTrackVideoBlockMutation>;
export type TrackVideoBlockMutationResult = Apollo.MutationResult<TrackVideoBlockMutation>;
export type TrackVideoBlockMutationOptions = Apollo.BaseMutationOptions<TrackVideoBlockMutation, TrackVideoBlockMutationVariables>;
export const TrackSubscribeDocument = gql`
    mutation TrackSubscribe($input: TrackSubscribeInput!) {
  trackSubscribe(input: $input)
}
    `;
export type TrackSubscribeMutationFn = Apollo.MutationFunction<TrackSubscribeMutation, TrackSubscribeMutationVariables>;

/**
 * __useTrackSubscribeMutation__
 *
 * To run a mutation, you first call `useTrackSubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackSubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackSubscribeMutation, { data, loading, error }] = useTrackSubscribeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackSubscribeMutation(baseOptions?: Apollo.MutationHookOptions<TrackSubscribeMutation, TrackSubscribeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackSubscribeMutation, TrackSubscribeMutationVariables>(TrackSubscribeDocument, options);
      }
export type TrackSubscribeMutationHookResult = ReturnType<typeof useTrackSubscribeMutation>;
export type TrackSubscribeMutationResult = Apollo.MutationResult<TrackSubscribeMutation>;
export type TrackSubscribeMutationOptions = Apollo.BaseMutationOptions<TrackSubscribeMutation, TrackSubscribeMutationVariables>;
export const TrackInitiateCheckoutDocument = gql`
    mutation TrackInitiateCheckout($input: TrackInitiateCheckoutInput!) {
  trackInitiateCheckout(input: $input)
}
    `;
export type TrackInitiateCheckoutMutationFn = Apollo.MutationFunction<TrackInitiateCheckoutMutation, TrackInitiateCheckoutMutationVariables>;

/**
 * __useTrackInitiateCheckoutMutation__
 *
 * To run a mutation, you first call `useTrackInitiateCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackInitiateCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackInitiateCheckoutMutation, { data, loading, error }] = useTrackInitiateCheckoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackInitiateCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<TrackInitiateCheckoutMutation, TrackInitiateCheckoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackInitiateCheckoutMutation, TrackInitiateCheckoutMutationVariables>(TrackInitiateCheckoutDocument, options);
      }
export type TrackInitiateCheckoutMutationHookResult = ReturnType<typeof useTrackInitiateCheckoutMutation>;
export type TrackInitiateCheckoutMutationResult = Apollo.MutationResult<TrackInitiateCheckoutMutation>;
export type TrackInitiateCheckoutMutationOptions = Apollo.BaseMutationOptions<TrackInitiateCheckoutMutation, TrackInitiateCheckoutMutationVariables>;
export const TrackSearchDocument = gql`
    mutation TrackSearch($input: ArticleInput!) {
  trackSearch(input: $input)
}
    `;
export type TrackSearchMutationFn = Apollo.MutationFunction<TrackSearchMutation, TrackSearchMutationVariables>;

/**
 * __useTrackSearchMutation__
 *
 * To run a mutation, you first call `useTrackSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackSearchMutation, { data, loading, error }] = useTrackSearchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackSearchMutation(baseOptions?: Apollo.MutationHookOptions<TrackSearchMutation, TrackSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackSearchMutation, TrackSearchMutationVariables>(TrackSearchDocument, options);
      }
export type TrackSearchMutationHookResult = ReturnType<typeof useTrackSearchMutation>;
export type TrackSearchMutationResult = Apollo.MutationResult<TrackSearchMutation>;
export type TrackSearchMutationOptions = Apollo.BaseMutationOptions<TrackSearchMutation, TrackSearchMutationVariables>;