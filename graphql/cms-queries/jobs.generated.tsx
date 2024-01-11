import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type RunJobManuallyMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  data?: Types.InputMaybe<Types.Scalars['any']>;
}>;


export type RunJobManuallyMutation = { __typename?: 'Mutation', runJobManually: string };

export type IsJobRunningQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type IsJobRunningQuery = { __typename?: 'Query', isJobRunning: boolean, jobProgress: number };

export type CancelJobMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type CancelJobMutation = { __typename?: 'Mutation', cancelJob: string };


export const RunJobManuallyDocument = gql`
    mutation RunJobManually($name: String!, $data: any) {
  runJobManually(name: $name, data: $data)
}
    `;
export type RunJobManuallyMutationFn = Apollo.MutationFunction<RunJobManuallyMutation, RunJobManuallyMutationVariables>;

/**
 * __useRunJobManuallyMutation__
 *
 * To run a mutation, you first call `useRunJobManuallyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunJobManuallyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runJobManuallyMutation, { data, loading, error }] = useRunJobManuallyMutation({
 *   variables: {
 *      name: // value for 'name'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRunJobManuallyMutation(baseOptions?: Apollo.MutationHookOptions<RunJobManuallyMutation, RunJobManuallyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RunJobManuallyMutation, RunJobManuallyMutationVariables>(RunJobManuallyDocument, options);
      }
export type RunJobManuallyMutationHookResult = ReturnType<typeof useRunJobManuallyMutation>;
export type RunJobManuallyMutationResult = Apollo.MutationResult<RunJobManuallyMutation>;
export type RunJobManuallyMutationOptions = Apollo.BaseMutationOptions<RunJobManuallyMutation, RunJobManuallyMutationVariables>;
export const IsJobRunningDocument = gql`
    query IsJobRunning($name: String!) {
  isJobRunning(name: $name)
  jobProgress(name: $name)
}
    `;

/**
 * __useIsJobRunningQuery__
 *
 * To run a query within a React component, call `useIsJobRunningQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsJobRunningQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsJobRunningQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useIsJobRunningQuery(baseOptions: Apollo.QueryHookOptions<IsJobRunningQuery, IsJobRunningQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsJobRunningQuery, IsJobRunningQueryVariables>(IsJobRunningDocument, options);
      }
export function useIsJobRunningLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsJobRunningQuery, IsJobRunningQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsJobRunningQuery, IsJobRunningQueryVariables>(IsJobRunningDocument, options);
        }
export type IsJobRunningQueryHookResult = ReturnType<typeof useIsJobRunningQuery>;
export type IsJobRunningLazyQueryHookResult = ReturnType<typeof useIsJobRunningLazyQuery>;
export type IsJobRunningQueryResult = Apollo.QueryResult<IsJobRunningQuery, IsJobRunningQueryVariables>;
export const CancelJobDocument = gql`
    mutation CancelJob($name: String!) {
  cancelJob(name: $name)
}
    `;
export type CancelJobMutationFn = Apollo.MutationFunction<CancelJobMutation, CancelJobMutationVariables>;

/**
 * __useCancelJobMutation__
 *
 * To run a mutation, you first call `useCancelJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelJobMutation, { data, loading, error }] = useCancelJobMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCancelJobMutation(baseOptions?: Apollo.MutationHookOptions<CancelJobMutation, CancelJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelJobMutation, CancelJobMutationVariables>(CancelJobDocument, options);
      }
export type CancelJobMutationHookResult = ReturnType<typeof useCancelJobMutation>;
export type CancelJobMutationResult = Apollo.MutationResult<CancelJobMutation>;
export type CancelJobMutationOptions = Apollo.BaseMutationOptions<CancelJobMutation, CancelJobMutationVariables>;