require('dotenv').config()

const { PORT } = process.env
const { MONGODB_URI } = process.env
const LOGGING_FORMAT = ':method :url :status :response-time ms :body'

module.exports = {
  MONGODB_URI,
  PORT,
  LOGGING_FORMAT,
}
