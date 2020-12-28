import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

const Input = ({text, onChange, value}) => (
  <div>
    {text}
    <input onChange={onChange} value={value}/>
  </div>
)

const CountryDetails = ({country}) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`).then(response => {
      setWeather(response.data.current)
    })
  }, [])
  
  return (
    <div>
      <h1>{country.name}</h1>
      <br></br>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <br></br>
      <h2>Languages</h2>
      <br></br>
      <ul>
        {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
      </ul>
      <br></br>
      <img src={country.flag} alt="flag" width="100px" height="auto"/>
      <br></br>
      {weather && 
        <div>
          <h2>Wheater in {country.capital}</h2>
          <p>Temperature: {weather.temperature} Celcius</p>
          <p>Wind: {weather.wind_speed} mph {weather.wind_dir}</p>
        </div>
      }
    </div>
  )
}

const Countries = ({countries, showClick}) => {
  if(countries.length > 10)
    return (
      <div>
        <p>Too many matches</p>
      </div>
    )
  
  if(countries.length == 0)
    return (
      <div>
        <p>No country found</p>
      </div>
    )

  if(countries.length == 1)
    return (
      <div>
        <CountryDetails country={countries[0]}/>
      </div>
    )

  return (
    <div>
      {countries.map(country => (
        <div key={country.name}>
          <p>{country.name}</p>
          <button onClick={showClick(country.name)}>show</button>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const searchCountryChange = event => setSearchCountry(event.target.value)
  const countryFilter = name => name.toLowerCase().includes(searchCountry.toLowerCase())

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const showClick = name => () => setSearchCountry(name)

  return (
    <div>
      <Input text="Find countries:" onChange={searchCountryChange} value={searchCountry}/>
      <Countries showClick={showClick} countries={countries.filter(country => countryFilter(country.name))}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));