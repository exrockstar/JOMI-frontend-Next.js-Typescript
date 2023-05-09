// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { generateAuthorSitemap } from 'backend/seo/sitemap/generate-author'
import { GetServerSideProps } from 'next'

const sitemap = () => {
  return null
}
export default sitemap

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const origin = req.headers.origin ?? 'https://jomi.com'
  const xml = await generateAuthorSitemap(origin)

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('x-robots-tag', 'noindex')
  res.write(xml)
  res.end()
  // res.status(200).json({ name: 'John Doe' })
  return {
    props: {}
  }
}
