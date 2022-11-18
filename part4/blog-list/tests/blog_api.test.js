const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { blogs, blogsInDb } = require('./blogsForTest')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

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

afterAll(() => {
  mongoose.connection.close()
})