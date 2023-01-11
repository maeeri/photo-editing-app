import axios from 'axios'

let location = document.location
const baseUrl = `${location.protocol}//${location.hostname}:5000/api/users`

const setToken = (newToken: string) => {
  return `bearer ${newToken}`
}

const setConfig = (newToken: string) => {
  const config = {
    headers: { Authorization: setToken(newToken) },
  }
  return config
}

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOneUser = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createUser = async (
  username: string,
  password: string,
  name: string,
  role?: string
) => {
  const response = await axios.post(baseUrl, {
    username: username,
    password: password,
    name: name,
    role: role || 'user',
  })
  return response.data
}

const editUserRole = async (id: string, role: string, newToken: string) => {
  const response = await axios.put(
    `${baseUrl}/${id}/role`,
    {
      role: role,
    },
    setConfig(newToken)
  )
  return response.data
}

const userService = { getUsers, getOneUser, createUser, editUserRole }

export default userService
