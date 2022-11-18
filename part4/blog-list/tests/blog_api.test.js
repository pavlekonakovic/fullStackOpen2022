const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { blogs, blogsInDb } = require('./blogsForTest')

const Blog = require('../models/blog')

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
})

describe('addition of a new note', () => {
  test('a valid blog post can be added', async () => {
    const newBlog = {
      title: 'New Test Title',
      author: 'Author Some',
      url: 'testingurl.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
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
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.length).toBe(blogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogs.length - 1)

    const title = blogsAtEnd.map(blog => blog.title)
    expect(title).not.toContain(blogToDelete.title)
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