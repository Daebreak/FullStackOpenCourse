import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Display from './components/Display'
import Form from './components/Form'
import phoneServices from "./services/persons";

const Notification = ({ message, status }) => {
  const addedStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const deletedStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (status === 'added') {
    return (
      <div className='added' style={addedStyle}>
        {message}
      </div>
    )
  } else if (status === 'updated') {
      return (
        <div className='updated' style={addedStyle}>
          {message}
        </div>
      )
  } else if (status === 'deleted') {
  return (
    <div className='deleted' style={deletedStyle}>
      {message}
    </div>
  )} else if (status === 'error') {
    return (
      <div className='error' style={deletedStyle}>
        {message}
      </div>
  )} else if (status === '') {
    return null
  }
}

const App = () => {
  const [persons, setPersons] = useState([])   
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState({message: null, status:''})
  
  useEffect(() => { 
    phoneServices.getNumbers().then(response => 
    setPersons(response)
    )
  }, [])
  
  const addNewPerson = (event) => {
    event.preventDefault()
    if (isNamePresent()) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const number = persons.find(person => newName === person.name)
        const changedNumber = {...number, number: newNumber}

        phoneServices.updateNumber(number.id, changedNumber).then(response => {
          setPersons(persons.map(r => number.id !== r.id ? r : response))})
          .then(() => {
            setMessage({message: `${newName}'s number was updated`, status:'updated'})
            setTimeout(() => {
              setMessage({message: null, status:''})              
            }, 5000)
          }).catch(() => {
            setMessage({message: `Information of ${newName} has already been removed from server.`, status:'error'})
            setTimeout(() => {
              setMessage({message: null, status:''})              
            }, 5000)
          })
          setNewNumber('')
          setNewName('')   
      } else {
        setNewNumber('')
        setNewName('') 
      }
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
      .then(() => {
        setMessage({message: `Added ${newName}`, status:'added'})
        setTimeout(() => {
          setMessage({message: null, status:''})              
        }, 5000)
      })
    }
  }

  const deletePerson = (prop) => {
    if (window.confirm(`Delete ${prop.name}?`)) {
        const newArr = persons.filter(person => person.id !== prop.id)
        setPersons(newArr)
        phoneServices.deleteNumber(prop.id).then(error => {
          setMessage({
            message: `${prop.name} was removed.`,
            status: 'deleted'
          })
          setTimeout(() => {
            setMessage({
              message: null,
              status: ''
            })
          }, 5000)
        })  
    }
  }

  const isNamePresent = () => persons.some(person => person.name === newName)

  const filterNames = () => {
    const re = RegExp(`.*${searchName.toLowerCase().split('').join('.*')}.*`)
    return persons.filter(person => person.name.toLowerCase().match(re))
  }

  const inputHandler = (event) => {
    switch (event.target.id) {
      case 'filter':
        setSearchName(event.target.value)
        break;
      case 'name':
        setNewName(event.target.value)
        break;
      case 'number':
        setNewNumber(event.target.value)
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Notification {...message}/>
        <div>
          <Filter search={searchName} handler={inputHandler}/>
        </div>
      </div>
      
      <form>
        <h2>Add a new</h2>
        <Form prop={newName} handler={inputHandler} label/>
        <Form prop={newNumber} handler={inputHandler}/>
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