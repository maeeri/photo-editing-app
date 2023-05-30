"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var openaiController_1 = require("../controllers/openaiController");
router.post('/generateimage', openaiController_1.generateImage);
router.post('editimage', openaiController_1.editImage);
module.exports = router;
