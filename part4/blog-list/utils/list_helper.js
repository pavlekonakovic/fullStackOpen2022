const lodash = require('lodash')

// eslint-disable-next-line
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return null

  const favorite = blogs.reduce((maxLikes, blog) => {
    return blog.likes > maxLikes.likes ? blog : maxLikes
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return null

  const authorWithMostBlogs =
  lodash.reduce(
    lodash.countBy(blogs, 'author'), (result, value, key) => {
      return value > result.blogs ? { author: key, blogs: value } : result
    }, { blogs: 0 })

  return authorWithMostBlogs
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }