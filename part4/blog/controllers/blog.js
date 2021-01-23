const blogRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
require('express-async-errors')

blogRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('', async (request, response) => {
    if(!request.body.hasOwnProperty('likes'))
        request.body['likes'] = 0

    if(!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('url'))
        throw {name: 'Bad Request'}

    const blog = new Blog(request.body)
  
    const result = await blog.save()
    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndRemove(request.params.id)
    
    if(!result)
        response.status(404).end()
    
    response.status(200).send(result)
})

module.exports = blogRouter