import anecdotesService from "../services/anecdotesService"

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'INIT':
      return action.anecdotes

    case 'VOTE':
      return state.map(a => {
        if(a.id === action.id)
          a.votes++
        return a
      })

    case 'ADD':
      return state.concat(action.anecdote)
  }

  return state
}

export const voteAnectode = (id) => ({type: 'VOTE', id})

export const addAnecdote = (newAnecdote) => async dispatch => {
  const anecdote = await anecdotesService.create(newAnecdote)
  dispatch({type: 'ADD', anecdote})
}

export const initAnecdotes = () => async dispatch => {
  const anecdotes = await anecdotesService.getAll()
  dispatch({type: 'INIT', anecdotes})
}

export default reducer