import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '123-456-789'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

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
      {persons.map(person => <p key={person.name}>{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App