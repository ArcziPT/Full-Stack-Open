const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const BlogRouter = require('./controllers/blog')
const Config = require('./utils/config')

mongoose.connect(Config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', BlogRouter)

app.use((request, response, error) => {
    console.error(error);
    response.status(500).send(error.message);
})

module.exports = app