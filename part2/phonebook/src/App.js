import { useState } from 'react'
import Filter from './components/Filter'
import Display from './components/Display'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')
  
  const [searchName, setSearchName] = useState('')

  const isNamePresent = () => persons.some(person => person.name === newName)

  const filterNames = () => {
    const re = RegExp(`.*${searchName.toLowerCase().split('').join('.*')}.*`)
    return persons.filter(person => person.name.toLowerCase().match(re))
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    if (isNamePresent()) {
      window.alert(`${newName} is already added to phonebook`)
      setNewNumber('')
      setNewName('') 
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObj))
      setNewNumber('')
      setNewName('')
   }
  }

  const newNameHandler = (event) => {
    setNewName(event.target.value)
  }

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const searchNameHandler = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <div>
          <Filter search={searchName} handler={searchNameHandler}/>
        </div>
      </div>
      
      <form>
        <h2>Add a new</h2>
        <Form prop={newName} handler={newNameHandler} label/>
        <Form prop={newNumber} handler={newNumberHandler}/>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
      
      <div>
        <h2>Numbers</h2>
        <ul style={{padding: 0}}>
          <Display props={filterNames()}/>
        </ul>
      </div>
    </div>
  )
}

export default App