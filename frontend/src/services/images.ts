import axios from 'axios'
import { ImageFormValues } from '../types'

const baseurl = 'http://localhost:5000/openai'

const generateImage = async (imgReq: ImageFormValues) => {
  const response = await axios.post(`${baseurl}/generateimage`, imgReq)
  return response.data.data
}

const imagesService = { generateImage }

export default imagesService
