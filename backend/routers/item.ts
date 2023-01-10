const router = require('express').Router()
import { getItem, createItem } from "../controllers/itemController"

router.get('/', getItem)
router.post('/', createItem)

module.exports = router