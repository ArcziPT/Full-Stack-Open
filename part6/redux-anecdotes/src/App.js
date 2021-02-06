import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteAnectode} from './reducers/anecdoteReducer'
import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnectode(id))
  }

  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <h2>create new</h2>
      <NewAnecdote/>
    </div>
  )
}

export default App