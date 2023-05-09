import { GetGridFS } from 'apis/mongo-client'
import { streamToString } from 'backend/seo/sitemap/streamToString'
import { GetServerSideProps } from 'next'
const sitemap = () => {
  return null
}
export default sitemap

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  try {
    const file = params.filename
    const filename = `article-${file}`
    const GridFS = await GetGridFS()
    const fileStream = GridFS.openDownloadStreamByName(filename)
    const result = await streamToString(fileStream)
    res.setHeader('Content-Type', 'text/xml')
    res.setHeader('x-robots-tag', 'noindex')
    res.write(result)
    res.end()
  } catch (e) {
    return {
      notFound: true
    }
  }
  return {
    props: {}
  }
}
