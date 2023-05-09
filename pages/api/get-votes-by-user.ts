// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import mongo, { ConnectedClient } from 'apis/mongo-client'
import { Db, MongoClient } from 'mongodb'
import { decode, getToken } from 'next-auth/jwt'
/**
 * This handler is the handler used in the old site, it's better to refactor this and let the client call the graphql API
 */

type Data =
  | string[]
  | {
      message: string
    }

let client: Db

// Get all votes the current logged in user has cast
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    if (!client) {
      const mongoDb = (await ConnectedClient()) as MongoClient
      client = mongoDb.db(process.env.DB_NAME)
    }

    const token = (await getToken({
      req,
      secret: process.env.SECRET,
      decode
    })) as {
      email: string
    }

    const user = await client
      .collection('users')
      .findOne({ email: token?.email })

    const userId = user._id
    if (!userId) {
      res.status(200).json([])
      res.end()
      return
    } else {
      const NewArticleVotes = client.collection('newarticlevotes')

      const votes = await NewArticleVotes.find(
        { users_voted: userId },
        {
          projection: { article_title: 1 }
        }
      ).toArray()

      const votesArray = votes.map((votes) => votes.article_title)
      res.status(200).json(votesArray)
    }
  } else {
    res.status(405).json({ message: 'Method NOT Allowed' })
  }
  res.end()
}
