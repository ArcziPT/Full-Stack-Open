var bodyParser = require('body-parser')
const express = require('express')
const app = express()

var jsonParser = bodyParser.json()

let persons = [
    {
        id: 1,
        name: "John Smith",
        number: "123-456-789"
    },
    {
        id: 2,
        name: "Alice Goldberg",
        number: "414-547-892"
    },
    {
        id: 3,
        name: "Michael Jackson",
        number: "123-252-346"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', jsonParser, (request, response) => {
    let person = request.body
    person.id = Math.floor(Math.random() * 10000000)

    persons = persons.concat(person)
    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    let person = persons.find(p => p.id === id)

    if(person)
        return response.json(person)
    else
        return response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id != id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
})

const PORT = 3001
app.listen(PORT)