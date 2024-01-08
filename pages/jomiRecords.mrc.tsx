import type { GetServerSideProps } from 'next'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { MongoClient, GridFSBucket } from 'mongodb'

const sitemap = () => {
  return null
}
export default sitemap
const uri = process.env.DATABASE_URL
const client = new MongoClient(uri)

const connectGridFS = async () => {
  await client.connect()
  const db = client.db(process.env.DB_NAME)
  return new GridFSBucket(db)
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const gridFSBucket = await connectGridFS()
    const downloadStream = gridFSBucket.openDownloadStreamByName('record.mrc')

    let data = ''
    for await (const chunk of downloadStream) {
      data += chunk.toString()
    }

    res.write(data)
    res.setHeader('Content-Type', 'text')
    res.setHeader('x-robots-tag', 'noindex')
    res.end()

    return {
      props: {}
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
