import { combineReducers, createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer
})

const store = createStore(reducer)

export default store