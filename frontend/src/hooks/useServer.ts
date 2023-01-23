import axios from 'axios'
import { UserCreds } from 'types'

let location = document.location
const serverUrl = `${location.protocol}//${location.hostname}:${location.port}`

const setToken = (newToken: string) => {
  return `bearer ${newToken}`
}

const setConfig = (newToken: string) => {
  const config = {
    headers: { Authorization: setToken(newToken) },
  }
  return config
}

export const useUserService = () => {
  const baseUrl = `${serverUrl}/api/users`

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
  const service = { getUsers, getOneUser, createUser, editUserRole }

  return [service]
}

export const useLoginService = () => {
  const baseUrl = `${serverUrl}/api/login`

  const login = async (creds: UserCreds) => {
    const response = await axios.post(baseUrl, creds)
    return response.data
  }
  const service = { login }
  return [service]
}

export const useItemService = () => {
  const baseUrl = `${serverUrl}/api/item`

  const getItems = async (token: string) => {
    const { data } = await axios.get(baseUrl, setConfig(token))
    return data
  }

  const getOneItem = async (id: string, token: string) => {
    const { data } = await axios.get(`${baseUrl}/${id}`, setConfig(token))
    return data
  }

  const createItem = async (img: any, token: string) => {
    const { data } = await axios.post(baseUrl, { image: img }, setConfig(token))
    return data
  }

  const editItem = async (id: string, img: any, token: string) => {
    const { data } = await axios.put(
      `${baseUrl}/${id}`,
      { image: img },
      setConfig(token)
    )
    return data
  }

  const deleteItem = async (id: string, token: string) => {
    const response = await axios.delete(`${baseUrl}/${id}`, setConfig(token))
    return response
  }

  const service = { getItems, getOneItem, createItem, editItem, deleteItem }
  return [service]
}
