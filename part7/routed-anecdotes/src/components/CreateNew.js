import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

const CreateNew = ({ addNew }) => {
  const [content, resetContent] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [info, resetInfo] = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (event) => {
    event.preventDefault()
    resetAuthor()
    resetContent()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew