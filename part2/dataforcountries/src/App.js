import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [weather, setWeather] = useState([])
  const { latlng } = country[0]

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`).then(response => {
    const weatherObj = {
      wind: response.data.wind.speed,
      temp: (response.data.main.temp - 273,15),
      weather: response.data.weather[0].description,
      icon: response.data.weather[0].icon
    }
    setWeather(weatherObj)
    })
  },[latlng])
  
  return (
    <Fragment>
      <h2>{country[0].name.common}</h2>
      <p>Capital: {country[0].capital}</p>
      <p>Area: {country[0].area}</p>
      <b>languages:</b>
      {Object.entries(country[0].languages).map(([key, value]) => 
        <li key={key}>
          {value}
        </li>
        )}
      <br></br>
      <img src={country[0].flags.png} alt={`${country[0].name.common}'s Flag`} />
      <br></br>
      <h2>Weather in {country[0].capital}</h2>
      <p>{weather.weather}</p>
      <p>temperature {weather.temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={`${country[0].name.common}'s weather icon`}/>
      <p>wind {weather.wind}</p>
    </Fragment>
  )
}

const List = ({countries, showCountryHandler}) => {
  return (
    <li>
      {`${countries.name.common} `}
      <button onClick={() => showCountryHandler(countries.name.common)}>show</button>
    </li>
  )  
}

const ListState = ({countries, find, showCountryHandler}) => {
  if (countries.length >= 10) {
    if (find === '') {
      return <p>Please enter a filter.</p>
    }
      return <p>Too many matches, specify another filter.</p>
  } else if (countries.length !== 1) {
    return ( 
      <ul>
        {countries.map(country =>
          <List key={country.name.common} countries={country} showCountryHandler={showCountryHandler}/>
        )}
      </ul>
    )
  } else {
      return <Country country={countries}/>
  }
}

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