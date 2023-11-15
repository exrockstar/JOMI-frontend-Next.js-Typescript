// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import {
  MediaLibraryDocument,
  MediaLibraryQuery,
  MediaLibraryQueryVariables
} from 'graphql/cms-queries/media-library.generated'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = getApolloAdminClient()
  const { data } = await client.query<
    MediaLibraryQuery,
    MediaLibraryQueryVariables
  >({
    query: MediaLibraryDocument,
    variables: {
      input: {
        skip: 0,
        sort_by: 'filename',
        sort_order: 1,
        limit: 100
      }
    }
  })

  res.status(200).json({
    files: data.files.files
  })
}
