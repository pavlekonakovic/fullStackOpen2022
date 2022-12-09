import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginFrom from './components/LoginForm'
import Notification from './components/Notification'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, userLogin, userLogout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  return (
    <div>
      <Notification />

      {user === null ? (
        <LoginFrom
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList username={user.username} />
        </div>
      )}
    </div>
  )
}

export default App
