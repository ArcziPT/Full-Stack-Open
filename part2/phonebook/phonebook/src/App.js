import axios from 'axios'
import React, { useEffect, useState } from 'react'
import phoneService from './services/phones'
import './index.css'

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

const Notification = ({msg}) => {
  if(msg == null)
    return null

  return (
    <div className={msg.type}>
      {msg.msg}
    </div>
  )
}

const Person = ({person, deleteHandler}) => (
  <div>
    <p>{person.name} {person.number}</p>
    <button onClick={deleteHandler}>DELETE</button>
  </div>
)

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ]  = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filterVal, setFilterVal ] = useState('')
  const [ message, setMessage ] = useState(null)

  const filter = (event) => {
    setFilterVal(event.target.value)
  }

  const handleChange = (updateFunc) => (event) => updateFunc(event.target.value) 

  const addNewPerson = (event) => {
    event.preventDefault()

    if(persons.find(person => person.name === newName) === undefined){
      phoneService.add({name: newName, number: newPhone}).then(newPerson => {
        setMessage({msg: `${newName} added`, type: 'success'})
        setTimeout(() => setMessage(null), 5000)
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewPhone('')
      })
    }else{
      if(window.confirm(`${newName} is already in phonebook. Do you want to update phone number?`)){
        const person = {...persons.find(p => p.name === newName)}
        person.number = newPhone
        phoneService.updatePerson(person.id, person).then(updatedPerson => {
          setPersons(persons.map(p => p.id != person.id ? p : updatedPerson))
        })
      }
    }
  }

  const deletePerson = (id) => () => {
    phoneService.deletePerson(id).then(deletedPerson => setPersons(persons.filter(p => p.id != id))).catch(error => {
      setMessage({msg: 'Already has been removed', type: 'error'})
      setPersons(persons.filter(p => p.id != id))
    })
  }

  useEffect(() => {
    phoneService.getAll().then(retPersons => setPersons(retPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={message}/>
      <Filter filterVal={filterVal} filterFunc={filter}/>

      <h2>Add new</h2>
      <AddForm newName={newName} newNameChange={handleChange(setNewName)} 
               newPhone={newPhone} newPhoneChange={handleChange(setNewPhone)}
               addNewPerson={addNewPerson}/>

      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(filterVal.toLocaleLowerCase()))
                                .map(person => <Person key={person.name} person={person} deleteHandler={deletePerson(person.id)}/>)}
    </div>
  )
}

export default App