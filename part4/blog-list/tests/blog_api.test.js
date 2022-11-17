const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { blogs } = require('./blogsForTest')

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

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(6)
})

afterAll(() => {
  mongoose.connection.close()
})