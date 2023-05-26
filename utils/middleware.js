const consoleLogger = require('./logger')

const requestLogger = (request, response, next) => {
  consoleLogger.info('Method:', request.method)
  consoleLogger.info('Path: s ', request.path)
  consoleLogger.info('Body:  ', request.body)
  consoleLogger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  consoleLogger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
}
