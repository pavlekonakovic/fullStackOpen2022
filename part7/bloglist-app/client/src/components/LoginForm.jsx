import { useField } from '../hooks'
import { useDispatch } from 'react-redux'

import { userLogin } from '../reducers/userReducer'

const LoginFrom = () => {
  const dispatch = useDispatch()

  const [username, resetUsername] = useField('text', 'username')
  const [password, resetPassword] = useField('password', 'password')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin(username.value, password.value))
    resetPassword()
    resetUsername()
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type='submit' id='login-button'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginFrom
