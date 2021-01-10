const { request, response } = require('express')
const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT)