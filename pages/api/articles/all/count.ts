// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getApolloUserClient } from 'apis/apollo-admin-client'
import { initializeApollo } from 'apis/apollo-client'
import {
  ArticlesCountQuery,
  ArticlesCountDocument
} from 'graphql/queries/articles-count.generated'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'
type Data =
  | number
  | {
      message: string
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const cookie = new Cookies(req, res)
    const client = getApolloUserClient(req.headers, cookie)
    const { data } = await client.query<ArticlesCountQuery>({
      query: ArticlesCountDocument
    })

    const count = data?.articles?.totalCount || 0
    res.status(200).json(count)
  } else {
    res.status(405).json({ message: 'Method NOT Allowed' })
  }
  res.end()
}
