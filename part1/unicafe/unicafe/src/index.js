import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  if(good == 0 && neutral == 0 && bad == 0)
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )

  const all = good + bad + neutral
  const avg = (good - bad)/all
  const positive = String(good/all * 100) + '%'
  
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={all}/>
        <Statistic text="average" value={avg}/>
        <Statistic text="positive" value={positive}/>
      </tbody>
    </table>
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