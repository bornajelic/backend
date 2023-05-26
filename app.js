const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./utils/config')
const peopleRouter = require('./controllers/people')
const consoleLogger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
consoleLogger.info(config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => consoleLogger.info('Connected!'))
  .catch((error) => {
    consoleLogger.error(`error connecting to MongoDB: ${error.message}`)
    process.exit(1)
  })

morgan.token('body', (req) => JSON.stringify(req.body))

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(config.LOGGING_FORMAT))
app.use(middleware.requestLogger)

app.use(peopleRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
