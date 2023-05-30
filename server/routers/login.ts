const router = require('express').Router()
import { login } from '../controllers/loginController'

router.post('/', login)

module.exports = router
