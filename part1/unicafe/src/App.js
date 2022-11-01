import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  if(text === 'Positive'){
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>)
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>)
}

const Statistics = ({ feedback }) => {
  const allFeedback = feedback.good + feedback.neutral + feedback.bad
  const average = (feedback.good - feedback.bad)/allFeedback
  const positive = (feedback.good/allFeedback) * 100

  if (allFeedback === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <table>
      <tbody>
        <StatisticLine text='Good' value={feedback.good}/>
        <StatisticLine text='Neutral' value={feedback.neutral}/>
        <StatisticLine text='Bad' value={feedback.bad}/>
        <StatisticLine text='All' value={allFeedback}/>
        <StatisticLine text='Average' value={average}/>
        <StatisticLine text='Positive' value={positive}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () => setFeedback({...feedback, good: feedback.good + 1})
  const handleNeutralClick = () => setFeedback({...feedback, neutral: feedback.neutral + 1})
  const handleBadClick = () => setFeedback({...feedback, bad: feedback.bad + 1})


  return (
    <div>
      <Header text='Give Feedback'/>
      <Button onClick={handleGoodClick} text='Good'/>
      <Button onClick={handleNeutralClick} text='Neutral'/>
      <Button onClick={handleBadClick} text='Bad'/>
      <Header text='Statistics'/>
      <Statistics  feedback={feedback}/>
    </div>
  )
}

export default App