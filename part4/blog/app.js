const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const BlogRouter = require('./controllers/blog')
const Config = require('./utils/config')
require('express-async-errors')

mongoose.connect(Config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', BlogRouter)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'Bad Request'){
      return response.status(400).end()
    }
  
    next(error)
}

app.use(errorHandler)

module.exports = app