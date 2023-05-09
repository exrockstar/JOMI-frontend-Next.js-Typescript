import { ApolloClient } from '@apollo/client'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import {
  WriteLogDocument,
  WriteLogMutation,
  WriteLogMutationVariables
} from 'graphql/mutations/logs.generated'
import { LogEntry } from 'winston'
import Transport from 'winston-transport'
export class GraphQLTransport extends Transport {
  client: ApolloClient<any>
  constructor(opts) {
    super(opts)
    this.client = getApolloAdminClient()
  }

  log(info: LogEntry, callback) {
    setImmediate(() => {
      this.emit('logged', info)
    })
    this.client
      .mutate<WriteLogMutation, WriteLogMutationVariables>({
        mutation: WriteLogDocument,
        variables: {
          level: info.level,
          message: info.message,
          meta: JSON.stringify(info.metadata)
        }
      })
      .catch((e) => {
        console.error('Log error: Could not send logs to graphql server')
      })
      .finally(callback)
  }
}
