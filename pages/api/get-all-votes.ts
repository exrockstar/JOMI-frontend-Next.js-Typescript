// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import mongo, { ConnectedClient } from 'apis/mongo-client'
import { Db, MongoClient } from 'mongodb'
/**
 * This handler is the handler used in the old site, it's better to refactor this and let the client call the graphql API
 */

type Data =
  | {
      [key: string]: number
    }
  | {
      message: string
    }

let client: Db

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    if (!client) {
      const mongoDb = (await ConnectedClient()) as MongoClient
      client = mongoDb.db(process.env.DB_NAME)
    }

    const NewArticleVotes = client.collection('newarticlevotes')
    const votes = await NewArticleVotes.find(
      {},
      {
        projection: { article_title: 1, users_voted: 1 }
      }
    ).toArray()

    const votesByArticle: Data = votes.reduce((accum, i) => {
      accum[i.article_title] = i.users_voted.length
      return accum
    }, {})
    res.status(200).json(votesByArticle)
  } else {
    res.status(405).json({ message: 'Method NOT Allowed' })
  }
  res.end()
}
