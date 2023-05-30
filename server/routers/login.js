"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var loginController_1 = require("../controllers/loginController");
router.post('/', loginController_1.login);
module.exports = router;
