/* eslint-disable import/no-anonymous-default-export */
import Axios, { AxiosResponse } from 'axios'
import { Image } from '../TextEditor'

const apiurl = process.env.API_URL

export default async (complete: Function): Promise<void> => {
  const {
    data: { files }
  }: AxiosResponse<{ files: Image[] }> = await Axios.get(`/api/files`, {
    withCredentials: true
  })

  const images = files.map((image) => {
    return { title: image.metadata?.title, value: image.filename }
  })

  complete(images)
}
