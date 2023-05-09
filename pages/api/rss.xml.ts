// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getArticlesRss } from 'backend/rss-utils/getArticlesRss'
import { getBaseRss } from 'backend/rss-utils/getBaseRss'
import type { NextApiRequest, NextApiResponse } from 'next'
import { create } from 'xmlbuilder2'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const origin = req.headers.origin ?? 'https://jomi.com'
  const base = getBaseRss(origin)
  const articles = await getArticlesRss(origin)
  base.rss.channel = {
    ...base.rss.channel,
    ...articles
  }
  const doc = create({ encoding: 'utf-8' }, base)

  const xml = doc.end({ format: 'xml', prettyPrint: true })

  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()
  // res.status(200).json({ name: 'John Doe' })
}
