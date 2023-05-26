const peopleRouter = require('express').Router()
const Person = require('../models/person')
const consoleLogger = require('../utils/logger')

peopleRouter.get('/info', (request, response, next) => {
  const options = {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  Person.countDocuments({})
    .then((personCount) => {
      if (personCount) {
        const formatter = new Intl.DateTimeFormat([], options)
        const currentDate = formatter.format(new Date())
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const message = `<h3>Phonebook has info for ${personCount} people</h3><div>${currentDate} ${timezone}<div>`
        response.send(message)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

peopleRouter.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        const personsList = []
        persons.forEach((person) => {
          personsList.push(person)
        })
        response.json(personsList)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

peopleRouter.get('/api/persons/:id', (request, response, next) => {
  Person.find({ _id: request.params.id })
    .then((person) => {
      if (person.length > 0) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

peopleRouter.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      consoleLogger.info(result)
      response.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

peopleRouter.post('/api/persons/', (request, response, next) => {
  const { body } = request
  const query = { id: body.id }
  const update = { $set: { number: body.number, name: body.name } }
  const options = { upsert: true }

  Person.updateOne(query, update, options)
    .then((result) => {
      consoleLogger.info(result)
      response.status(200).end()
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = peopleRouter
