require('dotenv').config()

var bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')

const Person = require('./models/person')

const express = require('express')
const app = express()

var jsonParser = bodyParser.json()

app.use(cors())
app.use(jsonParser)
app.use(morgan('dev'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons)).catch(error => response.status(404).end())
})

app.post('/api/persons', (request, response) => {
    let person = request.body

    if(person.number == undefined || person.number.length === 0 )
        return response.status(404).send('Invalid number').end()

    if(person.name == undefined || person.name.length === 0 )
        return response.status(404).send('Invalid name').end()

    Person.find({name: person.name}).then(result => {
        if(result.length > 0)
            return response.status(404).send('Person with this name is already added').end()
            
        person = new Person(person)
        person.save().then(result => response.json(result)).catch(error => response.status(404).end())
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => response.json(person)).catch(error => response.status(404).end())
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id).then(result => response.status(304).end()).catch(error => response.status(404).end())
})

const PORT = process.env.PORT
app.listen(PORT)