import axios from 'axios'
import { UserCreds } from 'types'

let location = document.location
const baseUrl = `${location.protocol}//${location.hostname}:5000/api/login`

const login = async (creds: UserCreds) => {
  const response = await axios.post(baseUrl, creds)
  return response.data
}

const loginService = { login }

export default loginService
