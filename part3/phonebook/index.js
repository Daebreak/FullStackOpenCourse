const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 3001


let persons = [
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

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

morgan.token('data', (request, response) => { return JSON.stringify(request.body) })
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())
//app.use(morgan('tiny'))

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.data(req,res)
    ].join(' ')
  })
)

app.get('/', (request, response) => {
    response.send('Hello')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people!<br> ${Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    let person = persons.find(p => p.id === Number(request.params.id))
    if (person) {
        response.json(person)
    } else {
        response.statusMessage = "Person ID was not found"
        response.status(404).send('<h1>person not found<h1>')
    }
})

app.delete('/api/persons/:id', (request, response) => {
    let person = persons.filter(p => p.id !== Number(request.params.id))
    if (persons.id === Number(request.params.id)) {
        response.status(404).json('Person was successfully deleted')
    } else {
        response.statusMessage = "Person ID was not found"
        response.status(404).send('<h1>person not found<h1>')
    }
})

app.post('/api/persons', (request, response) => {
   let newId = Math.floor(Math.random()*10000)
   let body = request.body

   const isNumberPresent = () => persons.some(person => person.name === body.name)

    if (!body.name || !body.number) {
        response.statusMessage = 'Name or number missing'
        response.status(400).end()
    } else if (isNumberPresent()) {
        response.statusMessage = 'name must be unique'
        response.status(409).end()        
    }

   let personObj = {
       id:newId,
       name:body.name,
       number:body.number
   }
   persons = persons.concat(personObj)

   response.json(personObj)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

app.listen(PORT)
console.log(`listening on ${PORT}`)