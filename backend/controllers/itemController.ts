const Item = require('../models/item')
const logger = require('../utils/logger')

export const getItem = async (req, res) => {
  logger.info('get item')
  try {
    const item = await Item.find()
    res.status(200).json(item)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
export const createItem = async (req, res) => {
  logger.info(req.body)
  const item = new Item(req.body)
  try {
    await item.save()
    res.status(201).json(item)
  } catch (error) {}
}
