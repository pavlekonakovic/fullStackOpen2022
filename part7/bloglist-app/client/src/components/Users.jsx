import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <Typography variant='h4'>Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold', fontSize: 18 }}>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align='right'>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
