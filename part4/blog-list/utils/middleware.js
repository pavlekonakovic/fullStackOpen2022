const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { info, error } = require('./logger')


const requestLogger = (request, response, next) => {
  info('Method: ', request.method)
  info('Path: ', request.path)
  info('Body: ', request.body)
  info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, request, response, next) => {
  error(err.message)

  if(err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  } else if(err.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if(err.name === 'TokenExpiredError'){
    return response.status(401).json({ error: 'expired token' })
  }

  next(err)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  if(token){
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    request.user = user
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}