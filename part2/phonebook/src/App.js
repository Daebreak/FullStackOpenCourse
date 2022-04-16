import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Display from './components/Display'
import Form from './components/Form'
import phoneServices from "./services/persons";
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')
  
  const [searchName, setSearchName] = useState('')
  
  useEffect(() => { 
    phoneServices.getNumbers().then(response => 
    setPersons(response)
    )
  }, [])
  
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
  
      phoneServices.addNumber(personObj).then(response => {
        setPersons(persons.concat(response))
        setNewNumber('')
        setNewName('')  
      })
    }
  }

  const deletePerson = (id) => {
    const newArr = persons.filter(person => person.id !== id)
    setPersons(newArr)

    axios.delete(`http://localhost:3001/persons/${id}`)    
  }

  const isNamePresent = () => persons.some(person => person.name === newName)

  const filterNames = () => {
    const re = RegExp(`.*${searchName.toLowerCase().split('').join('.*')}.*`)
    return persons.filter(person => person.name.toLowerCase().match(re))
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
          <Display props={filterNames()} deletePerson={deletePerson}/>
        </ul>
      </div>
    </div>
  )
}

export default App