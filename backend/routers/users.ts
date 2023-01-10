const router = require('express').Router()
import { getAllUsers, getOneUser, addUser, editUserRole } from '../controllers/usersController'

router.get('/', getAllUsers)

router.get('/:id', getOneUser)

router.post('/', addUser)

router.put('/:id/role', editUserRole)

module.exports = router
