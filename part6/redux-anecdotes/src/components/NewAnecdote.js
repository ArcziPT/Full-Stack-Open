import { useDispatch } from "react-redux"

import React from 'react'
import {addAnecdote} from '../reducers/anecdoteReducer'
import AnecdoteService from '../services/anecdotesService'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const newAnecdote = {
            content: event.target.anecdote.value,
            votes: 0
        }
        dispatch(addAnecdote(newAnecdote))
    }

    return (
        <div>
            <form onSubmit={createAnecdote}>
                <input name="anecdote"/> 
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default NewAnecdote