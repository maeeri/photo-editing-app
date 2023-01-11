import axios from 'axios'

let location = document.location
const baseUrl = `${location.protocol}//${location.hostname}:5000/api/item`

const setToken = (newToken: string) => {
  return `bearer ${newToken}`
}

const setConfig = (newToken: string) => {
  const config = {
    headers: {
      Authorization: setToken(newToken),
    },
  }
  return config
}

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

const itemService = { getItems, getOneItem, createItem, editItem }

export default itemService
