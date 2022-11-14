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

module.exports = { dummy, totalLikes, favoriteBlog }