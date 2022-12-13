const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if(!body.title || !body.url){
    return response.status(400).end()
  }

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  }).populate('user', { username: 1, name: 1 })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const user = request.user

  const blog = await Blog.findById(id)

  if(blog.user.toString() === user.id.toString()){
    await Blog.deleteOne({ _id: id })
    response.status(204).end()
  } else {
    response.status(401).json({
      error: 'invalid user'
    })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const id = request.params.id

  const updatedBlog = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
  response.status(200).json(updatedBlog.toJSON())
})

module.exports = blogsRouter