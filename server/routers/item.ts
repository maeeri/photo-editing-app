const router = require('express').Router()
const middleware = require('../utils/middleware')
import { getItems, createItem, getOneItem, editItem, deleteItem } from '../controllers/itemController'

router.get('/', middleware.userExtractor, getItems)
router.get('/:id', middleware.userExtractor, getOneItem)
router.post('/', middleware.userExtractor, createItem)
router.put('/:id', middleware.userExtractor, editItem)
router.delete('/:id', middleware.userExtractor, deleteItem)

module.exports = router
