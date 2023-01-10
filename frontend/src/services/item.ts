import axios from 'axios'

let location = document.location
const baseUrl = `${location.protocol}//${location.hostname}`

const setToken = (newToken: string) => {
  return `bearer ${newToken}`
}

const setConfig = (newToken: string) => {
  const config = {
    headers: { Authorization: setToken(newToken) },
  }
  return config
}

export const getItem = async () => {
  const { data } = await axios.get(`${baseUrl}/api/item`)
  return data
}

export const createItem = async (img: any, token: string) => {
  const { data } = await axios.post(
    `${baseUrl}/api/item`,
    img,
    setConfig(token)
  )

  return data
}
