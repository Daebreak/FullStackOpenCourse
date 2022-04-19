const express = require('express')
const app = express()
const PORT = 3001

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('Hello')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    let person = persons.find(p => p.id === Number(request.params.id))
    console.log(person)
    if (person) {
        response.json(person)
    } else {
        response.statusMessage = "Person ID was not found"
        response.status(404).send('<h1>person not found<h1>')
    }
})

app.delete('/api/persons/:id', (request, response) => {
    let person = persons.filter(p => p.id !== Number(request.params.id))
    console.log(person)
    if (persons.id === Number(request.params.id)) {
        response.status(404).json('Person was successfully deleted')
    } else {
        response.statusMessage = "Person ID was not found"
        response.status(404).send('<h1>person not found<h1>')
    }
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people!<br> ${Date()}`)
})

app.listen(PORT)
console.log(`listening on ${PORT}`)
