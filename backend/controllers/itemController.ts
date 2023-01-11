const Item = require('../models/item')
const User = require('../models/user')
const logger = require('../utils/logger')

export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user })
    res.status(200).json(items)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getOneItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (req.user.id.toString() === item.user.toString()) {
      res.status(200).json(item)
    } else {
      res.status(401)
    }
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
}

export const createItem = async (req, res) => {
  const item = new Item(req.body)
  const token = req.token

  const user = req.user
  item.user = user

  try {
    const savedItem = await item.save()
    user.items = user.items.concat(savedItem)
    user.save()
    res.status(201).json(item)
  } catch (error) {}
}

export const editItem = async (req, res) => {
  const { image } = req.body
  const id = req.params.id
  const item = await Item.findById(id)
  const user = req.user

  if (user.id.toString() === item.user.toString()) {
    item.image = image

    const updatedItem = await Item.findByIdAndUpdate(item.id, item, {
      new: true,
    })
    res.json(updatedItem)
  } else {
    res.status(401).end()
  }
}
