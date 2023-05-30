"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var middleware = require('../utils/middleware');
var itemController_1 = require("../controllers/itemController");
router.get('/', middleware.userExtractor, itemController_1.getItems);
router.get('/:id', middleware.userExtractor, itemController_1.getOneItem);
router.post('/', middleware.userExtractor, itemController_1.createItem);
router.put('/:id', middleware.userExtractor, itemController_1.editItem);
router.delete('/:id', middleware.userExtractor, itemController_1.deleteItem);
module.exports = router;
