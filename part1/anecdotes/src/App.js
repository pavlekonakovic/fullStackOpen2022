import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({content, votes}) => <div><p>{content}</p><p>has {votes} votes</p></div>

const BestAnecdote = ({anecdotes, votes}) => {
  const mostVotes = Math.max(...votes)
  const mostVotesIndex = votes.indexOf(mostVotes)

  if(mostVotes === 0){
    return  <p>No votes yet</p>
  }

  return <Anecdote content={anecdotes[mostVotesIndex]} votes={mostVotes} />
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(() => new Uint8Array(anecdotes.length))

  const handleNextClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)  
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote content={anecdotes[selected]} votes={votes[selected]}/>
      <Button text='vote' onClick={handleVoteClick}/>
      <Button text='next anecdote' onClick={handleNextClick} />
      <Header text='Anecdote with the most votes' />
      <BestAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App