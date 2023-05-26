/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlenght: 3,
  },
  number: {
    type: String,
    required: true,
    minlenght: 9,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
