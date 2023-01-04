const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const http = require('http')
import openaiRouter from './routers/openai'

const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/openai', openaiRouter)

const server = http.createServer(app)
server.listen(port, () => console.log(`Server listening on port ${port}`))
