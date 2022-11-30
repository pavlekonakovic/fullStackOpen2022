import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const changedAnecdote = action.payload
      const id = changedAnecdote.id
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (content) => {
  return async dispatch => {
    const voteAnecdote = await anecdoteServices.update(content)
    dispatch(voteFor(voteAnecdote))
  }
}

export const { voteFor, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer