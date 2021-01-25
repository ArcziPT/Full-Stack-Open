const userRouter = require('express').Router()
const { request, response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
require('express-async-errors')

userRouter.get('', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})
  
userRouter.post('', async (request, response) => {
    if(!request.body.hasOwnProperty('password') || !request.body.hasOwnProperty('username'))
        return response.status(401).end()

    if(request.body.password.length < 3)
        return response.status(401).send({error: "password must be at least 3 characters long"})
    
    const user = new User({username: request.body.username, hash: await bcrypt.hash(request.body.password, 10)})
  
    const result = await user.save()
    response.status(201).json(result)
})

module.exports = userRouter