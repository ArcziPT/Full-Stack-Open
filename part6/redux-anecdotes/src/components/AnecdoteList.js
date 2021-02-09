import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, onClick}) => (
    <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={onClick}>vote</button>
        </div>
    </div>
)

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes.sort((a1, a2) => a2.votes - a1.votes))

    return (
        <ul>
            {anecdotes.map(anecdote => (
                <li key={anecdote.id}>
                    <Anecdote anecdote={anecdote} onClick={() => dispatch(voteAnectode(anecdote))}/>
                </li>
            ))}
        </ul>
    )
}

export default AnecdoteList