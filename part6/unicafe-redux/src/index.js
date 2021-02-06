import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const inc = (type) => () => store.dispatch({type})

  return (
    <div>
      <button onClick={inc('GOOD')}>good</button> 
      <button onClick={inc('OK')}>neutral</button> 
      <button onClick={inc('BAD')}>bad</button>
      <button onClick={inc('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
