import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Menu from './components/Menu'
import Blogs from './components/Blogs'
import LoginFrom from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <div>
      <Notification />

      {user === null ? (
        <LoginFrom />
      ) : (
        <div>
          <Menu />
          <h1>Blogg App</h1>

          <Routes>
            <Route path='/' element={<Blogs />} />
            <Route path='/users' element={<Users />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
