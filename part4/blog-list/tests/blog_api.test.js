const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = require('../app')
const api = supertest(app)
const { blogs, blogsInDb, nonExistingId } = require('./blogsForTest')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

describe('when there is some initial notes saved', () => {
  test('blogs are returned as json', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogs.length)
  })

  test('verify that the unique identifier is named id', async() => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  test('the specific blog is among the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(blog => blog.title)
    expect(contents).toContain('Go To Statement Considered Harmful')
  })
})

describe('viewing of a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await blogsInDb()

    const blogToview = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToview.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToview))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a422a851b54a6234d17f7'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {

  let token

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    const userForToken = {
      usrname: user.username,
      id: user.id
    }

    token = jwt.sign(userForToken, process.env.SECRET)

    return token
  })

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'New Test Title',
      author: 'Author Some',
      url: 'testingurl.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('New Test Title')
  })

  test('if likes property is missing it will default to 0', async () => {
    const newBlog = {
      title: 'Another Test',
      author: 'Sample Author',
      url: 'madeupurl.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('if title or url are missing respond with 400 Bad Request', async () => {
    const newBlog = {
      author: 'John Doe',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.length).toBe(blogs.length)
  })

  test('if token is missing responds with 401 unauthorized', async () => {
    const newBlog = {
      title: 'New Test Title',
      author: 'Author Some',
      url: 'testingurl.com',
      likes: 0,
    }

    token = null

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(401)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogs.length)
  })
})

describe('deletion of a blog', () => {

  let token

  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    const userForToken = {
      usrname: user.username,
      id: user.id
    }

    token = jwt.sign(userForToken, process.env.SECRET)

    const blogToBeDeleted = new Blog({
      title: 'Blog For Deleting',
      author: 'Some Name',
      url: 'website.com',
      user: user.id,
    })

    await blogToBeDeleted.save()

    return token
  })
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const title = blogsAtEnd.map(blog => blog.title)
    expect(title).not.toContain(blogToDelete.title)
  })

  test('fails with status code 401 if token is invalid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    token = 'invalidtoken'

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(401)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('updating of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 23

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogs.length)

    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).toContain(23)
  })
})

afterAll(() => {
  mongoose.connection.close()
})