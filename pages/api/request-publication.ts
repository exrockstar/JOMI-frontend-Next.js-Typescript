import type { NextApiRequest, NextApiResponse } from 'next'
import mongo, { ConnectedClient } from 'apis/mongo-client'
import { Db, MongoClient } from 'mongodb'
import { getApolloUserClient } from 'apis/apollo-admin-client'
import { getSession } from 'next-auth/react'
import {
  PublicationRequestDocument,
  PublicationRequestMutation,
  PublicationRequestMutationVariables
} from 'graphql/mutations/publication-request.generated'
import { logger } from 'logger/logger'
import Cookies from 'cookies'
interface PublciationRequest extends NextApiRequest {
  body: {
    type: string
    name: string
    email: string
    institution: string
    specialty: string
    procedure: string
    rationale: string
    abstract: string
  }
}

export default async function handler(
  req: PublciationRequest,
  res: NextApiResponse
) {
  console.log('request-publication', req.method)
  if (req.method === 'POST') {
    const {
      name,
      email,
      abstract,
      institution,
      specialty,
      procedure,
      type,
      rationale
    } = req.body

    const session = await getSession({ req })
    const cookie = new Cookies(req, res)
    const client = getApolloUserClient(req.headers, cookie)
    const origin = req.headers.origin
    try {
      const { data } = await client.mutate<
        PublicationRequestMutation,
        PublicationRequestMutationVariables
      >({
        mutation: PublicationRequestDocument,
        variables: {
          input: {
            abstract,
            email,
            full_name: name,
            institution,
            specialty,
            procedure,
            rationale,
            type: type
          }
        },
        context: {
          headers: {
            Authorization: 'Bearer ' + session?.user?.token
          }
        }
      })

      res.redirect(
        303,
        `${origin}/publication-request-result?success=${data.createPublicationRequest}`
      )
    } catch (e) {
      logger.error(`Error in submitting publication request: ${e}`, {
        stack: e.stack
      })
    }
  } else {
    res.status(405).json({ message: 'Method NOT Allowed' })
  }
}
