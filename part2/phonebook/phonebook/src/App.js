import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Input = ({text, val, changeHandler}) => (
  <div>
    {text}
    <input value={val} onChange={changeHandler}/>
  </div>
)

const Filter = ({filterVal, filterFunc}) => (
  <Input text="filter with" val={filterVal} changeHandler={filterFunc}/>
)

const AddForm = ({newName, newNameChange, newPhone, newPhoneChange, addNewPerson}) => (
  <form onSubmit={addNewPerson}>
    <Input text="name:" val={newName} changeHandler={newNameChange}/>
    <Input text="phone:" val={newPhone} changeHandler={newPhoneChange}/>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({person}) => (
  <div>
    <p>{person.name} {person.number}</p>
  </div>
)

const App = () => {
  const [ persons, setPersons ] = useState([])

  const [ newName, setNewName ]  = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const [ filterVal, setFilterVal ] = useState('')

  const filter = (event) => {
    setFilterVal(event.target.value)
  }

  const handleChange = (updateFunc) => (event) => updateFunc(event.target.value) 

  const addNewPerson = (event) => {
    event.preventDefault()

    if(persons.find(person => person.name === newName) === undefined){
      setPersons(persons.concat({name: newName, number: newPhone}))
      setNewName('')
      setNewPhone('')
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} filterFunc={filter}/>

      <h2>Add new</h2>
      <AddForm newName={newName} newNameChange={handleChange(setNewName)} 
               newPhone={newPhone} newPhoneChange={handleChange(setNewPhone)}
               addNewPerson={addNewPerson}/>

      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(filterVal.toLocaleLowerCase()))
                                .map(person => <Person key={person.name} person={person}/>)}
    </div>
  )
}

export default App