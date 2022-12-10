import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(userLogout(user))
  }

  const padding = {
    paddingRight: 10,
  }

  return (
    <div>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
