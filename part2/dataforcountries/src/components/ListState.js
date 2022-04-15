import Country from "./Country"

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

export default ListState