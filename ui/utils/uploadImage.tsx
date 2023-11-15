/* eslint-disable import/no-anonymous-default-export */
import Axios from 'axios'
import { BlobInfo } from '../TextEditor'

const apiurl = process.env.API_URL

export default async (
  blobInfo: BlobInfo,
  success: Function,
  failure: Function
): Promise<void> => {
  try {
    const data: FormData = new FormData()

    // @ts-ignore

    data.append('image', blobInfo.blob())
    data.append('title', blobInfo.filename())

    await Axios.post(`/api/upload`, data, { withCredentials: true })
    console.log('Image was uploaded successfully!')
    success(blobInfo.filename())
  } catch (e) {
    failure('An unknown error occured.')
    console.error(e)
  }
}
