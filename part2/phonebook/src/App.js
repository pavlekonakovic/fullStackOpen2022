import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const alreadyExists = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if(alreadyExists){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personsService
          .update(alreadyExists.id, personObject)
          .then(returnedPersons => {
            setNotification(`Updated ${returnedPersons.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.map(person => person.id !== returnedPersons.id ? person : returnedPersons))
            setNewName('')
            setNewNumber('')
          })
          .catch(err => {
            setNotification(`Information of ${alreadyExists.name} has already been removed from server.${err.message}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== alreadyExists.id))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personsService
        .create(personObject)
        .then(returnedPersons => {
          setNotification(`Added ${returnedPersons.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
        })
    }
    
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setFilter(event.target.value)

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase().trim())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>

      <h3>add new</h3>

      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      
      <h3>Numbers</h3>

      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App