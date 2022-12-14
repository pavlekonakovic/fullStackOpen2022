import { useField } from '../hooks'
import { useDispatch } from 'react-redux'

import { Avatar, Button, TextField, Box, Typography, Container, Paper } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

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
    <Container maxWidth='sm' sx={{ p: 4 }}>
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ mt: 4, mb: 2, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h4'>
            Log in to application
          </Typography>
          <Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 3 }}>
            <TextField margin='normal' required fullWidth autoFocus {...username} />
            <TextField margin='normal' required fullWidth autoComplete='current-password' {...password} />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 4, mb: 8, p: 1 }}>
              login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginFrom
