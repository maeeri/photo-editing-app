"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var http = require('http');
var config = require('./utils/config');
var usersRouter = require('./routers/users');
var loginRouter = require('./routers/login');
var openaiRouter = require('./routers/openai');
var itemRouter = require('./routers/item');
var logger = require('./utils/logger');
var middleware = require('./utils/middleware');
var mongoose_1 = require("mongoose");
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(config.MONGODB_URI)
    .then(function () {
    logger.info('connected to MongoDb');
})
    .catch(function (error) {
    logger.error('error connecting to MongoDb: ', error.message);
});
var app = express();
app.use(cors());
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ limit: '16mb', extended: true }));
app.use(middleware.tokenExtractor);
app.use('/openai', openaiRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/item', itemRouter);
module.exports = app;
