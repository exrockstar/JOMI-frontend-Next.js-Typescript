// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { ConnectedClient } from 'apis/mongo-client'
import { Db, MongoClient } from 'mongodb'
import { decode, getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { User } from 'next-auth'
/**
 * This handler is the handler used in the old site, it's better to refactor this and let the client call the graphql API
 */

type Data =
  | string
  | {
      totalVotes: number
      isAddingVote: boolean
    }
  | {
      message: string
    }
type CustomUser = User & {
  _id: string
}

interface VoteRequest extends NextApiRequest {
  body: {
    articleTitle: string
  }
}
type ArticleVoteDocument = {
  artitcle_title: string
  users_voted: string[]
}
let client: Db

export default async function handler(
  req: VoteRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const session = await getSession({ req })
    const user = session.user as CustomUser
    const userId = user._id

    if (!userId) {
      res.status(401).send('You must be logged in to vote')
      res.end()
      return
    } else {
      const totalVotes = await submitVote(req.body.articleTitle, userId)
      res.status(200).json({ totalVotes, isAddingVote: false })
    }
  } else {
    res.status(405).json({ message: 'Method NOT Allowed' })
  }
  res.end()
}

async function submitVote(articleTitle, userId: string) {
  if (!client) {
    const mongoDb = (await ConnectedClient()) as MongoClient
    client = mongoDb.db(process.env.DB_NAME)
  }

  const NewArticleVotes =
    client.collection<ArticleVoteDocument>('newarticlevotes')

  const value = (await NewArticleVotes.findOneAndUpdate(
    {
      article_title: articleTitle
    },
    {
      $set: {
        article_title: articleTitle
      },
      $addToSet: { users_voted: userId }
    },
    {
      upsert: true,
      returnDocument: 'after'
    }
  )) as any

  return value?.users_voted?.length ?? 0
}
