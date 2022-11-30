import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const object = { anecdote, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (anecdote) => {
  const { id } = anecdote
  const newObject = {...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const anecdoteServices = { getAll, createNew, update }

export default anecdoteServices