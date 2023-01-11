const express = require('express')
const cors = require('cors')
const http = require('http')
const config = require('./utils/config')
const usersRouter = require('./routers/users')
const loginRouter = require('./routers/login')
const openaiRouter = require('./routers/openai')
const itemRouter = require('./routers/item')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDb')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDb: ', error.message)
  })

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: '1000mb', extended: false }))

app.use(middleware.tokenExtractor)

app.use('/openai', openaiRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/item', itemRouter)

module.exports = app
