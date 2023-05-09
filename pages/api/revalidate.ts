import { InMemoryCache } from '@apollo/client'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import axios from 'axios'
import { BASE_URL } from 'common/constants'
import { ArticlesDocument } from 'graphql/queries/articles.generated'
import { UserRoles } from 'graphql/types'
import { logger } from 'logger/logger'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

async function isValidPath(origin: string, path: string) {
  try {
    const response = await axios.get(`${origin}${path}`)

    return response.status < 500
  } catch (e) {
    console.log(e)
    return false
  }
}

interface RevalidateRequest extends NextApiRequest {
  query: {
    path?: string
    secret?: string
  }
}
let revalidatingArticles
export default async function revalidate(
  request: RevalidateRequest,
  response: NextApiResponse
) {
  const { secret, path } = request.query
  logger.info(`[Revalidate] ${path}`)
  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATE_SECRET) {
    const session = await getSession({ req: request })
    if (session.user?.role !== UserRoles.Admin) {
      return response.send(401)
    }
  }

  const decoded = decodeURIComponent(path)

  if (await isValidPath(BASE_URL, decoded)) {
    await response.revalidate(decoded)
    await response.revalidate(decoded.toLowerCase())
    return response.status(200).json({ revalidated: true, path: decoded })
  }

  return response.send(400)
}
