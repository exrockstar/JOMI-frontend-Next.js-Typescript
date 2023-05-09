import { transports, format, createLogger } from 'winston'
import 'winston-mongodb'
import { GraphQLTransport } from './GraphQLTransport'

const { combine, timestamp, json, metadata, simple, colorize } = format
// const LOGS_URL = process.env.MONGO_LOGS_URL ?? process.env.DATABASE_URL
const level = process.env.LOG_LEVEL || 'debug'
export const logger = createLogger({
  level: level,
  format: combine(timestamp(), json(), metadata()),
  defaultMeta: {
    service: 'NEXTJS_FRONTEND',
    app_env: process.env.APP_ENV ?? 'development'
  },
  transports: [
    new GraphQLTransport({
      level: level
    }),
    new transports.Console({
      format: combine(colorize({ all: true }), timestamp(), simple())
    })
  ]
})

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new transports.Console({
//       format: combine(colorize({ all: true }), timestamp(), simple())
//     })
//   )
// }
