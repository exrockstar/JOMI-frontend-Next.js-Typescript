import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type WriteLogMutationVariables = Types.Exact<{
  level: Types.Scalars['String'];
  message: Types.Scalars['String'];
  meta?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type WriteLogMutation = { __typename?: 'Mutation', writeLog: boolean };


export const WriteLogDocument = gql`
    mutation WriteLog($level: String!, $message: String!, $meta: String) {
  writeLog(level: $level, message: $message, meta: $meta)
}
    `;
export type WriteLogMutationFn = Apollo.MutationFunction<WriteLogMutation, WriteLogMutationVariables>;

/**
 * __useWriteLogMutation__
 *
 * To run a mutation, you first call `useWriteLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWriteLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [writeLogMutation, { data, loading, error }] = useWriteLogMutation({
 *   variables: {
 *      level: // value for 'level'
 *      message: // value for 'message'
 *      meta: // value for 'meta'
 *   },
 * });
 */
export function useWriteLogMutation(baseOptions?: Apollo.MutationHookOptions<WriteLogMutation, WriteLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WriteLogMutation, WriteLogMutationVariables>(WriteLogDocument, options);
      }
export type WriteLogMutationHookResult = ReturnType<typeof useWriteLogMutation>;
export type WriteLogMutationResult = Apollo.MutationResult<WriteLogMutation>;
export type WriteLogMutationOptions = Apollo.BaseMutationOptions<WriteLogMutation, WriteLogMutationVariables>;