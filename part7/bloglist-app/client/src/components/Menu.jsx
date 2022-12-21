import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { 
  Toolbar, 
  Button, 
  ButtonGroup, 
  AppBar, 
  IconButton, 
  Grid,
  Typography
} 
from '@mui/material'

import { userLogout } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(userLogout(user))
  }

  return (
    <AppBar position='static' elevation={1} sx={{ borderRadius: 4}}>
      <Toolbar>
        <Grid
          justifyContent='space-between'
          alignItems='center'
          container
          spacing={24}
        >
          <Grid item>
            <IconButton edge='start' color='inherit' aria-label='menu'>
            </IconButton>
            <ButtonGroup variant='text' aria-label='text button group'>
              <Button color='inherit' component={Link} to='/'>
                blogs
              </Button>
              <Button color='inherit' component={Link} to='/users'>
                users
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <Typography variant='body' sx={{ fontWeight: 'bold', mr: 1}}>{user.name}</Typography>
            <Typography variant='body'>logged in</Typography> 
          </Grid>
          <Grid item>
            <Button color='inherit' onClick={handleLogout} variant='outlined'>logout</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
