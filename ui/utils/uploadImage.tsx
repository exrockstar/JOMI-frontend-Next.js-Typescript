/* eslint-disable import/no-anonymous-default-export */
import Axios from 'axios'
import { BlobInfo } from '../TextEditor'

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

    const response = await Axios.post<{ filename: string }>(
      `/api/upload`,
      data,
      {
        withCredentials: true
      }
    )
    console.log('Image was uploaded successfully!')
    success(`${process.env.NEXTAUTH_URL}/api/files/${response.data.filename}`)
  } catch (e) {
    failure('An unknown error occured.')
    console.error(e)
  }
}
