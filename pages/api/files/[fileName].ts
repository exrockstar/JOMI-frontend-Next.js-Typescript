import { GetGridFS } from 'apis/mongo-client'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
const getFile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const GridFS = await GetGridFS()
    const { fileName } = req.query || {}

    if (!fileName) {
      throw new Error('File ID must be specified')
    }

    const fileExt = path.extname(`${fileName}`) || ''

    if (!fileExt) {
      throw new Error(`Requested file '${fileName}' is missing a file extension`)
    }
    //check if file exists
    const exists = await GridFS.find({ filename: fileName }).toArray()
    if (!exists.length) {
      res.status(404).send('Not Found')
      return
    }

    // Start MongoDB Grid stream
    const fileStream = GridFS.openDownloadStreamByName(`${fileName}`)

    const type = fileExt.toString().replace('.', '')
    // Set proper headers
    res.setHeader('Content-Type', `image/${type}`)
    // no need extra step to optimize using sharp. NextJS already does that.
    if (process.env.NODE_ENV !== 'development') {
      //cache images for 1 week.
      res.setHeader('Cache-Control', `public, max-age=604800, s-max-age=604800, must-revalidate`)
    }
    fileStream.pipe(res)
  } catch (error) {
    res.status(500).send('Internal server')
    res.end()
  }
}

export default getFile
