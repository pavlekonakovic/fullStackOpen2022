import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Menu from './components/Menu'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import LoginFrom from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <>
      <Notification />

      {user === null ? (
        <LoginFrom />
      ) : (
        <div>
          <Menu>
            <Routes>
              <Route path='/' element={<Blogs />} />
              <Route path='/blogs/:id' element={<Blog />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:id' element={<User />} />
            </Routes>
          </Menu>
        </div>
      )}
    </>
  )
}

export default App
