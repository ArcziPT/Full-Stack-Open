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

const CountryDetails = ({country}) => (
  <div>
    <h1>{country.name}</h1>
    <br></br>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <br></br>
    <h2>Languages</h2>
    <br></br>
    <ul>
      {country.languages.map(lan => <li>{lan.name}</li>)}
    </ul>
    <br></br>
    <img src={country.flag} alt="flag" width="100px" height="auto"/>
  </div>
)

const Countries = ({countries}) => {
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
      {countries.map(country => <p>{country.name}</p>)}
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

  return (
    <div>
      <Input text="Find countries:" onChange={searchCountryChange} value={searchCountry}/>
      <Countries countries={countries.filter(country => countryFilter(country.name))}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));