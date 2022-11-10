require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('person', request => request.method === 'POST' ? JSON.stringify(request.body) : null)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
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

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
