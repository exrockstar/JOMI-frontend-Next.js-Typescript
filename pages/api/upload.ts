// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { createReadStream } from 'fs'
import { rm } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { GetGridFS } from 'apis/mongo-client'
import { pipeline as pipelineSync } from 'stream'
import { promisify } from 'util'
export const config = {
  api: {
    bodyParser: false
  }
}

const pipeline = promisify(pipelineSync)
const IMAGE_EXTS = ['.jpg', '.jpeg', '.gif', '.png', '.jpe', 'bmp', '.webp']

const DOCUMENT_EXTS = ['.pdf', '.doc', '.docx']

async function saveFile(
  file: formidable.File,
  title?: string,
  description?: string
) {
  const fileExt = path.extname(file.originalFilename)
  const allowedFileTypes = [...IMAGE_EXTS, ...DOCUMENT_EXTS]
  if (!allowedFileTypes.includes(fileExt)) {
    throw new Error('Invalid file type.')
  }
  const GridFS = await GetGridFS()

  const readStream = createReadStream(file.filepath)
  let metadata: any = null
  if (IMAGE_EXTS.includes(fileExt)) {
    metadata = await sharp(file.filepath).metadata()
  }
  const uploadStream = GridFS.openUploadStream(file.originalFilename, {
    metadata: {
      title,
      description,
      ...metadata
    }
  })
  uploadStream.on('finish', async () => {
    await rm(file.filepath)
  })

  await pipeline(readStream, uploadStream)

  return file.originalFilename
}

/**
 * Easily returns an admin token which is useful when testing the graphql API.
 * Just uncomment lines 20-23 below
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm()
    form.parse(req, async function (err, fields, files) {
      if (files.image && !(files.image instanceof Array)) {
        try {
          const filename = await saveFile(
            files.image,
            fields.title as string,
            fields.description as string
          )
          return res.status(201).send({ filename })
        } catch (e) {
          return res.status(400).send(e.message)
        }
      }
    })
  } else {
    res.status(405).send('405 Method not allowed')
  }
}
