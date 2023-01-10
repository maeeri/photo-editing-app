import axios from 'axios'
import { UserCreds } from 'types'

let location = document.location
const baseUrl = `${location.protocol}//${location.hostname}/api/login`

const login = async (creds: UserCreds) => {
    const response = await axios.post(baseUrl, creds)
    return response.data
  }
  
  export { login }