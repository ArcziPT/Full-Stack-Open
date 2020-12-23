import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  const all = good + bad + neutral
  const avg = (good - bad)/all
  const positive = String(good/all * 100) + '%'
  
  return (
    <div>
      <p>good {good}</p>
      <p>bad {bad}</p>
      <p>neutral {neutral}</p>
      <p>all {all}</p>
      <p>average {avg}</p>
      <p>positive {positive}</p>
    </div>
  )
}

const Button = ({handler, text}) => (
  <div>
    <button onClick={handler}>{text}</button>
  </div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaceGood = () => setGood(good + 1)
  const increaceNeutral = () => setNeutral(neutral + 1)
  const increaceBad = () => setBad(bad + 1)

  return (
    <div>
      <p>give feedback</p>
      <Button handler={increaceGood} text="good"/>
      <Button handler={increaceNeutral} text="neutral"/>
      <Button handler={increaceBad} text="bad"/>

      <p>statistics</p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)