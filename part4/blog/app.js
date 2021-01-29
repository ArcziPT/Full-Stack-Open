const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const BlogRouter = require('./controllers/blog')
const Config = require('./utils/config')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')

mongoose.connect(Config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.use(async (request, response, next) => {
  const authorization = request.get('authorization')  

  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))){
    request.user = null
  }else{
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)  
    if (!token || !decodedToken.id) {    
      return response.status(401).json({ error: 'token missing or invalid' })  
    }  
    
    const user = await User.findById(decodedToken.id)
    request.user = user
  }

  next()
})

app.use('/api/blogs', BlogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'Bad Request'){
      return response.status(400).end()
    }else if (error.name === 'JsonWebTokenError') {    
      return response.status(401).json({ error: 'invalid token' })  
    }
  
    next(error)
}

app.use(errorHandler)

module.exports = app