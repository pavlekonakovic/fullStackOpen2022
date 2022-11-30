import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(createNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return(
    <div>
      {[...anecdotes]
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase().trim()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList