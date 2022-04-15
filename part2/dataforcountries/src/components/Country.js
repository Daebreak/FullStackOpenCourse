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

export default Country