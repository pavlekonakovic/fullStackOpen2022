const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('person', request => request.method === 'POST' ? JSON.stringify(request.body) : null)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

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


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request,response) => {
  const currentTime = new Date()
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${currentTime}</p>`
    )
})

app.get('/api/persons/:id', (request, respone) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    respone.json(person)
  } else {
    respone.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => Math.floor(Math.random() * 10000)

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name){
    return response.status(400).json({
      error: 'The name is missing'
    })
  }

  if(!body.number){
    return response.status(400).json({
      error: 'The number is missing'
    })
  }

  const alreadyExists = persons.find(person => person.name === body.name)

  if(alreadyExists){
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
