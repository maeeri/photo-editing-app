"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var usersController_1 = require("../controllers/usersController");
router.get('/', usersController_1.getAllUsers);
router.get('/:id', usersController_1.getOneUser);
router.post('/', usersController_1.addUser);
router.put('/:id/role', usersController_1.editUserRole);
module.exports = router;
