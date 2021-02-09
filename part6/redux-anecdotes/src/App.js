import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {initAnecdotes} from './reducers/anecdoteReducer'
import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import AnecdoteService from './services/anecdotesService'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    AnecdoteService.getAll().then(data => dispatch(initAnecdotes(data)))
  }, [dispatch])

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