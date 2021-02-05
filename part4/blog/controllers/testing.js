const testingRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

testingRouter.post('/reset', async (request, response) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    response.status(201).end()
})

module.exports = testingRouter