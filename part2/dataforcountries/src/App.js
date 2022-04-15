import { useEffect, useState } from 'react'
import ListState from './components/ListState';
import axios from 'axios'

const filterCountries = (countries, find) => {
  const re = RegExp(`.*${find.toLowerCase().split('').join('.*')}.*`)

  return (
    countries.filter(country => country.name.common.toLowerCase().match(re))
  )  
}

function App() {
  const [countries, setCountry] = useState([])
  const [find, setFind] = useState('')
  const filteredCountries = filterCountries(countries, find)
 
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => 
    setCountry(response.data))
  } ,[])
  
  const findCountryHandler = (event) => {
    setFind(event.target.value)
  }
  
  const showCountryHandler = (event) => {
    setFind(event)
  }

  return (
    <div>
      <div>
        Find countries: <input value={find} onChange={findCountryHandler}/>
      </div>
      <div>
        <ListState countries={filteredCountries} find={find} showCountryHandler={showCountryHandler}/>
      </div>
    </div>
  )
}

export default App;