import { useDispatch } from "react-redux"

import React from 'react'
import {addAnecdote} from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.anecdote.value))
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