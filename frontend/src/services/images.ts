import axios from 'axios'
import { ImageFormValues } from '../types'

const baseurl = 'http://localhost:5000/openai'

const generateImage = async (imgReq: ImageFormValues) => {
  const response = await axios.post(`${baseurl}/generateimage`, imgReq)
  console.log(response.data)
  return response.data.data
}

export { generateImage }
