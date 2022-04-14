import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Display from './components/Display'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')
  
  const [searchName, setSearchName] = useState('')
  
  useEffect(() => { 
    axios.get('http://localhost:3001/persons').then(response => 
    setPersons(response.data)
    )
  }, [])

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