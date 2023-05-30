import axios from 'axios'
import { ImageFormValues, ImageEditValues } from '../types'

export const useOpenAI = () => {
  const baseurl = 'http://localhost:5000/openai'
  const generateImage = async (imgReq: ImageFormValues) => {
    const response = await axios.post(`${baseurl}/generateimage`, imgReq)
    return response.data.data
  }

  const editImage = async (imgReq: ImageEditValues) => {
    const response = await axios.post(`${baseurl}/editimage`, imgReq)
    return response.data.data
  }

  const service = { generateImage, editImage }

  return [service]
}