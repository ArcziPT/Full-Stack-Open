const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => await User.deleteMany({}))

describe('when request to add user is send ', () => {
    test('without password, return error', async () => {
        const user = {
            username: "new_user"
        }
    
        const response = await api.post('/api/users').send(user).expect(401)
    })

    test('without username, return error', async () => {
        const user = {
            password: "mypass123"
        }
    
        const response = await api.post('/api/users').send(user).expect(401)
    })

    test('with password length smaller than 3, return error', async () => {
        const user = {
            username: "new_user",
            password: "my"
        }
    
        const response = await api.post('/api/users').send(user).expect(401)
    })

    test('with valid data, return user', async () => {
        const user = {
            username: "new_user",
            password: "password"
        }
   
        const response = await api.post('/api/users').send(user).expect(201)
        expect(response.body.username).toEqual(user.username)
    })
})

afterAll(() => {
    mongoose.connection.close()
})