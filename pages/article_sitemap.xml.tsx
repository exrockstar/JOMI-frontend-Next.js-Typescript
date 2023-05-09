// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GetGridFS } from 'apis/mongo-client'
import { streamToString } from 'backend/seo/sitemap/streamToString'
import { GetServerSideProps } from 'next'
const sitemap = () => {
  return null
}
export default sitemap

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const GridFS = await GetGridFS()
    const fileStream = GridFS.openDownloadStreamByName('article_sitemap.xml')
    const result = await streamToString(fileStream)
    res.setHeader('Content-Type', 'text/xml')
    res.setHeader('x-robots-tag', 'noindex')
    res.write(result)
    res.end()
  } catch (e) {
    return {
      props: {
        notFound: true
      }
    }
  }
  return {
    props: {}
  }
}
