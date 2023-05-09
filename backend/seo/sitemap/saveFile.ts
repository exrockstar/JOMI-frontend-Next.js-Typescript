import { GetGridFS } from 'apis/mongo-client'
import { logger } from 'logger/logger'

import { Readable } from 'stream'
export const writeFile = async (
  filename: string,
  xml: string
): Promise<Boolean> => {
  var GridFS = await GetGridFS()
  //remove file if existing
  const items = await GridFS.find({ filename }).toArray()
  items.map(async (file) => {
    await GridFS.delete(file._id)
  })

  var stream = new Readable()

  stream.push(xml)
  stream.push(null)

  const uploadStream = GridFS.openUploadStream(filename)
  stream.pipe(uploadStream)
  return new Promise((resolve, reject) => {
    uploadStream.on('finish', async () => {
      logger.info(`Successfully saved ${filename}`)
      resolve(true)
    })

    uploadStream.on('error', (e) => {
      logger.warn(`Could not save ${filename}`)
      reject(false)
    })
  })
}
