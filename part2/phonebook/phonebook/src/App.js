import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '123-456-789'},
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }])

  const [ newName, setNewName ]  = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const [ filterVal, setFilterVal ] = useState('')
  const [ personsToShow, setPersonsToShow] = useState([...persons])

  const filter = (event) => {
    setFilterVal(event.target.value)
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const handleChange = (updateFunc) => (event) => updateFunc(event.target.value) 

  const addNewName = (event) => {
    event.preventDefault()

    if(persons.find(person => person.name === newName) === undefined){
      setPersons(persons.concat({name: newName, phone: newPhone}))
      setNewName('')
      setNewPhone('')
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter with: <input value={filterVal}
                               onChange={filter}/>
      </div>
      <h2>Add new</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName}
                       onChange={handleChange(setNewName)}/>
        </div>
        <div>number: <input value={newPhone}
                            onChange={handleChange(setNewPhone)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <p key={person.name}>{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App