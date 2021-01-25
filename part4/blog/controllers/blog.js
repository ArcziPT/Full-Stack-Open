const blogRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogRouter.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, id: 1})
    response.json(blogs)
})
  
blogRouter.post('', async (request, response) => {
    if(!request.body.hasOwnProperty('likes'))
        request.body['likes'] = 0

    if(!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('url'))
        return response.status(401).end()

    const user = await User.findOne({})
    const newBlog = {...request.body, user: user._id}
    const blog = new Blog(newBlog)
  
    const result = await blog.save()
    
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndRemove(request.params.id)
    
    if(!result)
        response.status(404).end()
    
    response.status(200).send(result)
})

blogRouter.put('/:id', async (request, response) => {
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body)
    
    if(!result)
        response.status(404).end()
    
    response.status(200).send(result)
})

module.exports = blogRouter