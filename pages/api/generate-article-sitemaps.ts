import { generateArticleSiteMaps } from 'backend/seo/sitemap/generate-article-sitemaps'
import { UserRoles } from 'graphql/types'
import { logger } from 'logger/logger'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type Data = {
  message: string
  isSuccess: boolean
}

/**
 * Generates the article sitemap.
 * We can also call it like an rpc call
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const origin = req.headers.origin ?? 'https://jomi.com'

  if (req.method === 'POST') {
    try {
      let apiKey = req.body.apiKey

      if (!apiKey) {
        const session = await getSession({ req })
        if (session.user.role !== UserRoles.Admin) {
          throw new Error('Not authorized')
        }

        console.log('Admin user')
      } else if (apiKey !== process.env.NEXTAPP_APIKEY) {
        throw new Error('Invalid api key')
      }

      logger.info('Generating article sitemaps')
      await generateArticleSiteMaps(origin)
      res
        .status(200)
        .json({ message: 'Successfully generated sitemap', isSuccess: true })
    } catch (e) {
      logger.error(`Error generating sitemaps: ${e.message}`, {
        stack: e.stack
      })
      res.status(500).json({
        message: `Failed to generate sitemaps: ${e.message}`,
        isSuccess: false
      })
    }
  } else {
    res.status(405).send({ message: 'Method not allowed', isSuccess: false })
  }
}
