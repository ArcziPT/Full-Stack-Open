import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleChange = (event) => setNewName(event.target.value) 

  const addNewName = (event) => {
      event.preventDefault()

      if(persons.find(person => person.name === newName) === undefined){
        setPersons(persons.concat({name: newName}))
        setNewName('')
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
                       onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App