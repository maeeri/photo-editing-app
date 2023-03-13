const router = require('express').Router()
import { generateImage, editImage } from '../controllers/openaiController'

router.post('/generateimage', generateImage)
router.post('editimage', editImage)

module.exports = router
