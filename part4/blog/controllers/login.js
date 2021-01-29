const loginRouter = require('express').Router()
const { request, response } = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('express-async-errors')

loginRouter.post('', async (request, response) => {
    const user = await User.findOne({username: request.body.username})

    const res = user === null ? false : await bcrypt.compare(request.body.password, user.hash)
    if(!res)
        return response.status(401).json({error: 'invalid username or password'})

    const token = jwt.sign({username: user.username, id: user._id}, process.env.SECRET)
    response.status(200).json({token: token, username: user.username, id: user.id})
})

module.exports = loginRouter