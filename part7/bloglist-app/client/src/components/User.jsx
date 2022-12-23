import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Container, Table, TableRow, TableCell, TableBody, Typography } from '@mui/material'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.users.find((user) => user.id === id))

  if (!user) return null

  return (
    <Container>
      <Typography variant='h4' sx={{ my: 2 }}>
        {user.name}
      </Typography>
      <Typography variant='h6' sx={{ my: 2 }}>
        Added blogs
      </Typography>
      <Table>
        <TableBody>
          {user.blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}

export default User
