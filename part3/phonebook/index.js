require('dotenv').config()

var bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')

const Person = require('./models/person')

const express = require('express')
const { request, response } = require('express')
const app = express()

var jsonParser = bodyParser.json()

app.use(cors())
app.use(jsonParser)
app.use(morgan('dev'))

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => response.json(persons)).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    let person = request.body

    if(person.number == undefined || person.number.length === 0 )
        return response.status(404).send('Invalid number').end()

    if(person.name == undefined || person.name.length === 0 )
        return response.status(404).send('Invalid name').end()

    Person.find({name: person.name}).then(result => {
        if(result.length > 0)
            return response.status(404).send('Person with this name is already added').end()
            
        person = new Person(person)
        person.save().then(result => response.json(result)).catch(error => next(error))
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if(person)
            response.json(person)
        else
            response.status(404).end()
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(result => response.status(204).end()).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = request.body
    Person.findByIdAndUpdate(request.params.id, person, {new: true}).then(person => response.json(person)).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error)

    if(error.name === 'CastError')
        return response.status(404).send({error: 'malformatted id'})

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)