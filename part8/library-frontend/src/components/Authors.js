import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show, setError }) => {
  const result = useQuery(ALL_AUTHORS)

  const[name, setName] = useState('')
  const[born, setBorn] = useState('')

  const [ changeAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: () => {
      setError('Fill out all fields')
    }
  })

  if(result.loading){
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const authors = result.data.allAuthors

  const handleChangeAuthor = (event) => {
    event.preventDefault()

    changeAuthor({ variables: {name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={handleChangeAuthor}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            type='number'
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
