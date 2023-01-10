const router = require('express').Router()
import { generateImage } from '../controllers/openaiController'

router.post('/generateimage', generateImage)

module.exports = router
