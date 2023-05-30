const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  request.token =
    authorization && authorization.toLowerCase().startsWith('bearer ')
      ? authorization.substring(7)
      : null
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken =
    request.token !== null
      ? jwt.verify(request.token, process.env.SECRET)
      : null

  if (decodedToken === null) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  request.user = await User.findById(decodedToken.id)
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = { tokenExtractor, errorHandler, userExtractor }
